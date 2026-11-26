# Global Standard: Verify After Every Change

After any edit, complete the applicable verification steps before declaring the work done.

## Required checks

1. Re-read the affected files and confirm the intended text is present.
2. Update `.opencode/PROGRESS.md` with the new state, decisions, open plans, and next steps before compaction or ending the turn.
3. Run `git status --short` and confirm no unexpected tracked files.
4. Run `git check-ignore -v` for `HANDOFF.md`, `.opencode/`, cookie files, and `.env*`.
5. Review the diff with `git diff -- ...` and check for secrets, remote operations, deprecated OpenCode V1 fields, and local-path leakage into tracked files.
6. For non-trivial changes, launch the `local-reviewer` subagent with the diff and the relevant research log path.
7. Confirm canonical project research is linked rather than duplicated, and tracked docs use GFM with Mermaid diagrams wherever a flow, sequence, state transition, or relationship benefits from one.
8. Report the verification result before declaring completion.

## Permission note

Git and `gh` mutations require fresh explicit authorization and use `ask` permissions; they are not blanket hard-denied by policy. Read-only inspection is automatic.

## Project enhancements

Projects may add a short local supplement with exact test commands, project-specific paths, or secret-name policies. The supplement must not weaken this general checklist.
