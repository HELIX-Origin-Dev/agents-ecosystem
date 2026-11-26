# Global Standard: Research First

Use the `research-first` skill for every non-trivial implementation, configuration, documentation, or workflow change.

## Required workflow

1. Restate the task and list what must be verified online.
2. Use `websearch` and `webfetch` to gather authoritative sources. Prefer official product documentation, then upstream source repositories, then reputable third-party references.
3. Create or update a local gate log in `.opencode/research/<kebab-case-slug>.md` using the active research-log template. Cite exact URLs, access dates, and the facts each source supports. Use at least two authoritative sources for tooling, config, plugin, or API changes and at least one for small local documentation fixes.
4. Put canonical project findings in the project's tracked developer research area and link to them from other docs instead of duplicating them.
5. Summarize the sources, key findings, and the exact proposed change to the user.
6. Use the `question` tool and receive explicit approval before any `write`, `edit`, or `patch`.
7. After implementation, run the verification checklist, update the research log with the result, and update `.opencode/PROGRESS.md`.

## Gate

If the research log is missing, incomplete, or not approved, stop. Do not edit. If web research is unavailable, say so plainly, record the limitation in the log, and ask the user whether to proceed. Never silently skip research.

## Project enhancements

Projects may add a short local supplement with project-specific research destinations, secret-name policies, or verification commands. A supplement must not replace or weaken this general standard, and stale local copies of migrated general rules must not shadow global files.
