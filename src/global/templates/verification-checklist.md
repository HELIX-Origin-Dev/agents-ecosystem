# Verification Checklist

Run after every substantive edit in the current project.

## Research gate

- [ ] Matching research log exists in `.opencode/research/`
- [ ] Log status is `approved`
- [ ] Edits match the approved proposed change only

## Local-only

- [ ] No unauthorized git mutation or remote command was run
- [ ] No commit, push, pull, fetch, clone, tag, or remote change was made without fresh explicit authorization
- [ ] Global ecosystem files are under `~/.config/opencode/`; project supplements are under `.opencode/`
- [ ] No remote MCP servers, HTTP skill catalogs, or remote references were added
- [ ] No tracked file mentions local tooling, local paths, or local-only setup
- [ ] Project research facts live in `docs/developer/research/` and are linked, not duplicated

## Secret hygiene

- [ ] `HANDOFF.md` is ignored and untracked
- [ ] `.opencode/` is ignored and untracked
- [ ] Cookie exports (`*cookies*.json`, `*cookies*.txt`) are ignored and untracked
- [ ] `.env*` files are ignored and untracked
- [ ] No tokens, cookies, `.env` values, passwords, usernames, or HANDOFF secret values appear in diffs or tool output
- [ ] No webhook URL appears in tracked files or final summaries

## Shell strategies

- [ ] Used `workdir` instead of `cd`
- [ ] Used explicit `timeout` / `background` where appropriate
- [ ] Avoided unsafe chaining, untrusted arguments, and dynamic evaluation
- [ ] Used the host's preferred shell syntax

## Documentation quality

- [ ] Correct tier: `docs/user/**`, `docs/developer/**`, or `docs/developer/research/**`
- [ ] Detailed, human-readable, and extensive
- [ ] GFM tables and task lists used where appropriate
- [ ] Mermaid diagram present where a flow, sequence, state, or relationship benefits
- [ ] Canonical research facts linked, not duplicated
- [ ] Documentation standards skill followed

## Config correctness

- [ ] Only OpenCode V2 fields used
- [ ] Referenced global and project agent IDs exist
- [ ] Referenced skill IDs exist
- [ ] Referenced command names exist
- [ ] Every explicit instruction path in config exists
- [ ] Native V2 `compaction` is the only compaction mechanism
- [ ] No DCP, `opencode-dcp`, `dcp` skill, DCP plugin option, or `prune` mechanism was introduced
- [ ] Installed global DCM (`dynamic-context-manager`) adapter remains explicit-only and is not duplicated project-locally
- [ ] Git/gh mutations use `ask` permissions; read-only inspection remains allowed
- [ ] No deprecated V1 fields (`permission`, `bash`, `task`, `temperature`, `tools`, `disable`, `maxSteps`)

## Final checks

- [ ] `git status --short` reviewed
- [ ] `git diff` and `git diff --check` reviewed
- [ ] `git check-ignore -v HANDOFF.md .opencode/` confirms ignores
- [ ] `local-reviewer` subagent consulted for non-trivial changes
- [ ] `.opencode/PROGRESS.md` and `HANDOFF.md` current before ending or compacting
