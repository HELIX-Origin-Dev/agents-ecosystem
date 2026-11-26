#!/usr/bin/env node
import { createReadStream } from "node:fs"
import {
  copyFile,
  mkdir,
  readFile,
  readdir,
  rename,
  stat,
  writeFile,
} from "node:fs/promises"
import { homedir } from "node:os"
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path"
import { createInterface } from "node:readline"
import { fileURLToPath } from "node:url"

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const ADAPTERS_DIR = join(REPO_ROOT, "adapters")
const ASSETS_MANIFEST = join(REPO_ROOT, "manifest", "assets.json")

const HELP = `Portable agent ecosystem installer (dry-run safe)

Usage:
  node scripts/install.mjs --help
  node scripts/install.mjs --dry-run --agent all --scope global
  node scripts/install.mjs --dry-run --agent all --scope local --project ./example-project
  node scripts/install.mjs --dry-run --global-agent opencode,codex --local-agent cursor,antigravity --project ./example-project

Options:
  --agent <ids|all>          Select agents for the requested scope(s).
  --scope <global|local|both> Install scope; default is both.
  --global-agent <ids|all>   Explicit global-scope agent selection.
  --local-agent <ids|all>    Explicit local-scope agent selection.
  --project <path>           Project root for local scope; default is cwd.
  --dry-run                  Print the plan only; never write or back up.
  --force                    Overwrite changed existing files after backup; unchanged files are skipped.
  --help                     Show this message.

With no selection flags and an interactive terminal, a chooser is shown.
Credential-bearing service configuration and package directories are excluded
before any source read, scan, log, output, or copy. DCM is copied directly
from the canonical source tree; no npm package installation is performed.`

class InstallerError extends Error {}

function parseArgs(argv) {
  const options = {
    agent: undefined,
    scope: "both",
    globalAgent: undefined,
    localAgent: undefined,
    project: undefined,
    dryRun: false,
    force: false,
    help: false,
  }

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index]
    if (argument === "--help" || argument === "-h") {
      options.help = true
      continue
    }
    if (argument === "--dry-run") {
      options.dryRun = true
      continue
    }
    if (argument === "--force") {
      options.force = true
      continue
    }
    const needsValue = [
      "--agent",
      "--scope",
      "--global-agent",
      "--local-agent",
      "--project",
    ]
    if (needsValue.includes(argument)) {
      const value = argv[index + 1]
      if (value === undefined || value.startsWith("--")) {
        throw new InstallerError(`${argument} requires a value.`)
      }
      index += 1
      if (argument === "--agent") options.agent = value
      if (argument === "--scope") options.scope = value.toLowerCase()
      if (argument === "--global-agent") options.globalAgent = value
      if (argument === "--local-agent") options.localAgent = value
      if (argument === "--project") options.project = value
      continue
    }
    throw new InstallerError(`Unknown option: ${argument}`)
  }

  if (!["global", "local", "both", "all"].includes(options.scope)) {
    throw new InstallerError("--scope must be global, local, or both.")
  }
  return options
}

function parseList(value) {
  if (!value) return []
  return value
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
}

function expandSelection(value, available, label) {
  const requested = parseList(value)
  if (requested.includes("all")) return [...available]
  const unknown = requested.filter((id) => !available.includes(id))
  if (unknown.length > 0) {
    throw new InstallerError(`Unknown ${label}: ${unknown.join(", ")}`)
  }
  return requested
}

async function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  try {
    return await new Promise((answer) => rl.question(question, answer))
  } finally {
    rl.close()
  }
}

async function chooseInteractively(available) {
  if (!process.stdin.isTTY) {
    throw new InstallerError(
      "No agent selection was supplied and the terminal is not interactive. Use --agent, --global-agent, or --local-agent.",
    )
  }
  const agents = parseList(await ask(`Agents (${available.join(", ")} or all): `))
  const scope = (await ask("Scope (global/local/both): ")).trim().toLowerCase()
  if (!["global", "local", "both"].includes(scope)) {
    throw new InstallerError("Interactive scope must be global, local, or both.")
  }
  return { agents, scope }
}

