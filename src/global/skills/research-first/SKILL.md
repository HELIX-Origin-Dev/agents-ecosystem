---
name: Research First
description: Mandatory online research gate before implementation, configuration, or documentation edits in any project
---

Use this skill for every change that is not a trivial typo.

## Path conventions

- Paths beginning with `~/.config/opencode/` are user-global ecosystem files.
- Bare paths such as `.opencode/research/`, `.opencode/PROGRESS.md`, `docs/`, and `CHANGELOG.md` are relative to the current project root.
- The research-log template is global: `~/.config/opencode/templates/research-log.md`.

## Workflow

1. Restate the task and list what must be verified online.
2. Use `websearch` and `webfetch` to collect authoritative sources. Prefer official documentation, then upstream repositories, then reputable third-party references.
3. Create or update a local gate log at `.opencode/research/<kebab-case-slug>.md` using the global template. Cite exact URLs, access dates, and the facts each source supports. Use at least two authoritative sources for tooling, config, plugin, or API changes and at least one for small local documentation fixes.
4. Put canonical project findings in `docs/developer/research/<slug>.md` and link to them from other docs instead of duplicating them. Follow the `documentation-standards` skill.
5. Summarize the sources, key findings, and the exact proposed change.
6. Use the `question` tool and wait for explicit user approval before any `write`, `edit`, or `patch`.
7. After implementation, run the verification checklist and update the research log with the result.
8. Before ending a turn with unfinished work, update `.opencode/PROGRESS.md` with the current state, decisions, constraints, incomplete plans, and next steps.

## Gate

If the research log is missing, incomplete, or not approved, stop. Do not edit. If web research is unavailable, record that limitation and ask the user how to proceed. Never silently skip research.

## Exceptions

Only an explicit user override may skip research. Record it in the log's Exception section and still ask before editing.

## Project enhancements

Projects may add a short local supplement with project-specific research destinations, secret-name policies, or verification commands. A supplement must not replace or weaken this global standard.
