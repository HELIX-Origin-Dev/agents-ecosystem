# Unpublished Plugin Package Skeletons

This directory contains placeholder-only package skeletons for the actual plugins in this repository. It is not a distribution channel for the repository itself. Nothing here is published, installed, or executable.

GitHub Packages support is documented only for Claude Code and Codex marketplace npm sources. OpenCode V2, GitHub Copilot CLI, Cursor, and Google Antigravity do not have an officially documented GitHub Packages plugin installation specification and must not be described as supported here.

## Packaging policy

- Only a real plugin bundle receives a package skeleton and optional marketplace metadata. The portable agent ecosystem is a set of installer-delivered skills, rules, templates, commands, agents, config fragments, and docs; it is not a package or plugin.
- Each future plugin has its own directory and its own package manifest.
- Package names use lowercase scoped placeholder names such as `@namespace/<plugin-id>`.
- The registry URL is the documented GitHub Packages npm endpoint, `https://npm.pkg.github.com`.
- The version value `0.0.0` is a placeholder, not a product release.
- Repository metadata uses placeholder repository names under the future `helix-origin` organization slug. No repository is created in this phase.
- `private: true` prevents accidental publication.
- Each package has a controlled `files` list and no scripts, dependencies, binaries, toolchains, or credential values.
- Marketplace snippets describe only plugin bundles and only the component types their native formats support. Skills, agents, commands, hooks, and MCP servers may be bundled where documented; rules and templates are not treated as marketplace-installable standalone components.

## Current skeletons

| Path | Purpose |
|---|---|
| `dynamic-context-manager/` | Unpublished DCM (`dynamic-context-manager`) plugin skeleton; OpenCode V2 native adapter plus placeholder Claude Code and Codex marketplace metadata. |
| `codex-marketplace/` | Codex marketplace catalog snippet for DCM only. |

Claude Code marketplace metadata is a component of the DCM skeleton rather than a separate package directory.

The declarative source catalog lives in `manifest/plugin-sources.json`, not in the package skeletons. It records each plugin id, package name, repository placeholder, current source kind, and future source kind so a plugin can move to a dedicated repository later without changing agent-facing behavior. No remote operation is performed by the installer.
