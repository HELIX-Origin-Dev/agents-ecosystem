import { Plugin } from "@opencode/plugin"
import {
  copyFile,
  mkdir,
  readFile,
  rename,
  stat,
  unlink,
  writeFile,
} from "node:fs/promises"
import { basename, dirname, join, resolve } from "node:path"
import { homedir } from "node:os"
import {
  derivePolicy,
  formatCompactNumber,
  getHardwareProfile,
} from "./shared"
import {
  buildServerStatus,
  buildUsageNote,
  findCurrentStepUsage,
  readModelContextLimit,
  readSessionStatus,
  summarizeCumulative,
  type ConfigState,
  type StatusSnapshot,
} from "./status"

const CONFIG_ACTION = "opencode-compaction-config"
const NAMESPACE = "dcm"

interface CompactionChanges {
  keepTokens?: number
  bufferPercent?: number
  auto?: boolean
  background?: boolean
}

interface TextRange {
  startLine: number
  endLine: number
  startOffset: number
  endOffset: number
}

interface MaskedJson {
  visible: string
  structural: boolean[]
}

function resolveGlobalConfigPath(): string {
  // Never let OPENCODE_CONFIG redirect writes: this plugin is only allowed to
  // update the user-global OpenCode config, never a project or alternate file.
  const xdg = process.env.XDG_CONFIG_HOME
  const base = xdg && xdg.trim() ? resolve(xdg) : join(homedir(), ".config")
  return join(base, "opencode", "opencode.jsonc")
}

function maskJsonc(text: string): MaskedJson {
  const visible = text.split("")
  const structural = new Array<boolean>(text.length).fill(false)
  let index = 0
  let inString = false
  let inLineComment = false
  let inBlockComment = false

  while (index < text.length) {
    const character = text[index]
    const next = text[index + 1]

    if (inLineComment) {
      if (character === "\r" || character === "\n") inLineComment = false
      else visible[index] = " "
      index += 1
      continue
    }

    if (inBlockComment) {
      if (character === "*" && next === "/") {
        visible[index] = " "
        visible[index + 1] = " "
        structural[index] = false
        structural[index + 1] = false
        inBlockComment = false
        index += 2
        continue
      }
      if (character !== "\r" && character !== "\n") visible[index] = " "
      index += 1
      continue
    }

    if (inString) {
      if (character === "\\") {
        visible[index + 1] = visible[index + 1] ?? " "
        index += 2
        continue
      }
      if (character === '"') inString = false
      index += 1
      continue
    }

    if (character === '"') {
      inString = true
      index += 1
      continue
    }
    if (character === "/" && next === "/") {
      visible[index] = " "
      visible[index + 1] = " "
      inLineComment = true
      index += 2
      continue
    }
    if (character === "/" && next === "*") {
      visible[index] = " "
      visible[index + 1] = " "
      inBlockComment = true
      index += 2
      continue
    }

    structural[index] = true
    index += 1
  }

  return { visible: visible.join(""), structural }
}

function braceDepthBefore(masked: MaskedJson, offset: number): number {
  let depth = 0
  for (let index = 0; index < offset; index += 1) {
    if (!masked.structural[index]) continue
    if (masked.visible[index] === "{") depth += 1
    else if (masked.visible[index] === "}") depth -= 1
  }
  return depth
}

function offsetToLine(text: string, offset: number): number {
  let line = 0
  for (let index = 0; index < offset; index += 1) {
    if (text[index] === "\n") line += 1
  }
  return line
}

function findObjectRange(
  text: string,
  masked: MaskedJson,
  key: string,
  expectedDepth: number,
  fromOffset = 0,
  toOffset = text.length,
): TextRange | undefined {
  const pattern = new RegExp(`"${key}"\\s*:\\s*\\{`, "g")
  const scope = masked.visible.slice(fromOffset, toOffset)
  let match: RegExpExecArray | null

  while ((match = pattern.exec(scope)) !== null) {
    const keyOffset = fromOffset + match.index
    const colonOffset = keyOffset + match[0].lastIndexOf(":")
    if (!masked.structural[colonOffset]) continue
    if (braceDepthBefore(masked, keyOffset) !== expectedDepth) continue

    const openOffset = keyOffset + match[0].lastIndexOf("{")
    let depth = 0
    for (let index = openOffset; index < toOffset; index += 1) {
      if (!masked.structural[index]) continue
      if (masked.visible[index] === "{") depth += 1
      else if (masked.visible[index] === "}") {
        depth -= 1
        if (depth === 0) {
          return {
            startLine: offsetToLine(text, keyOffset),
            endLine: offsetToLine(text, index),
            startOffset: keyOffset,
            endOffset: index,
          }
        }
      }
    }
  }
  return undefined
}

