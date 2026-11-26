# Plugin Packages and Marketplace Catalogs

This directory separates real, publishable plugin packages from marketplace catalog files. It is not a distribution channel for the repository itself.

DCM (`dynamic-context-manager`) is the only real package. It is an OpenCode V2 plugin package at version `0.1.0` with server and TUI exports, a controlled `files` list, and a single `@opencode/plugin` dependency. The `codex-marketplace/` and `claude-code-marketplace/` directories are catalogs, not packages; they are never published.

GitHub Packages support is documented only for Claude Code and Codex marketplace npm sources. OpenCode V2, GitHub Copilot CLI, Cursor, and Google Antigravity do not have an officially documented GitHub Packages plugin installation specification and must not be described as supported here. See [GitHub Copilot and GitHub Packages distribution](../docs/developer/research/github-copilot-and-package-distribution.md).

## Policy

- Only real plugin bundles receive a `package.json`; catalogs do not.
- Package names use lowercase scoped names in the `@helix-origin-dev` namespace.
- The registry is `https://npm.pkg.github.com`; the public npm registry is never used.
- Versions are concrete before publication; DCM starts at `0.1.0`.
- Repository metadata points to `HELIX-Origin-Dev/agents-ecosystem`.
- A `package-lock.json` is kept for reproducible installation.
- No credential value, webhook URL, environment value, username, password, or token is stored in tracked files.
- Marketplace catalogs may reference npm sources with `package`, `version`, and HTTPS `registry` only for agents whose native formats document them.

## Current contents

| Path | Kind | Published |
|---|---|---|
| `dynamic-context-manager/` | Real OpenCode V2 plugin package | Yes, by release or manual dispatch |
| `codex-marketplace/` | Codex marketplace catalog only | No |
| `claude-code-marketplace/` | Claude Code marketplace catalog only | No |

The declarative source catalog lives in `manifest/plugin-sources.json`. The installer reads that manifest for display only and never copies package directories. Publication automation is documented in [GitHub Copilot and GitHub Packages distribution](../docs/developer/research/github-copilot-and-package-distribution.md#publication-automation).