function isExcluded(logicalPath, patterns) {
  const normalized = logicalPath.replace(/\\/g, "/").toLowerCase()
  return patterns.some((pattern) => {
    try {
      return new RegExp(pattern, "i").test(normalized)
    } catch {
      return false
    }
  })
}

function assertInside(parent, child, label) {
  const relativePath = relative(parent, child)
  if (
    relativePath.startsWith("..") ||
    isAbsolute(relativePath) ||
    relativePath === ""
  ) {
    throw new InstallerError(`${label} escapes its allowed root.`)
  }
}

function resolveRoot(root, projectRoot) {
  if (root.variable) {
    const fromEnvironment = process.env[root.variable]
    if (fromEnvironment && fromEnvironment.trim()) {
      return {
        path: resolve(fromEnvironment),
        label: `<${root.variable}>`,
      }
    }
    if (
      root.variable === "OPENCODE_CONFIG_HOME" &&
      process.env.XDG_CONFIG_HOME
    ) {
      return {
        path: resolve(process.env.XDG_CONFIG_HOME, "opencode"),
        label: "<XDG_CONFIG_HOME>/opencode",
      }
    }
    const parts = (root.fallback ?? []).map((part) =>
      part === "HOME" ? homedir() : part,
    )
    return {
      path: resolve(...parts),
      label: `<${root.variable}>`,
    }
  }
  if (root.homeRelative) {
    return {
      path: resolve(homedir(), ...root.homeRelative),
      label: `<HOME>/${root.homeRelative.join("/")}`,
    }
  }
  if (root.projectRelative) {
    const parts = String(root.projectRelative)
      .split("/")
      .filter(Boolean)
    return {
      path: resolve(projectRoot, ...parts),
      label: `<PROJECT_ROOT>/${parts.join("/")}`,
    }
  }
  throw new InstallerError("Adapter root descriptor is unsupported.")
}

async function loadAdapters() {
  const entries = await readdir(ADAPTERS_DIR, { withFileTypes: true })
  const result = new Map()
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const manifestPath = join(ADAPTERS_DIR, entry.name, "manifest.json")
    try {
      const manifest = JSON.parse(await readFile(manifestPath, "utf8"))
      if (!manifest.id || !manifest.scopes) continue
      result.set(manifest.id, manifest)
    } catch {
      // Ignore adapter folders without a valid manifest.
    }
  }
  return result
}

async function collectSourceFiles(logicalSource, patterns) {
  if (isExcluded(logicalSource, patterns)) return []
  const sourcePath = resolve(REPO_ROOT, logicalSource)
  assertInside(REPO_ROOT, sourcePath, `Source ${logicalSource}`)
  const info = await stat(sourcePath)
  if (info.isFile()) {
    return [{ absolute: sourcePath, relative: "" }]
  }
  if (!info.isDirectory()) return []

  const files = []
  async function visit(directory, prefix) {
    const entries = await readdir(directory, { withFileTypes: true })
    for (const entry of entries) {
      const logical = prefix ? `${prefix}/${entry.name}` : entry.name
      if (isExcluded(`${logicalSource}/${logical}`, patterns)) continue
      const absolute = join(directory, entry.name)
      if (entry.isDirectory()) {
        await visit(absolute, logical)
      } else if (entry.isFile()) {
        files.push({ absolute, relative: logical })
      }
    }
  }
  await visit(sourcePath, "")
  return files
}

async function renderCombinedInstructions(logicalSource, patterns, style) {
  const files = (await collectSourceFiles(logicalSource, patterns))
    .filter((item) => item.relative.toLowerCase().endsWith(".md"))
    .sort((left, right) => left.relative.localeCompare(right.relative))
  const sections = []
  for (const file of files) {
    sections.push((await readFile(file.absolute, "utf8")).trim())
  }
  const body = sections.join("\n\n")
  if (style === "cursor") {
    return `---\ndescription: Portable agent ecosystem instructions\n---\n\n${body}\n`
  }
  return `# Portable Agent Ecosystem Instructions\n\n${body}\n`
}