function readScalarFromRange(
  maskedLines: string[],
  range: TextRange,
  key: string,
): string | undefined {
  const pattern = new RegExp(`^\\s*"${key}"\\s*:\\s*(.+?)\\s*,?\\s*$`)
  for (let index = range.startLine + 1; index < range.endLine; index += 1) {
    const match = maskedLines[index].match(pattern)
    if (!match) continue
    let raw = match[1].trim()
    if (raw.endsWith(",")) raw = raw.slice(0, -1).trim()
    try {
      return String(JSON.parse(raw))
    } catch {
      return raw
    }
  }
  return undefined
}

function parseBoolean(value: string | undefined): boolean | undefined {
  return value === "true" ? true : value === "false" ? false : undefined
}

function parsePositiveInteger(value: string | undefined): number | undefined {
  if (!value || !/^\d+$/.test(value)) return undefined
  const parsed = Number(value)
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : undefined
}

function parsePercent(value: string | undefined): number | undefined {
  const match = value?.match(/^"?(\d+(?:\.\d+)?)%"?$/)
  if (!match) return undefined
  const parsed = Number(match[1])
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 100 ? parsed : undefined
}

async function readConfigState(path: string): Promise<ConfigState> {
  try {
    const text = await readFile(path, "utf8")
    const masked = maskJsonc(text)
    const lines = masked.visible.split(/\r?\n/)
    const range = findObjectRange(text, masked, "compaction", 0)
    if (!range) return { readable: true, compactionBlock: false }

    const keepRange = findObjectRange(
      text,
      masked,
      "keep",
      1,
      range.startOffset,
      range.endOffset,
    )
    return {
      readable: true,
      compactionBlock: true,
      keepTokens: keepRange
        ? parsePositiveInteger(readScalarFromRange(lines, keepRange, "tokens"))
        : undefined,
      bufferPercent: parsePercent(
        readScalarFromRange(lines, range, "buffer"),
      ),
      auto: parseBoolean(readScalarFromRange(lines, range, "auto")),
      background: parseBoolean(readScalarFromRange(lines, range, "background")),
    }
  } catch {
    return { readable: false, error: "global config could not be read" }
  }
}

function replaceScalar(
  lines: string[],
  maskedLines: string[],
  range: TextRange,
  key: string,
  value: string,
): boolean {
  const pattern = new RegExp(
    `^(\\s*"${key}"\\s*:\\s*)("(?:[^"\\\\]|\\\\.)*"|[^\\s,}]+)(,?)(\\s*)$`,
  )
  for (let index = range.startLine + 1; index < range.endLine; index += 1) {
    const match = maskedLines[index].match(pattern)
    if (!match) continue
    const prefixEnd = match[1].length
    const tokenEnd = prefixEnd + match[2].length
    lines[index] = lines[index].slice(0, prefixEnd) + value + lines[index].slice(tokenEnd)
    return true
  }
  return false
}

