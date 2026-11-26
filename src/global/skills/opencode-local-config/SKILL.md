---
name: OpenCode Local Config
description: Maintain global OpenCode V2 standards and project-local supplements without DCP or remote references
---

Use this skill when editing `~/.config/opencode/opencode.jsonc` or any global or project-local agents, instructions, skills, commands, templates, or plugin configuration.

## Ecosystem map

Global, under `~/.config/opencode/`:

- `opencode.jsonc` — V2 config; preserves formatter, websearch, compaction, permissions, policies, and plugin settings.
- `instructions/` — reusable standards loaded through a configured glob.
- `skills/` — global skills; IDs come from folder names, not frontmatter `name`.
- `agents/` — Markdown agents with V2 frontmatter; body is the system prompt.
- `commands/` — slash-command prompt templates supporting `$ARGUMENTS`.
- `templates/` — reusable research, planning, release-note, and verification skeletons.
- `plugins/dynamic-context-manager/` — DCM OpenCode V2 adapter; hardware-aware usage visibility and explicit-only native compaction requests.

Project-local, under `<project>/.opencode/`:

- `opencode.jsonc` — project supplement: `default_agent`, project instruction paths, skill allow rules, and project secret-file policies.
- `rules/` — short project supplements only; do not shadow global standards.
- `research/` — local gate logs; never tracked.
- `PROGRESS.md` — durable local state, decisions, incomplete plans, and next steps.

Every project also has a local-only, ignored `HANDOFF.md` managed by the `handoff-continuity` skill.

## Source of truth

Official OpenCode V2 docs: <https://opencode.ai/docs/>. Fetch the relevant page (config, agents, skills, commands, instructions, permissions, policies, or plugins) before changing that area. Do not use V1 fields such as `permission`, `bash`, `task`, `temperature`, `tools`, `disable`, or `maxSteps`.

## Compaction boundary

Native V2 `compaction` is the only mechanism. Do not install, enable, or invoke `opencode-dcp`, the `dcp` skill, or any DCP plugin option. Do not add or invoke `prune`. The `dynamic-context-manager` (DCM) plugin is local and must not auto-compact or duplicate summarization.

## Git and shell

Gate only commands that can damage the repo: read-only git/gh inspection is always allowed, while mutations require fresh explicit authorization and use `ask` permissions. Follow the global shell strategy at `~/.config/opencode/shell-strategies.md` for command construction.

## Reload

Config and file changes reload automatically. Use `/reload` only for a forced full reload; do not tell the user to restart OpenCode for normal edits.