async function renderSkillName(sourcePath, relativePath) {
  const content = await readFile(sourcePath, "utf8")
  const segments = relativePath.split(/[\\/]+/)
  if (segments[segments.length - 1].toLowerCase() !== "skill.md") {
    return content
  }
  const skillId = segments[segments.length - 2]
  if (!skillId) {
    throw new InstallerError(`Skill has no parent directory: ${relativePath}`)
  }
  const frontmatter = content.match(/^(---\r?\n)([\s\S]*?)(\r?\n---(?:\r?\n|$))/)
  if (!frontmatter) {
    throw new InstallerError(`Skill frontmatter is missing: ${relativePath}`)
  }
  const prefix = frontmatter[1]
  const body = frontmatter[2]
  const updatedBody = body.replace(
    /^([ \t]*name:[ \t]*)[^\r\n]*/m,
    `$1${skillId}`,
  )
  if (updatedBody === body) {
    throw new InstallerError(`Skill name field is missing: ${relativePath}`)
  }
  return (
    content.slice(0, prefix.length) +
    updatedBody +
    content.slice(prefix.length + body.length)
  )
}

async function buildPlan(options, selection, adapters, patterns) {
  const projectRoot = options.project
    ? resolve(options.project)
    : process.cwd()
  const plan = []
  const seen = new Set()

  const scopeAgents = {
    global: [],
    local: [],
  }

  if (options.globalAgent !== undefined) {
    scopeAgents.global = expandSelection(
      options.globalAgent,
      [...adapters.keys()],
      "global agent",
    )
  }
  if (options.localAgent !== undefined) {
    scopeAgents.local = expandSelection(
      options.localAgent,
      [...adapters.keys()],
      "local agent",
    )
  }

  const explicitSplitScope =
    options.globalAgent !== undefined || options.localAgent !== undefined
  if (!explicitSplitScope) {
    const ids =
      options.agent !== undefined
        ? expandSelection(options.agent, [...adapters.keys()], "agent")
        : selection.agents.length > 0
          ? expandSelection(selection.agents.join(","), [...adapters.keys()], "agent")
          : []
    const wantedScopes =
      options.scope === "both" || options.scope === "all"
        ? selection.scope === "global" || selection.scope === "local"
          ? [selection.scope]
          : ["global", "local"]
        : [options.scope]
    for (const scope of wantedScopes) scopeAgents[scope] = ids
  }

  if (scopeAgents.global.length === 0 && scopeAgents.local.length === 0) {
    throw new InstallerError("No agents were selected.")
  }

  for (const scope of ["global", "local"]) {
    for (const agentId of scopeAgents[scope]) {
      const manifest = adapters.get(agentId)
      const scopeConfig = manifest.scopes[scope]
      if (!scopeConfig) continue
      const root = resolveRoot(scopeConfig.root, projectRoot)

      for (const component of scopeConfig.components) {
        if (isExcluded(component.source, patterns)) continue
        if (isExcluded(component.destination, patterns)) continue
        const destination = resolve(root.path, component.destination)
        assertInside(root.path, destination, `${agentId} ${scope} destination`)
        const key = `${scope}|${destination.toLowerCase()}`
        if (seen.has(key)) continue
        seen.add(key)

        const transform = component.transform ?? "copy"
        let files = []
        if (
          ["agents-md", "cursor-rule", "antigravity-rule"].includes(transform)
        ) {
          const content = await renderCombinedInstructions(
            component.source,
            patterns,
            transform === "cursor-rule" ? "cursor" : "plain",
          )
          files = [{ absolute: null, destination, content, logicalSource: component.source }]
        } else if (transform === "skill-name") {
          const sources = await collectSourceFiles(component.source, patterns)
          for (const source of sources) {
            const target = source.relative
              ? join(destination, source.relative)
              : destination
            assertInside(root.path, target, `${agentId} ${scope} destination`)
            files.push({
              absolute: null,
              destination: target,
              content: await renderSkillName(source.absolute, source.relative),
              logicalSource: `${component.source}${source.relative ? `/${source.relative}` : ""}`,
            })
          }
        } else {
          const sources = await collectSourceFiles(component.source, patterns)
          for (const source of sources) {
            const target = source.relative
              ? join(destination, source.relative)
              : destination
            assertInside(root.path, target, `${agentId} ${scope} destination`)
            files.push({
              absolute: source.absolute,
              destination: target,
              logicalSource: `${component.source}${source.relative ? `/${source.relative}` : ""}`,
            })
          }
        }

        for (const file of files) {
          const exists = await fileExists(file.destination)
          const unchanged = exists && (await destinationMatches(file.destination, file))
          const action = unchanged
            ? "unchanged"
            : exists
              ? options.force
                ? "backup+overwrite"
                : "backup+skip"
              : "create"
          const destinationLabel =
            relative(root.path, file.destination).replace(/\\/g, "/") || "."
          plan.push({
            agent: agentId,
            scope,
            transform,
            logicalSource: file.logicalSource,
            destination: file.destination,
            label: `${root.label}/${destinationLabel}`,
            content: file.content,
            absolute: file.absolute,
            exists,
            action,
          })
        }
      }
    }
  }
  return plan
}

