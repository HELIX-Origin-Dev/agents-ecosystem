# Plugin Packages and Marketplace Catalogs

This directory preserves marketplace catalog structure for supported agents. No npm package is currently published from this repository.

DCM (`dynamic-context-manager`) is installed directly from the canonical source tree into each agent's native adapter layout. OpenCode receives the DCM implementation files from `src/global/plugins/dynamic-context-manager`; other agents receive their native DCM fragments from their adapters. Desktop and CLI marketplace catalogs remain catalog-only and contain no active npm source entries.

GitHub Packages support was researched for Claude Code and Codex marketplace npm sources, but npm packaging is not used in this repository version. OpenCode V2, GitHub Copilot CLI, Cursor, and Google Antigravity do not have an officially documented GitHub Packages plugin installation specification and must not be described as supported here. See [GitHub Copilot and GitHub Packages distribution](../docs/developer/research/github-copilot-and-package-distribution.md).

## Policy

- No directory under `packages/` contains a `package.json` in this repository version.
- Marketplace catalogs may exist as structure only; they declare no package source until npm packaging is deliberately restored.
- The installer excludes `packages/` before any source read, scan, log, output, or copy.
- No credential value, webhook URL, environment value, username, password, or token is stored in tracked files.
- Native adapter manifests remain the single source of truth for what the installer emits.

## Current contents

| Path | Kind | Published |
|---|---|---|
| `codex-marketplace/` | Codex marketplace catalog structure | No |
| `claude-code-marketplace/` | Claude Code marketplace catalog structure | No |

DCM is emitted by the installer from `src/global/plugins/dynamic-context-manager` and the per-agent native fragments. No publication workflow or declarative npm source catalog is present.
