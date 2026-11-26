---
description: Audit global and project OpenCode ecosystem for V2 correctness and consistency
agent: local-build
---

Load the `opencode-local-config` skill. Audit the global `~/.config/opencode/` ecosystem and the current project's `.opencode/` supplements for: $ARGUMENTS

Fetch current official V2 docs before judging any config field. Check that every agent ID, skill ID, command name, and rule path referenced in config exists; that only V2 fields are used; that native V2 `compaction` is the only mechanism and no DCP, `dcp`, or `prune` reference remains; that local DCM (`dynamic-context-manager`) adapters are explicit-only; that git/gh mutations use `ask` permissions rather than blanket hard-denial; and that `HANDOFF.md`, `.opencode/`, cookie files, and `.env*` are ignored. Confirm global standards are not shadowed by stale project-local copies and that project supplements add rather than duplicate general rules. Report findings only.
