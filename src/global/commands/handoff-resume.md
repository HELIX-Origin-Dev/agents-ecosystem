---
description: Ensure and use the project handoff file without remote sync
agent: local-build
---

Load the `handoff-continuity` skill. Confirm the current project's `HANDOFF.md` exists, creating it as a local-only ignored file if missing, then read it fully. Inspect `git status --short --branch`, read `.opencode/PROGRESS.md`, and identify the immediate next step for: $ARGUMENTS

Do not attempt any git pull or credentialed remote operation. State the next step and apply the research-first gate before editing.