async function fileExists(path) {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}

async function destinationMatches(path, item) {
  try {
    if (item.content !== undefined) {
      return (await readFile(path, "utf8")) === item.content
    }
    if (item.absolute) {
      const [installed, source] = await Promise.all([
        readFile(path),
        readFile(item.absolute),
      ])
      return installed.equals(source)
    }
  } catch {
    return false
  }
  return false
}

async function backupExisting(path) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-")
  let candidate = `${path}.agent-ecosystem.bak-${stamp}`
  let counter = 1
  while (await fileExists(candidate)) {
    candidate = `${path}.agent-ecosystem.bak-${stamp}-${counter}`
    counter += 1
  }
  await copyFile(path, candidate)
  return candidate
}

async function applyPlan(plan, options) {
  for (const item of plan) {
    if (isExcluded(item.logicalSource, options.patterns)) continue
    if (item.action === "unchanged") continue
    if (item.exists) {
      await backupExisting(item.destination)
      if (!options.force) continue
    }
    await mkdir(dirname(item.destination), { recursive: true })
    if (item.content !== undefined) {
      const temporary = `${item.destination}.installer.tmp-${process.pid}-${Date.now()}`
      await writeFile(temporary, item.content, "utf8")
      await rename(temporary, item.destination)
    } else {
      await copyFile(item.absolute, item.destination)
    }
  }
}

function printPlan(plan, dryRun) {
  const prefix = dryRun ? "[dry-run]" : "[install]"
  for (const item of plan) {
    console.log(
      `${prefix} ${item.agent}/${item.scope}: ${item.logicalSource} -> ${item.label} (${item.transform}, ${item.action})`,
    )
  }
  console.log(`${prefix} ${plan.length} planned destination(s).`)
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  if (options.help) {
    console.log(HELP)
    return
  }

  const assetManifest = JSON.parse(await readFile(ASSETS_MANIFEST, "utf8"))
  const patterns = (assetManifest.exclusions ?? []).map((entry) => entry.pattern)
  options.patterns = patterns

  const adapters = await loadAdapters()
  const available = [...adapters.keys()].sort()
  const hasSelection =
    options.agent !== undefined ||
    options.globalAgent !== undefined ||
    options.localAgent !== undefined
  const selection = hasSelection
    ? { agents: [], scope: "both" }
    : await chooseInteractively(available)
  const plan = await buildPlan(options, selection, adapters, patterns)

  printPlan(plan, options.dryRun)
  if (!options.dryRun) {
    await applyPlan(plan, options)
    console.log("[install] Completed with backup, skip-by-default, and force rules applied.")
  } else {
    console.log("[dry-run] No files were written or backed up.")
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`Installer error: ${message}`)
  process.exitCode = 1
})
