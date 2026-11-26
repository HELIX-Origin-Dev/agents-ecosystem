# Global Standard: Native Context Management with DCM

The global `dynamic-context-manager` (DCM) plugin family is the preferred hardware-aware interface for context visibility. Each supported agent uses its native adapter; the agent's own compaction mechanism remains the only compaction mechanism. DCM never promises UI responsiveness.

## Hard limits and policy guidance

- Treat **90,000 tokens as a local hard-ceiling policy**, not as an authoritative model limit or native headroom measurement.
- With a 200k window, `buffer: "60%"` is suggested local policy that starts native compaction around 80k tokens, leaving margin below the local ceiling.
- `keep.tokens: 8000` targets a sub-10k recent tail. Native compaction is lossy, so exact post-compaction totals cannot be guaranteed.
- DCM never auto-triggers compaction, never duplicates summarization, and never edits project configuration.

## Current context versus cumulative accounting

- Use `dcm.status` for the complete status snapshot. `dcm.usage` is a compatibility alias that returns the same snapshot.
- Current context is an **estimate** from the newest completed assistant step. It scans newest-to-oldest, stops at the native revert boundary, sums the documented step token fields, and reports `unknown` when no trustworthy step exists.
- Cumulative session tokens and cost are **lifetime accounting**. They must carry their own label and must never be rendered as current context, headroom, or a `ctx` gauge.
- `cache.read` is included only inside the last completed step's request accounting. It is never a standalone current-context gauge.
- An occupancy percentage is shown only when a finite positive model `limit.context` is matched by both `providerID` and model `id`; otherwise the denominator is reported as unknown and no percentage is shown.
- Do not call `ctx.session.contextSize()`; it is an upstream feature request, not an available API.

## DCM surfaces and controls

- `dcm.status` — complete status snapshot: current context and estimate source, model limit and percentage when available, cumulative tokens and cost labeled as lifetime accounting, session status, hardware profile, derived guidance, local policy, setup/configuration state, pending native compaction, and the native-compaction authority boundary.
- `dcm.usage` — compatibility alias for `dcm.status`.
- `dcm.compact` — explicit native compaction request only; never call automatically.
- `dcm.setup` — opt-in hardware-derived `keep.tokens` and `buffer` setup with a verified backup and explicit approval.
- `dcm.configure` — targeted native compaction changes under the same backup and approval gate.
- OpenCode V2 also exposes a TUI status panel (`dynamic-context-manager.status`) opened with `/dcm-status`; the footer shows `ctx N (step)` for an estimate or `ctx ?` when unknown.

## Required workflow

1. Read `.opencode/PROGRESS.md` before relying on prior context.
2. After every substantive decision or edit, update `.opencode/PROGRESS.md`.
3. Before compaction, use `dcm.status`, ensure the progress log is current and compaction-ready, and refresh the project's local-only `HANDOFF.md`.
4. Request compaction explicitly through `dcm.compact` where available, or the active agent's native compaction interface only:
   - OpenCode V2: `opencode api post /api/session/<session id>/compact --data '{}'`
   - Other agents: use the documented native command or UI action for that agent.
5. After compaction, read `.opencode/PROGRESS.md` again, reopen affected files, and verify the next context measurement with `dcm.status` where available.
6. Preserve durable facts in local logs. Do not preserve verbose tool output as a substitute for a structured summary.

## Prohibited

- Do not invoke DCP, `opencode-dcp`, the `dcp` skill, or any DCP plugin option.
- Do not invoke `prune` or ask for permission to use it.
- Do not treat cumulative tokens or cost as current context or headroom.
- Do not edit global compaction config without the DCM verified-backup and explicit-approval flow.
- Do not delete or weaken this rule without a fresh, explicit user instruction.
