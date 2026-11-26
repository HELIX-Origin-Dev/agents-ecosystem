---
name: Migration Planning
description: Plan staged migrations that preserve behavior and allow a safe rollback.
---

## Goal

Move data, code, or infrastructure to a new state with minimal disruption and clear recovery steps.

## When to use

- Replacing a dependency, schema, runtime, or deployment target.
- Consolidating duplicated systems or formats.
- Any change that cannot be completed in a single atomic commit.

## Steps

1. Describe the target state and the invariants that must hold throughout the move.
2. Split the work into reversible stages with a working state after each.
3. Identify compatibility needs during the transition, such as dual reads or adapters.
4. Define the data or configuration mapping and how it will be validated.
5. Plan a cutover with explicit ownership, sequencing, and communication points.
6. Write a rollback procedure that restores the previous state safely.
7. Schedule verification after each stage rather than only at the end.

## Verification

- Each stage has a success criterion and a tested reversal path.
- No stage leaves the system in an unrecoverable mixed state.
- Stakeholders know the timing and the expected observable changes.
