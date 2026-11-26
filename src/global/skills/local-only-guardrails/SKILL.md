---
name: Local-Only Guardrails
description: Enforce local-only, no-remote behavior before git, network, or filesystem-scope decisions
---

Use this skill before any git command, network operation, or decision about where ecosystem files belong.

## Rules

- Gate only commands that can damage the repo or remote state. Read-only inspection is always allowed.
- Mutating git and `gh` commands require explicit user authorization for the exact command in the current turn. Treat any "always" approval as "once" only.
- Do not run `git add`, `commit`, `push`, `pull`, `fetch`, `clone`, tag, publish, or remote-changing commands unless the user asks for that exact action now.
- Safe inspection is automatic: `git status`, `git diff`, `git log`, `git show`, `git ls-files`, `git check-ignore`, `git remote -v`, `gh secret list`, `gh auth status`, `gh repo view`, `gh run list`, and `gh run view`.
- Interactive or blocking commands that can hang the OpenCode GUI are hard-denied; use a non-blocking alternative.
- Leave work local and unstaged unless explicitly authorized otherwise.
- Reusable ecosystem standards, skills, agents, commands, and templates belong under `~/.config/opencode/`. Project-specific local files belong under the project's `.opencode/` directory.
- `HANDOFF.md`, `.opencode/`, cookie exports, `.env*`, and other secret files must stay ignored and untracked.
- Do not configure remote MCP servers, HTTP skill catalogs, or remote references.
- Webhook URLs are operational values: they may appear in tool calls when supplied for repository secret setup, but never in tracked files or final summaries. Never write cookie exports, `.env` contents, tokens, passwords, usernames, or other secret values into tracked files, logs, or tool output.
- Verify with `git status --short` and `git check-ignore -v` before finishing.

## If remote access is required

Ask for explicit authorization in the current turn, then use only the approved command. Do not attempt credential workarounds. Treat remote access as unavailable unless the user supplies a working, authorized method.
