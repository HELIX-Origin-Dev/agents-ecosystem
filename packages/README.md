# Marketplace Catalogs

This directory preserves marketplace catalog structure for supported agents.

DCM (`dynamic-context-manager`) is installed directly from the canonical source tree into each agent's native adapter layout. OpenCode receives the DCM implementation files from `src/global/plugins/dynamic-context-manager`; other agents receive their native DCM fragments from their adapters. Marketplace catalogs are structural only.

## Policy

- Marketplace catalogs declare no active source entries in this repository version.
- The installer excludes `packages/` before any source read, scan, log, output, or copy.
- No credential value, webhook URL, environment value, username, password, or token is stored in tracked files.
- Native adapter manifests remain the single source of truth for what the installer emits.

## Current contents

| Path | Kind |
|---|---|
| `codex-marketplace/` | Codex marketplace catalog structure |
| `claude-code-marketplace/` | Claude Code marketplace catalog structure |

DCM is emitted by the installer from `src/global/plugins/dynamic-context-manager` and the per-agent native fragments.
