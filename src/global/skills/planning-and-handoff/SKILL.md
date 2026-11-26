---
name: planning-and-handoff
description: Capture durable state so work can resume safely in a later session or by another contributor.
---

## Goal

Prevent lost context by recording decisions, constraints, and exact next steps.

## When to use

- Ending a session with unfinished work.
- Passing a task to another contributor or agent.
- Before a context reset or a long pause in activity.

## Steps

1. Record the active task and the current phase in one sentence each.
2. List user decisions and constraints, including any naming or secret-handling policies.
3. Describe the exact file state and known verification failures.
4. Identify immediate next steps as an ordered, actionable list.
5. Include verification commands and their results, or mark them as pending.
6. Keep sensitive values out of the record; use names or placeholders only.
7. Refresh the handoff whenever the state changes, not only at the end.

## Verification

- A reader can resume the task without relying on conversation memory.
- Every listed next step starts from a described, current file state.
- No sensitive values or machine-specific paths appear in the handoff.
