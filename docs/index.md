---
layout: default
title: Home
nav_order: 1
description: Documentation for the portable multi-agent ecosystem repository.
---

# Portable Agent Ecosystem

The repository restores a canonical agent ecosystem into native layouts for OpenCode V2, Claude Code, Codex, Cursor, Google Antigravity, and GitHub Copilot. Documentation here covers installation, scope behavior, troubleshooting, architecture, adapter authoring, and canonical research.

## Start here

| Need | Documentation |
|---|---|
| Install or preview an ecosystem | [Installation](user/installation) |
| Understand global, local, and mixed scope | [Scope and collision policy](user/scope-and-collision-policy) |
| Diagnose a failed or unexpected dry-run | [Troubleshooting](user/troubleshooting) |
| Understand the source-to-adapter flow | [Architecture](developer/architecture) |
| Add or change a native adapter | [Adapter authoring](developer/adapter-authoring) |
| Review verified technical decisions | [Developer research index](developer/research/README) |

## Repository guides

| Guide | Location |
|---|---|
| Roadmap | [ROADMAP.md](https://github.com/HELIX-Origin-Dev/agents-ecosystem/blob/main/ROADMAP.md) |
| Privacy notice | [PRIVACY.md](https://github.com/HELIX-Origin-Dev/agents-ecosystem/blob/main/PRIVACY.md) |
| Contributing | [CONTRIBUTING.md](https://github.com/HELIX-Origin-Dev/agents-ecosystem/blob/main/CONTRIBUTING.md) |
| Security policy | [SECURITY.md](https://github.com/HELIX-Origin-Dev/agents-ecosystem/blob/main/SECURITY.md) |
| Support | [SUPPORT.md](https://github.com/HELIX-Origin-Dev/agents-ecosystem/blob/main/SUPPORT.md) |
| Changelog | [CHANGELOG.md](https://github.com/HELIX-Origin-Dev/agents-ecosystem/blob/main/CHANGELOG.md) |

## Boundaries

- The installer previews writes with `--dry-run` and excludes credential-bearing files before any read or copy.
- Native agent configuration is treated as read-only for this project.
- Product versions are not assigned until a release is declared.
- Repository-level facts are centralized in [GitHub repository foundations](developer/research/github-repository-foundations).
