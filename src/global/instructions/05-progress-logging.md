# Global Standard: Durable Progress Logging

`.opencode/PROGRESS.md` is the local-only source of truth for unfinished work. It is ignored by git and must never contain secret values, webhook URLs, cookies, `.env` values, usernames, or passwords.

## Required timing

- After every substantive decision or edit, update `.opencode/PROGRESS.md`.
- Before native compaction, ensure the progress log is current and compaction-ready.
- Before ending a turn with unfinished work, ensure the progress log is current.
- When resuming work, read `.opencode/PROGRESS.md` before relying on conversation history.

## Required contents

The progress log must contain:

- active task and current phase;
- exact user decisions and constraints;
- secret-name policies, never secret values;
- current file state and known test or verification failures;
- immediate next steps;
- verification status and remaining commands.

## Compaction-ready snapshot

Include this exact section heading:

```markdown
## Compaction-ready snapshot
```

Under it, record:

- **Active task:** one sentence.
- **Current phase:** one sentence.
- **Decisions and constraints:** bullet list.
- **File state:** bullet list with exact paths.
- **Failures:** bullet list.
- **Next steps:** numbered list.
- **Verification:** commands and results, or `pending`.

Do not preserve verbose tool output as a substitute for a structured summary.
