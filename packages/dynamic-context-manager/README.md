# Dynamic Context Manager

`@helix-origin-dev/dynamic-context-manager` is the real OpenCode V2 plugin package for DCM (`dynamic-context-manager`, display name `DCM`). Version `0.1.0` is the initial package version.

DCM reports hardware-aware context status and keeps the current-step estimate separate from cumulative session token and cost totals. Native OpenCode compaction remains authoritative; DCM never auto-compacts, duplicates summarization, guarantees UI responsiveness, or replaces native `/compact`.

## Package exports

| Export | Entry | Purpose |
|---|---|---|
| `.` | `index.ts` | Server plugin entry with DCM commands and hooks. |
| `./tui` | `tui.tsx` | TUI status panel and footer label. |

## Registry boundary

Publication targets GitHub Package Registry at `https://npm.pkg.github.com` only. The publication workflow authenticates with a runner-local npm configuration generated from the repository-associated `GITHUB_TOKEN`; no credential value is stored in this package. Custom-registry plugin installation is not claimed for OpenCode V2.

Claude Code and Codex marketplace files in this repository are catalogs, not packages. They are not published by the workflow. See [GitHub Copilot and GitHub Packages distribution](../../docs/developer/research/github-copilot-and-package-distribution.md#publication-automation).
