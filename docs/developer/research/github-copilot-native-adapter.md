# GitHub Copilot Native Adapter

Status: canonical research\
Last verified: 2026-11-25

This module is the single source of truth for GitHub Copilot native adapter locations and fragment boundaries. Agent discovery paths and plugin formats are defined in [Agent native ecosystem layouts](agent-native-ecosystem-layouts.md); DCM-specific behavior is defined in [Dynamic Context Manager](dynamic-context-manager.md).

## Official sources

| # | URL | Accessed | Facts supported |
|---|-----|----------|-----------------|
| 1 | https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference | 2026-11-25 | Copilot CLI install specifications are `plugin@marketplace`, `OWNER/REPO`, `OWNER/REPO:PATH/TO/PLUGIN`, Git URL, or local path. |
| 2 | https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference | 2026-11-25 | Copilot CLI config lives under `~/.copilot` or `COPILOT_HOME`; `settings.json` is JSONC; `config.json` is internal state; user `agents/`, `skills/`, `hooks/`, and `instructions/` directories are documented. |
| 3 | https://docs.github.com/en/copilot/reference/plugin-and-marketplace-reference | 2026-11-25 | Copilot Agent Plugins use `plugin.json`, fixed `skills/NAME/SKILL.md`, root `mcp.json`, and `com.github.copilot/` extension files. |

## Native adapter

Copilot is a native sixth adapter. Its configuration home is `~/.copilot` by default and may be relocated with `COPILOT_HOME`. Personal configuration takes precedence over repository-local configuration.

| Scope | Native location | Installer use |
|---|---|---|
| Global | `COPILOT_HOME/settings.json` | JSONC settings snippet, merged only as a fragment. |
| Global | `COPILOT_HOME/agents/`, `skills/`, `hooks/`, `instructions/` | Portable canonical assets copied as native fragments. |
| Local | `.github/copilot/settings.json` | Project settings candidate. |
| Local | `.github/copilot/settings.local.json` | Personal local override candidate; never a credential store. |
| Plugin | `plugin.json`, `skills/NAME/SKILL.md`, `mcp.json`, `com.github.copilot/` | Native Agent Plugin layout only; no fabricated component arrays. |

Copilot's internal `config.json` and installed-plugin state are read-only sources and are never installer destinations. Copilot `preCompact` can notify and inject context, but it cannot replace native `/compact` or automatic CLI compaction.

Plugin agents and skills are first-found-wins; MCP servers are last-wins. Fragment generation must respect those discovery rules rather than attempting to merge unrelated plugin trees.

## Verification

- Confirm every Copilot fragment uses a documented native location.
- Confirm Copilot `config.json` is never an installer destination.
- Confirm plugin fragment layout uses the documented Agent Plugin structure.
