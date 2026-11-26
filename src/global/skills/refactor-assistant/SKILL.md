---
name: Refactor Assistant
description: Plan and execute behavior-preserving code restructuring with clear safety checks.
---

## Goal

Improve structure and readability while keeping observable behavior unchanged.

## When to use

- When a module has grown hard to understand or extend.
- Before adding a feature that the current layout would complicate.
- When repeated code signals a missing abstraction.

## Steps

1. Define the behavior contract and capture current outputs for representative inputs.
2. Identify the smallest sequence of edits that moves toward the target structure.
3. Make one mechanical change at a time and keep each step reviewable.
4. Run the existing tests after each step; stop when any behavior shifts unexpectedly.
5. Rename only after structure settles, so diffs stay easy to interpret.
6. Document any intentional behavior change separately from the refactor.
7. Leave the codebase cleaner than you found it, without unrelated cleanup.

## Verification

- Tests pass before and after with no new behavioral assertions required.
- The diff can be explained as a list of mechanical transformations.
- No formatting-only churn obscures the structural change.
