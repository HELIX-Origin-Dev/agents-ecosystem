# Portable Agent Ecosystem

The repository restores a canonical agent ecosystem into native layouts for OpenCode V2, Claude Code, Codex, Cursor, Google Antigravity, and GitHub Copilot. Documentation here covers installation, scope behavior, troubleshooting, architecture, adapter authoring, and canonical research.

## Start here

| Need | Documentation |
|---|---|
| Install or preview an ecosystem | [Installation](user/installation.md) |
| Understand global, local, and mixed scope | [Scope and collision policy](user/scope-and-collision-policy.md) |
| Diagnose a failed or unexpected dry-run | [Troubleshooting](user/troubleshooting.md) |
| Understand the source-to-adapter flow | [Architecture](developer/architecture.md) |
| Add or change a native adapter | [Adapter authoring](developer/adapter-authoring.md) |
| Review verified technical decisions | [Developer research index](developer/research/README.md) |

## Boundaries

- The installer previews writes with `--dry-run` and excludes credential-bearing files before any read or copy.
- Native agent configuration is treated as read-only for this project.
- Product versions are not assigned until a release is declared.