function updateCompactionBlock(text: string, changes: CompactionChanges): string {
  const hadBom = text.charCodeAt(0) === 0xfeff
  const eol = text.includes("\r\n") ? "\r\n" : "\n"
  const body = text.replace(/^\uFEFF/, "")
  const lines = body.split(/\r?\n/)
  const masked = maskJsonc(body)
  const maskedLines = masked.visible.split(/\r?\n/)

  const range = findObjectRange(body, masked, "compaction", 0)
  if (!range) throw new Error("Global config has no active compaction block; nothing was changed.")

  const indentation = (lines[range.startLine].match(/^(\s*)/)?.[1] ?? "") + "  "
  const missing: Array<{ key: string; value: string }> = []

  if (changes.auto !== undefined) {
    if (!replaceScalar(lines, maskedLines, range, "auto", String(changes.auto))) {
      missing.push({ key: "auto", value: String(changes.auto) })
    }
  }
  if (changes.background !== undefined) {
    if (!replaceScalar(lines, maskedLines, range, "background", String(changes.background))) {
      missing.push({ key: "background", value: String(changes.background) })
    }
  }
  if (changes.bufferPercent !== undefined) {
    const value = `"${changes.bufferPercent}%"`
    if (!replaceScalar(lines, maskedLines, range, "buffer", value)) {
      missing.push({ key: "buffer", value })
    }
  }

  if (changes.keepTokens !== undefined) {
    const keepRange = findObjectRange(
      body,
      masked,
      "keep",
      1,
      range.startOffset,
      range.endOffset,
    )
    if (keepRange) {
      if (!replaceScalar(lines, maskedLines, keepRange, "tokens", String(changes.keepTokens))) {
        lines.splice(keepRange.endLine, 0, `${indentation}  "tokens": ${changes.keepTokens},`)
      }
    } else {
      missing.push({
        key: "keep",
        value: `{ "tokens": ${changes.keepTokens} }`,
      })
    }
  }

  if (missing.length > 0) {
    let insertAt = range.endLine
    while (insertAt > 0 && maskedLines[insertAt - 1].trim() === "") insertAt -= 1
    if (insertAt > 0 && !/,\s*$/.test(maskedLines[insertAt - 1])) {
      const current = lines[insertAt - 1]
      const trailing = current.match(/\s*$/)?.[0] ?? ""
      lines[insertAt - 1] = current.replace(/\s*$/, "") + `,${trailing}`
    }
    lines.splice(
      insertAt,
      0,
      ...missing.map(
        (entry, index) =>
          `${indentation}"${entry.key}": ${entry.value}${index < missing.length - 1 ? "," : ""}`,
      ),
    )
  }

  return (hadBom ? "\uFEFF" : "") + lines.join(eol)
}

async function writeAtomically(path: string, content: string): Promise<void> {
  const temporary = `${path}.dynamic-context-manager.tmp-${process.pid}-${Date.now()}`
  await writeFile(temporary, content, "utf8")
  try {
    await rename(temporary, path)
  } catch (error) {
    await unlink(temporary).catch(() => undefined)
    throw error
  }
}

async function createVerifiedBackup(configPath: string): Promise<string> {
  const info = await stat(configPath)
  if (!info.isFile()) throw new Error("Global config path is not a file.")

  const backupDirectory = join(dirname(configPath), "opencode.dynamic-context-manager-backups")
  await mkdir(backupDirectory, { recursive: true })
  const stamp = new Date().toISOString().replace(/[:.]/g, "-")
  const backupPath = join(backupDirectory, `${basename(configPath)}.${stamp}.bak`)

  await copyFile(configPath, backupPath)
  const [original, backup] = await Promise.all([
    readFile(configPath, "utf8"),
    readFile(backupPath, "utf8"),
  ])
  if (original !== backup) {
    await unlink(backupPath).catch(() => undefined)
    throw new Error("Backup verification failed.")
  }
  return backupPath
}

async function restoreFromBackup(configPath: string, backupPath: string): Promise<void> {
  const backup = await readFile(backupPath, "utf8")
  await writeAtomically(configPath, backup)
}

function integerBounded(
  value: unknown,
  minimum: number,
  maximum: number,
): number | undefined {
  if (typeof value !== "number" || !Number.isInteger(value)) return undefined
  return value >= minimum && value <= maximum ? value : undefined
}

function recordOf(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined
}

