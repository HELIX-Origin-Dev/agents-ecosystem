import type {
  ContextManagerOptions,
  DerivedPolicy,
  HardwareProfile,
} from "./shared"

type UnknownRecord = Record<string, unknown>

export type TokenSource = "last-assistant-step" | "unknown"

export type SessionStatus = "idle" | "retry" | "busy" | "unknown"

export interface ModelRef {
  providerID: string
  id: string
}

export interface CurrentStepUsage {
  tokens?: number
  source: TokenSource
  messageID?: string
  completed?: number
  model?: string
  contextLimit?: number
}

export interface CumulativeUsage {
  tokens?: number
  cost?: number
  model?: string
}

export interface ConfigState {
  readable: boolean
  compactionBlock?: boolean
  keepTokens?: number
  bufferPercent?: number
  auto?: boolean
  background?: boolean
  error?: string
}

export interface StatusSnapshot {
  current: CurrentStepUsage
  cumulative: CumulativeUsage
  contextLimit?: number
  model?: string
  sessionStatus: SessionStatus
  hardware: HardwareProfile
  policy: DerivedPolicy
  config: ConfigState
  pendingCompaction: boolean
}

export interface StatusRow {
  label: string
  value: string
}

function asRecord(value: unknown): UnknownRecord | undefined {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as UnknownRecord)
    : undefined
}

function finiteNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined
}

export function formatCompactNumber(value: number | undefined): string {
  if (value === undefined || !Number.isFinite(value)) return "unknown"
  if (value < 1000) return String(Math.round(value))
  if (value < 1_000_000) {
    return `${(value / 1000).toFixed(value < 10_000 ? 1 : 0)}k`
  }
  return `${(value / 1_000_000).toFixed(1)}m`
}

function formatCost(value: number | undefined): string {
  return value === undefined ? "unavailable" : `$${value.toFixed(4)}`
}

function readModelRef(value: unknown): ModelRef | undefined {
  if (typeof value === "string") {
    const separator = value.indexOf("/")
    if (separator > 0 && separator < value.length - 1) {
      return {
        providerID: value.slice(0, separator),
        id: value.slice(separator + 1),
      }
    }
    return undefined
  }
  const record = asRecord(value)
  if (!record) return undefined
  const providerID =
    typeof record.providerID === "string" ? record.providerID : undefined
  const id =
    typeof record.id === "string"
      ? record.id
      : typeof record.modelID === "string"
        ? record.modelID
        : undefined
  return providerID && id ? { providerID, id } : undefined
}

function formatModelRef(model: ModelRef | undefined): string | undefined {
  return model ? `${model.providerID}/${model.id}` : undefined
}

function readStepTokenSum(tokens: unknown): number | undefined {
  const source = asRecord(tokens)
  if (!source) return undefined
  const cache = asRecord(source.cache)
  const candidates = [
    source.input,
    source.output,
    source.reasoning,
    cache?.read,
    cache?.write,
  ]
  let sum = 0
  let sawField = false
  for (const candidate of candidates) {
    const value = finiteNumber(candidate)
    if (value === undefined) continue
    sum += value
    sawField = true
  }
  return sawField ? sum : undefined
}

function readCumulativeTokenSum(tokens: unknown): number | undefined {
  const source = asRecord(tokens)
  if (!source) return undefined
  const total = finiteNumber(source.total)
  if (total !== undefined) return total
  const cache = asRecord(source.cache)
  const candidates = [
    source.input,
    source.output,
    source.reasoning,
    cache?.read,
    cache?.write,
  ]
  let sum = 0
  let sawField = false
  for (const candidate of candidates) {
    const value = finiteNumber(candidate)
    if (value === undefined) continue
    sum += value
    sawField = true
  }
  return sawField ? sum : undefined
}

export function readModelContextLimit(
  models: unknown,
  references: {
    selected?: unknown
    step?: unknown
    fallback?: unknown
  } = {},
): { tokens?: number; model?: string; ref?: ModelRef } {
  const modelList = Array.isArray(models) ? models : []
  const direct = [references.step, references.selected, references.fallback]

  for (const candidate of direct) {
    const record = asRecord(candidate)
    if (!record) continue
    const ref = readModelRef(record)
    const limit = asRecord(record.limit)
    const context = finiteNumber(limit?.context)
    if (ref && context !== undefined && context > 0) {
      return {
        tokens: context,
        model: formatModelRef(ref),
        ref,
      }
    }
    if (ref) {
      for (const model of modelList) {
        const modelRecord = asRecord(model)
        if (!modelRecord) continue
        if (
          readModelRef(modelRecord)?.providerID !== ref.providerID ||
          readModelRef(modelRecord)?.id !== ref.id
        ) {
          continue
        }
        const modelLimit = asRecord(modelRecord.limit)
        const modelContext = finiteNumber(modelLimit?.context)
        if (modelContext !== undefined && modelContext > 0) {
          return {
            tokens: modelContext,
            model: formatModelRef(ref),
            ref,
          }
        }
      }
    }
  }

  return {}
}

