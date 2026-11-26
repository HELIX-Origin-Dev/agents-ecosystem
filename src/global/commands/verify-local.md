---
description: Verify research gate, local-only state, ignore rules, and secret hygiene
agent: local-build
---

Load the `local-only-guardrails` skill and follow the global verification-checklist template at `~/.config/opencode/templates/verification-checklist.md` for: $ARGUMENTS

Check `git status --short`, `git diff`, `git diff --check`, and `git check-ignore -v` for `HANDOFF.md`, `.opencode/`, cookie files, and `.env*`. Then launch the `local-reviewer` subagent with the diff and relevant research log. Report findings only; do not edit.
