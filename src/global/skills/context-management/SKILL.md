---
name: Context Management
description: Use DCM (dynamic-context-manager) adapters for hardware-aware context visibility, current-versus-cumulative status, and native compaction workflows across supported agents
---

Use this skill with the global DCM (`dynamic-context-manager`) plugin family when starting long work, when context approaches the local 80k guidance threshold, before compaction, and after compaction resumes. Each supported agent gets a native adapter with hardware-aware guidance. The active agent's own compaction mechanism remains the only actual compaction mechanism, and DCM makes no UI responsiveness guarantee.

## Non-negotiable rules

- The DCM plugin family is the preferred interface for hardware-aware context awareness; each agent keeps its native compaction controls.
- Native compaction is the only compaction mechanism. Never use DCP, `opencode-dcp`, the `dcp` skill, any DCP plugin option, or `prune`.
- Current active context is an estimate from the newest completed assistant step and degrades to `unknown`; cumulative session tokens and cost are lifetime accounting and must never be shown as current context or headroom.
- DCM never auto-triggers compaction, never duplicates summarization, and never edits project configuration.
- Global config writes are opt-in only, require a verified backup and explicit approval, and change only values supported by the active agent's native config.
- Never put secret values, webhook URLs, cookies, `.env` values, usernames, or passwords in logs or tracked files.

## DCM surfaces

- `dcm.status` — complete status snapshot: current context and estimate source, model limit and occupancy percentage when a matched denominator exists, cumulative tokens and cost labeled as lifetime accounting, session status, hardware profile, derived guidance, local policy values, setup/configuration state, pending native compaction, and native-compaction authority.
- `dcm.usage` — compatibility alias that returns the same complete snapshot.
- `dcm.compact` — explicitly queues native compaction; it does not summarize the session itself. Never call it automatically.
- `dcm.setup` — opt-in hardware-derived setup that changes only `keep.tokens` and `buffer` after a verified backup and explicit approval.
- `dcm.configure` — targeted native compaction changes under the same backup, approval, surgical-edit, verification, and rollback rules.
- OpenCode V2 TUI: the `dynamic-context-manager.status` panel opens with `/dcm-status`; no default keybind is assigned. The footer uses `ctx N (step)` for an estimate or `ctx ?` when unknown. The TUI cannot read server configuration, so its setup/config row directs users to `dcm.status`.

Do not call `ctx.session.contextSize()`; no supported plugin API returns exact current context tokens or headroom. `cache.read` is valid only inside the last completed step's request accounting, never as a standalone gauge. Local 90,000 / 80,000 / `60%` guidance is policy, not an authoritative model limit.

## Before compaction

1. Read `.opencode/PROGRESS.md`.
2. Use `dcm.status` to review current context and the complete status snapshot, not only cumulative usage.
3. Confirm the progress log contains the active task, current phase, user decisions and constraints, secret-name policies, current file state, known failures, immediate next steps, and verification status.
4. Add a compact structured dump if anything is missing. Do not paste verbose tool output.
5. Save the dump to `.opencode/PROGRESS.md` **before** requesting compaction.
6. Refresh the project's local-only `HANDOFF.md` so its state and next steps match the progress log.

Use this structure:

```markdown
## Compaction-ready snapshot

- **Active task:** <one sentence>
- **Current phase:** <one sentence>
- **Decisions and constraints:** <bullets>
- **File state:** <bullets with exact paths>
- **Failures:** <bullets>
- **Next steps:** <numbered list>
- **Verification:** <commands and results, or "pending">
```

## Requesting native compaction

When the user or the active workflow explicitly requests compaction, use `dcm.compact` where available, or the active agent's native compaction interface:

```sh
# OpenCode V2 example
opencode api post /api/session/<session id>/compact --data '{}'
```

Other agents use their documented native command or UI action. The request is asynchronous where the agent supports it; follow that agent's native completion events.

Compaction is lossy. With a 200k window, `buffer: "60%"` is local guidance that compacts around 80k tokens, leaving margin below the local 90k ceiling. `keep.tokens: 8000` targets a sub-10k recent tail; it does not guarantee the exact total context size after compaction.

## After compaction

1. Read `.opencode/PROGRESS.md` again.
2. Reopen the files named in the snapshot before relying on their contents.
3. Use `dcm.status` to verify the next context measurement where available; distinguish the current estimate from cumulative lifetime accounting.
4. Continue from the snapshot, not from assumed conversation memory.
