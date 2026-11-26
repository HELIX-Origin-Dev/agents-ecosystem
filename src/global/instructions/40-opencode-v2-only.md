# Global Standard: OpenCode V2 Only

Use only official OpenCode V2 documentation at <https://opencode.ai/docs/> as the source of truth.

## Rules

- Do not use V1 field names such as `permission`, `bash`, `task`, `temperature`, `tools`, `disable`, or `maxSteps`.
- Config uses JSONC with `$schema: https://opencode.ai/config.json`.
- Before editing global or project config, agents, skills, commands, or rules, fetch the relevant V2 docs page again if the API may have changed.
- Config and file changes reload automatically. Use `/reload` only to force a full reload; do not tell the user to restart OpenCode for normal edits.
- Context management uses native V2 `compaction` only.
- Do not install, enable, or invoke `opencode-dcp`, the `dcp` skill, or any DCP plugin option. Do not invoke `prune` or ask for permission to use it.

## Source order

1. Official OpenCode V2 docs.
2. Upstream OpenCode source or repository issues when official docs are incomplete.
3. Reputable third-party references only when official sources are unavailable.