export default Plugin.define({
  id: "dynamic-context-manager",
  async setup(ctx) {
    const profile = getHardwareProfile(ctx.options)
    const policy = derivePolicy(ctx.options, profile)
    const configPath = resolveGlobalConfigPath()
    const pendingCompaction = new Set<string>()
    const sessionStatuses = new Map<string, string>()

    async function buildStatusSnapshot(sessionID: string): Promise<StatusSnapshot> {
      const [info, messages, models, selectedModel, config] = await Promise.all([
        ctx.session.get({ sessionID }).catch(() => undefined),
        ctx.session.context({ sessionID }).catch(() => undefined),
        ctx.model.list().catch(() => undefined),
        ctx.model.default().catch(() => undefined),
        readConfigState(configPath),
      ])

      const infoRecord = recordOf(info)
      const revertRecord = recordOf(infoRecord?.revert)
      const revertMessageID =
        typeof revertRecord?.messageID === "string"
          ? revertRecord.messageID
          : undefined
      const sessionModel = infoRecord?.model ?? selectedModel
      const current = findCurrentStepUsage(messages, revertMessageID, (model) => {
        return readModelContextLimit(models, {
          selected: sessionModel,
          step: model,
        }).tokens
      })
      const limit = readModelContextLimit(models, {
        selected: sessionModel,
        step: current.model,
        fallback: selectedModel,
      })
      const cumulative = summarizeCumulative(info)

      return {
        current,
        cumulative,
        contextLimit: limit.tokens ?? current.contextLimit,
        model: limit.model ?? current.model ?? cumulative.model,
        sessionStatus:
          sessionStatuses.get(sessionID) ?? readSessionStatus(infoRecord?.status),
        hardware: profile,
        policy,
        config,
        pendingCompaction: pendingCompaction.has(sessionID),
      }
    }

    await ctx.session.hook("context", async (event) => {
      try {
        const sessionID = event.sessionID
        event.system.push({
          type: "text",
          text: buildUsageNote(await buildStatusSnapshot(sessionID)),
        })
      } catch {
        // Usage visibility must never break model dispatch.
      }
    })

    const compactionEvents = new AbortController()
    void (async () => {
      try {
        for await (const event of ctx.event.subscribe({
          types: [
            "session.status",
            "session.compaction.ended",
            "session.compaction.failed",
          ],
          signal: compactionEvents.signal,
        })) {
          const envelope = event as {
            type?: unknown
            sessionID?: unknown
            data?: unknown
          }
          const data = recordOf(envelope.data)
          const sessionID =
            typeof envelope.sessionID === "string"
              ? envelope.sessionID
              : typeof data?.sessionID === "string"
                ? data.sessionID
                : undefined
          if (!sessionID) continue

          if (envelope.type === "session.status") {
            sessionStatuses.set(sessionID, readSessionStatus(data?.status))
            continue
          }
          pendingCompaction.delete(sessionID)
        }
      } catch {
        // Event stream shutdown is normal during unload.
      }
    })()

    async function applyConfigChanges(
      changes: CompactionChanges,
      toolContext: {
        sessionID: string
        agent?: string
        messageID?: string
        id?: string
      },
      successPrefix: string,
    ): Promise<{ content: string }> {
      const keys = Object.keys(changes)
      if (keys.length === 0) {
        return {
          content:
            "No valid compaction values were supplied. Supported: keepTokens, bufferPercent, auto, background.",
        }
      }

      let original: string
      let updated: string
      try {
        original = await readFile(configPath, "utf8")
        updated = updateCompactionBlock(original, changes)
      } catch (error) {
        return {
          content: `Global compaction configuration was not changed: ${String(error)}`,
        }
      }

      if (updated === original) {
        return {
          content: `${successPrefix} No write was needed because the values were already current.`,
        }
      }

      let backupPath: string
      try {
        backupPath = await createVerifiedBackup(configPath)
      } catch (error) {
        return {
          content: `Global compaction configuration was not changed: backup failed: ${String(error)}`,
        }
      }

      try {
        await ctx.permission.assert({
          sessionID: toolContext.sessionID,
          agent: toolContext.agent,
          source: {
            type: "tool",
            messageID: toolContext.messageID,
            id: toolContext.id,
          },
          action: CONFIG_ACTION,
          resources: [configPath],
          save: [configPath],
        })
      } catch {
        await unlink(backupPath).catch(() => undefined)
        return {
          content:
            "Global compaction configuration was not changed because approval was not granted.",
        }
      }

      try {
        await writeAtomically(configPath, updated)
        const verified = await readFile(configPath, "utf8")
        if (verified !== updated) throw new Error("Post-write verification failed.")

        return {
          content: `${successPrefix} Updated ${keys.join(", ")}. Verified backup: ${basename(backupPath)}.`,
        }
      } catch (error) {
        let rollback = "Rollback could not be confirmed"
        try {
          await restoreFromBackup(configPath, backupPath)
          rollback = "Restored from the verified backup"
        } catch {
          // Preserve the original error; rollback failure is reported separately.
        }
        return {
          content: `Global compaction configuration was not changed: ${String(error)}. ${rollback}.`,
        }
      }
    }

    await ctx.tool.transform((editor) => {
      editor.namespace({
        name: NAMESPACE,
        description: "Native V2 context status and compaction controls",
      })

      editor.add({
        name: "status",
        description:
          "Report complete DCM status: estimated current context, cumulative accounting, policy, hardware, config state, and native compaction authority.",
        input: {
          type: "object",
          properties: {},
          required: [],
          additionalProperties: false,
        },
        options: { namespace: NAMESPACE, codemode: true },
        execute: async (_input, toolContext) => {
          try {
            return {
              content: buildServerStatus(
                await buildStatusSnapshot(toolContext.sessionID),
              ),
            }
          } catch (error) {
            return { content: `DCM status unavailable: ${String(error)}` }
          }
        },
      })

      editor.add({
        name: "usage",
        description:
          "Alias for dcm.status. Reports current context separately from cumulative session usage and cost.",
        input: {
          type: "object",
          properties: {},
          required: [],
          additionalProperties: false,
        },
        options: { namespace: NAMESPACE, codemode: true },
        execute: async (_input, toolContext) => {
          try {
            return {
              content: buildServerStatus(
                await buildStatusSnapshot(toolContext.sessionID),
              ),
            }
          } catch (error) {
            return { content: `Context status unavailable: ${String(error)}` }
          }
        },
      })

      editor.add({
        name: "compact",
        description:
          "Explicitly request native V2 compaction for the current session. Never runs automatically.",
        input: {
          type: "object",
          properties: {},
          required: [],
          additionalProperties: false,
        },
        options: { namespace: NAMESPACE, codemode: true },
        execute: async (_input, toolContext) => {
          const sessionID = toolContext.sessionID
          try {
            await ctx.session.compact({ sessionID, delivery: "queue" })
            pendingCompaction.add(sessionID)
            return {
              content:
                "Native compaction was explicitly queued. It runs at the next step boundary; this tool does not summarize the session itself.",
            }
          } catch (error) {
            return { content: `Native compaction request failed: ${String(error)}` }
          }
        },
      })

      editor.add({
        name: "setup",
        description:
          "Opt-in hardware-derived compaction setup. Backs up the global config, asks for approval, then applies only keep.tokens and buffer.",
        input: {
          type: "object",
          properties: {},
          required: [],
          additionalProperties: false,
        },
        options: { namespace: NAMESPACE, codemode: true },
        execute: async (_input, toolContext) => {
          const prefix =
            `Hardware profile ${profile.tier} recommends keep ${formatCompactNumber(policy.suggestedKeepTokens)} ` +
            `and buffer ${policy.suggestedBufferPercent}%.`
          return applyConfigChanges(
            {
              keepTokens: policy.suggestedKeepTokens,
              bufferPercent: policy.suggestedBufferPercent,
            },
            toolContext,
            prefix,
          )
        },
      })

      editor.add({
        name: "configure",
        description:
          "Update selected global native compaction values in opencode.jsonc. Requires a verified backup and explicit approval.",
        input: {
          type: "object",
          properties: {
            keepTokens: {
              type: "integer",
              minimum: 1000,
              maximum: policy.compactThresholdTokens,
              description: "New compaction.keep.tokens value.",
            },
            bufferPercent: {
              type: "integer",
              minimum: 1,
              maximum: 95,
              description: "New compaction.buffer percentage.",
            },
            auto: { type: "boolean", description: "New compaction.auto value." },
            background: { type: "boolean", description: "New compaction.background value." },
          },
          required: [],
          additionalProperties: false,
        },
        options: { namespace: NAMESPACE, codemode: true },
        execute: async (rawInput, toolContext) => {
          const input = rawInput as CompactionChanges
          const changes: CompactionChanges = {}

          const keepTokens = integerBounded(
            input.keepTokens,
            1000,
            policy.compactThresholdTokens,
          )
          const bufferPercent = integerBounded(input.bufferPercent, 1, 95)
          if (keepTokens !== undefined) changes.keepTokens = keepTokens
          if (bufferPercent !== undefined) changes.bufferPercent = bufferPercent
          if (typeof input.auto === "boolean") changes.auto = input.auto
          if (typeof input.background === "boolean") changes.background = input.background

          return applyConfigChanges(changes, toolContext, "Manual compaction configuration request:")
        },
      })
    })

    return () => compactionEvents.abort()
  },
})
