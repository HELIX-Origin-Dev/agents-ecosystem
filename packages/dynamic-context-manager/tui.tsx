import { Plugin } from "@opencode/plugin/tui"
import { derivePolicy, getHardwareProfile } from "./shared"
import {
  buildFooterStatus,
  buildTuiStatus,
  findCurrentStepUsage,
  readModelContextLimit,
  readSessionStatus,
  summarizeCumulative,
  type ConfigState,
  type StatusSnapshot,
} from "./status"

const PANEL_NAME = "dynamic-context-manager.status"

interface TuiPanelProps {
  name?: unknown
  sessionID?: unknown
}

function recordOf(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined
}

function readCost(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined
}

function buildSnapshot(context: any, sessionID: unknown): StatusSnapshot {
  const profile = getHardwareProfile(context.options)
  const policy = derivePolicy(context.options, profile)
  const config: ConfigState = {
    readable: false,
    error: "not exposed in the TUI surface; use dcm.status",
  }
  const empty: StatusSnapshot = {
    current: { source: "unknown" },
    cumulative: {},
    sessionStatus: "unknown",
    hardware: profile,
    policy,
    config,
    pendingCompaction: false,
  }

  if (typeof sessionID !== "string") return empty

  let info: unknown
  let messages: unknown
  let sessionStatus: unknown = "unknown"
  let selectedModel: unknown
  let sessionCost: unknown

  try {
    info = context.data.session.get(sessionID)
    messages = context.data.session.message.list(sessionID)
    sessionStatus = context.data.session.status(sessionID)
    sessionCost = context.data.session.cost(sessionID)
  } catch {
    // Status rendering must never break the TUI.
  }

  try {
    selectedModel = context.ui.model.current()
  } catch {
    // The selected model is optional for a conservative estimate.
  }

  const infoRecord = recordOf(info)
  const revertRecord = recordOf(infoRecord?.revert)
  const revertMessageID =
    typeof revertRecord?.messageID === "string"
      ? revertRecord.messageID
      : undefined
  const current = findCurrentStepUsage(messages, revertMessageID, (model) => {
    return readModelContextLimit(selectedModel, { step: model }).tokens
  })
  const limit = readModelContextLimit(selectedModel, {
    selected: infoRecord?.model ?? selectedModel,
    step: current.model,
  })
  const cumulative = summarizeCumulative(info)
  const cost = readCost(sessionCost) ?? cumulative.cost
  if (cost !== undefined) cumulative.cost = cost

  return {
    current,
    cumulative,
    contextLimit: limit.tokens ?? current.contextLimit,
    model: limit.model ?? current.model ?? cumulative.model,
    sessionStatus: readSessionStatus(sessionStatus),
    hardware: profile,
    policy,
    config,
    pendingCompaction: false,
  }
}

export default Plugin.define({
  id: "dynamic-context-manager.cli",
  setup(context) {
    context.ui.slot({
      append: "home.footer.status",
      render: ({ sessionID }) => {
        const label = buildFooterStatus(buildSnapshot(context, sessionID))
        return <text fg={context.theme.text.base}>{label}</text>
      },
    })

    context.ui.slot({
      append: "session.panel",
      render: (rawPanel) => {
        const panel = rawPanel as TuiPanelProps
        if (panel.name !== PANEL_NAME) return null

        const rows = buildTuiStatus(buildSnapshot(context, panel.sessionID))
        return (
          <box>
            <text fg={context.theme.text.base}>DCM status</text>
            {rows.map((row) => (
              <text fg={context.theme.text.base}>
                {`${row.label}: ${row.value}`}
              </text>
            ))}
          </box>
        )
      },
    })

    context.keymap.layer(() => ({
      mode: "global",
      commands: [
        {
          id: PANEL_NAME,
          title: "DCM status",
          slash: { name: "dcm-status" },
          run: () => {
            context.ui.panel.open(PANEL_NAME)
          },
        },
      ],
    }))
  },
})
