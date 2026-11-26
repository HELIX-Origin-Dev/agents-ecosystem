# Global Standard: Per-Project Handoff Continuity

Every project must have a per-project, local-only, git-ignored `HANDOFF.md`. It must exist, be maintained, and be used. The global `handoff-continuity` skill and `/handoff-resume` command implement this standard.

## At session start or resume

1. Load the `handoff-continuity` skill.
2. Confirm `<project>/HANDOFF.md` exists. If it is missing, create it as a local-only file and tell the user; this is handoff housekeeping, not a tracked documentation edit. Substantive project changes still require the research-first gate.
3. Read `HANDOFF.md` fully.
4. Read `.opencode/PROGRESS.md` fully and treat it as the source of truth for unfinished work.
5. Run `git status --short --branch` and note that `HANDOFF.md` and `.opencode/` are local-only.
6. Locate the "Immediate Next Steps" section and confirm scope with the user if ambiguous.
7. Apply the `research-first` skill to the chosen step before any edit.
8. Never attempt `git pull`, credentialed remote sync, or any other remote mutation without fresh explicit authorization.

## Minimum HANDOFF.md contents

Keep the file human-readable and local-only:

- project purpose and runtime environment;
- core decisions and constraints, including secret-name policies but never secret values;
- current workspace state and verification status;
- completed work that affects resume decisions;
- immediate next steps with completion checkboxes;
- link or reference to `.opencode/PROGRESS.md` as the durable source of truth.

Never include webhook URLs, cookies, `.env` values, tokens, passwords, usernames, or local tooling references that must not appear in tracked docs. Because the file is ignored, it may contain project-local paths for operational clarity, but no secret values.

## Before ending or compacting

- Record completed steps and verification results in the active research log under `.opencode/research/`.
- Update `.opencode/PROGRESS.md` so it is compaction-ready.
- Refresh `HANDOFF.md` so its current state and immediate next steps match the progress log.
- Do not rely on conversation memory alone.
