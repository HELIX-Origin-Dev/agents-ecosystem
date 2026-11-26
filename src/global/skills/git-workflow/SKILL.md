---
name: Git Workflow
description: Organize changes into reviewable units with clear status checks and safe history practices.
---

## Goal

Keep repository history understandable and avoid accidental or unreviewed state changes.

## When to use

- Preparing a change for review or handoff.
- Inspecting a working tree before deciding what to keep.
- Deciding whether a change should be split or reordered.

## Steps

1. Inspect the working tree and describe each modified file in plain language.
2. Split unrelated concerns into separate changes before asking for review.
3. Keep generated artifacts and local-only notes out of tracked areas.
4. Review the diff for unintended edits, sensitive values, and machine-specific paths.
5. Write a change description that explains what changed, why, and how it was verified.
6. Treat any remote or history-altering operation as a separate, explicitly authorized action.
7. Confirm the final state with a read-only status check after each change.

## Verification

- The change contains only files that belong to the stated purpose.
- No secret values, local paths, or unrelated formatting churn appear in the diff.
- Verification results are recorded with the change description.
