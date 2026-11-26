# Global Shell Strategies

Applies to every OpenCode project in the active environment.

The shell tool runs with the host user's filesystem, process, and network authority. OpenCode's scanner expands compound commands into subcommands and checks each one against permission rules.

## Preferred patterns

- Use the shell tool's `workdir` parameter instead of `cd` in command text.
- Give long commands an explicit `timeout`; use `background: true` for servers, watchers, and other long-running jobs.
- Prefer dedicated tools (`read`, `glob`, `grep`, `edit`, `write`) over shell equivalents when they can do the job.
- Keep commands single-purpose. Avoid chaining with `&&`, `;`, or pipes unless every part is safe and understood.
- Use the shell syntax appropriate to the host platform: PowerShell on Windows, POSIX shell on macOS and Linux. Quote paths containing spaces or shell metacharacters.
- Never place untrusted arguments into shell blocks or command templates.
- Avoid `eval` and dynamically generated command strings; the scanner cannot safely analyze them.

## Git and gh

- Read-only git and `gh` commands are always allowed because they cannot damage the repo: `git status`, `git diff`, `git log`, `git show`, `git ls-files`, `git check-ignore`, `git rev-parse`, `git remote -v`, `gh secret list`, `gh auth status`, `gh repo view`, `gh run list`, `gh run view`, and similar inspection commands.
- Commands that can mutate the repo or remote state require explicit user authorization in the current turn. They are not implicit.
- If an "always" approval is offered for a git or `gh` mutation, treat it as "once" only. A durable approval is likely accidental and must not be accepted.
- Use only the exact command the user authorized. If authorization is ambiguous, ask before running it.
- Interactive or blocking commands that can hang the OpenCode GUI (editors, pagers, `tail -f`, `watch`, interactive shells) are always hard-denied, even when explicitly requested. Use a non-blocking alternative or ask the user to run it themselves.

## Verification

- After any shell use that could mutate state, run `git status --short` and report the result.
- If a command is blocked, state which policy blocked it and propose a non-mutating alternative.
