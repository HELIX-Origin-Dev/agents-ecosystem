---
description: Implement only changes that already have an approved research log
agent: local-build
---

Load the `research-first` and `local-only-guardrails` skills. Find the approved research log in the current project's `.opencode/research/` that matches: $ARGUMENTS

If it is missing, incomplete, or not approved, stop and run `/research $ARGUMENTS` instead. Otherwise implement only the approved change, then run the global verification checklist, update `.opencode/PROGRESS.md` and `HANDOFF.md`, and report the result.