function normalizeMessages(messages: unknown): unknown[] {
  if (Array.isArray(messages)) return messages
  const record = asRecord(messages)
  if (!record) return []
  for (const key of ["messages", "data"]) {
    const nested = record[key]
    if (Array.isArray(nested)) return nested
  }
  return []
}

export function findCurrentStepUsage(
  messages: unknown,
  revertMessageID?: string,
  resolveContextLimit?: (model: ModelRef) => number | undefined,
): CurrentStepUsage {
  const list = normalizeMessages(messages)

  for (let index = list.length - 1; index >= 0; index -= 1) {
    const envelope = asRecord(list[index])
    if (!envelope) continue
    const info = asRecord(envelope.info) ?? envelope
    const id = typeof info.id === "string" ? info.id : undefined

    if (revertMessageID && id === revertMessageID) break

    const type = typeof info.type === "string" ? info.type : undefined
    const role = typeof info.role === "string" ? info.role : undefined
    if (type !== "assistant" && role !== "assistant") continue

    const time = asRecord(info.time)
    const completed = finiteNumber(time?.completed)
    if (completed === undefined) continue

    const stepTokens = readStepTokenSum(info.tokens)
    if (stepTokens === undefined) continue

    const modelRef = readModelRef(info.model)
    const contextLimit = resolveContextLimit && modelRef
      ? finiteNumber(resolveContextLimit(modelRef))
      : undefined

    return {
      tokens: stepTokens,
      source: "last-assistant-step",
      messageID: id,
      completed,
      model: formatModelRef(modelRef),
      contextLimit,
    }
  }

  return { source: "unknown" }
}

export function summarizeCumulative(info: unknown): CumulativeUsage {
  const record = asRecord(info)
  if (!record) return {}
  const modelRef = readModelRef(record.model)
  return {
    tokens: readCumulativeTokenSum(record.tokens),
    cost: finiteNumber(record.cost),
    model: formatModelRef(modelRef),
  }
}

export function readSessionStatus(value: unknown): SessionStatus {
  const status =
    typeof value === "string"
      ? value
      : typeof asRecord(value)?.type === "string"
        ? (asRecord(value)?.type as string)
        : undefined
  return status === "idle" || status === "retry" || status === "busy"
    ? status
    : "unknown"
}

function formatConfigState(config: ConfigState): string {
  if (!config.readable) {
    return `unavailable (${config.error ?? "not exposed in this surface"})`
  }
  if (!config.compactionBlock) return "readable; no active compaction block"
  const values: string[] = []
  if (config.keepTokens !== undefined) {
    values.push(`keep ${formatCompactNumber(config.keepTokens)}`)
  }
  if (config.bufferPercent !== undefined) {
    values.push(`buffer ${config.bufferPercent}%`)
  }
  if (config.auto !== undefined) values.push(`auto ${config.auto}`)
  if (config.background !== undefined) {
    values.push(`background ${config.background}`)
  }
  return `readable; compaction block present${values.length ? `; ${values.join(", ")}` : ""}`
}

function currentContextText(snapshot: StatusSnapshot): string {
  const limit = snapshot.contextLimit ?? snapshot.current.contextLimit
  if (limit === undefined || limit <= 0) {
    return `${snapshot.current.tokens === undefined ? "unknown" : formatCompactNumber(snapshot.current.tokens)} (denominator unknown)`
  }
  if (snapshot.current.tokens === undefined) {
    return `unknown (${formatCompactNumber(limit)} model limit available)`
  }
  return `${formatCompactNumber(snapshot.current.tokens)} (${Math.round((snapshot.current.tokens / limit) * 100)}% of model limit)`
}

