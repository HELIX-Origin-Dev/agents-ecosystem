import {
  arch,
  availableParallelism,
  cpus,
  freemem,
  platform,
  totalmem,
} from "node:os"

export type HardwareTier = "low" | "medium" | "high" | "unknown"

export interface ContextManagerOptions {
  hardCeilingTokens: number
  compactThresholdTokens: number
  keepTokens: number
  bufferPercent: number
}

export interface HardwareProfile {
  tier: HardwareTier
  memoryGiB: number
  freeMemoryGiB: number
  logicalCores: number
  platform: string
  arch: string
}

export interface DerivedPolicy extends ContextManagerOptions {
  suggestedKeepTokens: number
  suggestedBufferPercent: number
}

import type { CumulativeUsage } from "./status"

export type UsageSummary = CumulativeUsage

export { formatCompactNumber } from "./status"

const DEFAULT_OPTIONS: ContextManagerOptions = {
  hardCeilingTokens: 90000,
  compactThresholdTokens: 80000,
  keepTokens: 8000,
  bufferPercent: 60,
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function readPositiveNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? value
    : fallback
}

export function normalizeOptions(options: unknown): ContextManagerOptions {
  const source =
    options && typeof options === "object"
      ? (options as Record<string, unknown>)
      : {}

  const hardCeilingTokens = readPositiveNumber(
    source.hardCeilingTokens,
    DEFAULT_OPTIONS.hardCeilingTokens,
  )
  const compactThresholdTokens = clamp(
    readPositiveNumber(
      source.compactThresholdTokens,
      DEFAULT_OPTIONS.compactThresholdTokens,
    ),
    1,
    hardCeilingTokens,
  )

  return {
    hardCeilingTokens,
    compactThresholdTokens,
    keepTokens: readPositiveNumber(
      source.keepTokens,
      DEFAULT_OPTIONS.keepTokens,
    ),
    bufferPercent: clamp(
      readPositiveNumber(source.bufferPercent, DEFAULT_OPTIONS.bufferPercent),
      1,
      95,
    ),
  }
}

export function getHardwareProfile(options: unknown = {}): HardwareProfile {
  const normalized = normalizeOptions(options)
  let memoryGiB = 0
  let freeMemoryGiB = 0
  let logicalCores = 0

  try {
    memoryGiB = totalmem() / 1024 ** 3
  } catch {
    memoryGiB = 0
  }
  try {
    freeMemoryGiB = freemem() / 1024 ** 3
  } catch {
    freeMemoryGiB = 0
  }
  try {
    logicalCores =
      typeof availableParallelism === "function"
        ? availableParallelism()
        : cpus().length
  } catch {
    try {
      logicalCores = cpus().length
    } catch {
      logicalCores = 0
    }
  }

  let tier: HardwareTier = "unknown"
  if (memoryGiB > 0 && logicalCores > 0) {
    if (memoryGiB < 8 || logicalCores < 4) tier = "low"
    else if (memoryGiB >= 32 && logicalCores >= 8) tier = "high"
    else tier = "medium"
  }

  return {
    tier,
    memoryGiB: Math.round(memoryGiB * 10) / 10,
    freeMemoryGiB: Math.round(freeMemoryGiB * 10) / 10,
    logicalCores,
    platform: platform(),
    arch: arch(),
  }
}

export function derivePolicy(
  options: unknown,
  profile: HardwareProfile,
): DerivedPolicy {
  const configured = normalizeOptions(options)
  const adjustment =
    profile.tier === "low"
      ? { keep: -2000, buffer: 5 }
      : profile.tier === "high"
        ? { keep: 2000, buffer: -5 }
        : { keep: 0, buffer: 0 }

  return {
    ...configured,
    suggestedKeepTokens: clamp(
      configured.keepTokens + adjustment.keep,
      1000,
      configured.compactThresholdTokens,
    ),
    suggestedBufferPercent: clamp(
      configured.bufferPercent + adjustment.buffer,
      1,
      95,
    ),
  }
}

export function tokenTotal(tokens: unknown): number | undefined {
  const source =
    tokens && typeof tokens === "object" && !Array.isArray(tokens)
      ? (tokens as Record<string, unknown>)
      : undefined
  if (!source) return undefined

  const total =
    typeof source.total === "number" && Number.isFinite(source.total)
      ? source.total
      : undefined
  if (total !== undefined) return total

  const cache =
    source.cache && typeof source.cache === "object" && !Array.isArray(source.cache)
      ? (source.cache as Record<string, unknown>)
      : undefined
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
    if (typeof candidate === "number" && Number.isFinite(candidate)) {
      sum += candidate
      sawField = true
    }
  }
  return sawField ? sum : undefined
}

export function summarizeSession(info: unknown): UsageSummary {
  if (!info || typeof info !== "object" || Array.isArray(info)) return {}
  const value = info as Record<string, unknown>
  const model =
    value.model && typeof value.model === "object" && !Array.isArray(value.model)
      ? (value.model as Record<string, unknown>)
      : undefined
  const modelLabel =
    model && typeof model.providerID === "string" && typeof model.id === "string"
      ? `${model.providerID}/${model.id}`
      : undefined

  return {
    tokens: tokenTotal(value.tokens),
    cost:
      typeof value.cost === "number" && Number.isFinite(value.cost)
        ? value.cost
        : undefined,
    model: modelLabel,
  }
}
