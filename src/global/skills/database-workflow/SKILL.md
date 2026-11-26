---
name: database-workflow
description: Plan schema changes and data operations with backup, review, and recovery in mind.
---

## Goal

Change data and structure without losing information or surprising downstream consumers.

## When to use

- Adding or altering tables, columns, indexes, or constraints.
- Backfilling or correcting existing records.
- Planning a cutover that involves persistent state.

## Steps

1. Record the current schema and the invariants that must remain true.
2. Design changes in backward-compatible stages where consumers need time to adapt.
3. Parameterize all values and avoid embedding real data in change files.
4. Estimate impact by row counts and lock or replication behavior before applying.
5. Take and verify a recoverable backup before any destructive operation.
6. Apply changes to a non-production copy first and validate the results.
7. Write a tested reversal plan and document who owns each stage.

## Verification

- Schema and data checks pass on the copied environment before production.
- The reversal path restores the prior state without data loss.
- No sensitive values or environment-specific addresses appear in tracked files.