export function buildServerStatus(snapshot: StatusSnapshot): string {
  const model = snapshot.model ?? snapshot.current.model ?? snapshot.cumulative.model ?? "unknown"
  const source =
    snapshot.current.source === "last-assistant-step"
      ? `last completed assistant step${snapshot.current.messageID ? ` (${snapshot.current.messageID})` : ""}`
      : "unavailable; no completed assistant step has trustworthy token fields"
  const limit = snapshot.contextLimit ?? snapshot.current.contextLimit
  const policy = snapshot.policy as ContextManagerOptions

  return [
    `Current context: ${currentContextText(snapshot)} (estimated).`,
    `Current source: ${source}.`,
    `Model context limit: ${limit === undefined ? "unknown" : formatCompactNumber(limit)} for ${model}.`,
    `Cumulative session tokens: ${formatCompactNumber(snapshot.cumulative.tokens)} (lifetime accounting).`,
    `Cumulative session cost: ${formatCost(snapshot.cumulative.cost)} (lifetime accounting).`,
    `Session status: ${snapshot.sessionStatus}.`,
    `Hardware tier: ${snapshot.hardware.tier} (${snapshot.hardware.logicalCores} logical cores, ${snapshot.hardware.memoryGiB} GiB total memory, ${snapshot.hardware.platform}/${snapshot.hardware.arch}).`,
    `Local policy: hard ceiling ${formatCompactNumber(policy.hardCeilingTokens)}, compact threshold ${formatCompactNumber(policy.compactThresholdTokens)}, keep ${formatCompactNumber(policy.keepTokens)}, buffer ${policy.bufferPercent}%.`,
    `Suggested values for this tier: keep ${formatCompactNumber(snapshot.policy.suggestedKeepTokens)}, buffer ${snapshot.policy.suggestedBufferPercent}%.`,
    `Setup/config state: ${formatConfigState(snapshot.config)}; setup and configure stay explicit-only.`,
    `Native compaction pending: ${snapshot.pendingCompaction ? "yes" : "no"}.`,
    `Current context uses the last completed assistant step only; cache.read is included only inside that step's request accounting, never as a standalone gauge.`,
    `Native compaction remains authoritative; DCM never compacts automatically and does not duplicate summarization.`,
  ].join("\n")
}

export function buildStatusRows(snapshot: StatusSnapshot): StatusRow[] {
  const limit = snapshot.contextLimit ?? snapshot.current.contextLimit
  const model = snapshot.model ?? snapshot.current.model ?? snapshot.cumulative.model ?? "unknown"
  const policy = snapshot.policy as ContextManagerOptions

  return [
    { label: "Current context", value: `${currentContextText(snapshot)} (estimated)` },
    {
      label: "Estimate source",
      value:
        snapshot.current.source === "last-assistant-step"
          ? `last assistant step${snapshot.current.messageID ? ` (${snapshot.current.messageID})` : ""}`
          : "unknown",
    },
    {
      label: "Model limit",
      value: `${limit === undefined ? "unknown" : formatCompactNumber(limit)} (${model})`,
    },
    {
      label: "Cumulative tokens",
      value: `${formatCompactNumber(snapshot.cumulative.tokens)} (lifetime)`,
    },
    {
      label: "Cumulative cost",
      value: `${formatCost(snapshot.cumulative.cost)} (lifetime)`,
    },
    { label: "Session status", value: snapshot.sessionStatus },
    {
      label: "Hardware",
      value: `${snapshot.hardware.tier}, ${snapshot.hardware.logicalCores} cores, ${snapshot.hardware.memoryGiB} GiB`,
    },
    {
      label: "Local policy",
      value: `${formatCompactNumber(policy.hardCeilingTokens)} ceiling, ${formatCompactNumber(policy.compactThresholdTokens)} threshold, ${formatCompactNumber(policy.keepTokens)} keep, ${policy.bufferPercent}% buffer`,
    },
    {
      label: "Suggested",
      value: `${formatCompactNumber(snapshot.policy.suggestedKeepTokens)} keep, ${snapshot.policy.suggestedBufferPercent}% buffer`,
    },
    { label: "Setup/config", value: formatConfigState(snapshot.config) },
    {
      label: "Native compaction",
      value: `${snapshot.pendingCompaction ? "pending" : "not pending"}; authoritative and explicit-only`,
    },
    { label: "Authority", value: "DCM reports guidance; it never auto-compacts" },
  ]
}

export function buildTuiStatus(snapshot: StatusSnapshot): StatusRow[] {
  return buildStatusRows(snapshot)
}

export function buildFooterStatus(snapshot: StatusSnapshot): string {
  if (snapshot.current.tokens === undefined) return "ctx ?"
  return `ctx ${formatCompactNumber(snapshot.current.tokens)} (step)`
}

export function buildUsageNote(snapshot: StatusSnapshot): string {
  return `<context key="dynamic-context-manager">\n${buildServerStatus(snapshot)}\n</context>`
}
