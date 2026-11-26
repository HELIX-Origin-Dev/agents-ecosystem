---
name: Handoff Continuity
description: Ensure every project has a managed, used HANDOFF.md and resume safely without remote sync or skipped research
---

Use this skill at session start, whenever the user references `HANDOFF.md` or another agent's handoff, and before compaction.

## Path conventions

`<project>/HANDOFF.md` and `<project>/.opencode/PROGRESS.md` are local-only files. Paths below are relative to the current project root.

## Workflow

1. Confirm `HANDOFF.md` exists. If it is missing, create it as a local-only, git-ignored file and tell the user. This is handoff housekeeping, not a tracked documentation edit; substantive project changes still require the `research-first` gate.
2. Read `HANDOFF.md` fully.
3. Read `.opencode/PROGRESS.md` fully and treat it as the source of truth for unfinished work, including plans and partial changes.
4. Run `git status --short --branch` and note that `HANDOFF.md` and `.opencode/` are local-only.
5. Locate the "Immediate Next Steps" section and confirm scope with the user if ambiguous.
6. Apply the `research-first` skill to the chosen step before any edit.
7. Never attempt `git pull`, credentialed remote sync, or any other remote mutation without fresh explicit authorization in the current turn.
8. Record completed steps and verification results in the active research log under `.opencode/research/` and in `.opencode/PROGRESS.md`.
9. Before ending or compacting, refresh `HANDOFF.md` so its current state and next steps match the progress log. Do not rely on conversation memory alone.

## Minimum HANDOFF.md contents

Keep the file human-readable and local-only:

- project purpose and runtime environment;
- core decisions and constraints, including secret-name policies but never secret values;
- current workspace state and verification status;
- completed work that affects resume decisions;
- immediate next steps with completion checkboxes;
- a reference to `.opencode/PROGRESS.md` as the durable source of truth.

Never include webhook URLs, cookies, `.env` values, tokens, passwords, usernames, or secret values. Because the file is ignored, it may contain project-local paths for operational clarity, but no secret values.
