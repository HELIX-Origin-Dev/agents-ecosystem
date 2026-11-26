# Global Standard: Local-Only Workspace

Work stays on this machine and out of git remote unless the user gives fresh explicit authorization in the current turn.

## Git and remote rules

- Read-only git and `gh` inspection is always allowed.
- Mutating git and `gh` commands are not implicit. They require explicit authorization for the exact command in the current turn.
- Treat any "always" approval for a git or `gh` mutation as "once" only.
- Do not commit, push, pull, fetch, clone, tag, publish, or change remotes without that authorization.
- Interactive or blocking commands that can hang the OpenCode GUI are hard-denied; use a non-blocking alternative.

## File placement

- Reusable ecosystem standards, skills, agents, commands, and templates belong under `~/.config/opencode/`.
- Project-specific local files belong under the project's `.opencode/` directory.
- Do not configure remote MCP servers, HTTP skill catalogs, or remote references.
- Never mention local tooling, local paths, or local-only setup in tracked project documentation.

## Ignored artifacts

`HANDOFF.md`, `.opencode/`, cookie exports, `.env*`, and other secret files must stay ignored and untracked. Verify with `git status --short` and `git check-ignore -v` before finishing.

## Secret hygiene

Never print, store, or commit secret values, webhook URLs, cookies, `.env` values, usernames, or passwords in tracked files, tests, logs, or final summaries. Use placeholder-only values in tracked examples.
