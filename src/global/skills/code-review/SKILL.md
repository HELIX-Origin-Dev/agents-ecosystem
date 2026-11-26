---
name: Code Review
description: Review changes systematically for correctness, maintainability, and risk before merging.
---

## Goal

Find defects and reduce future maintenance cost without blocking reasonable progress.

## When to use

- Before merging a pull request or handing work to another contributor.
- After a large refactor, dependency upgrade, or cross-cutting change.
- When a change touches error handling, data boundaries, or shared interfaces.

## Steps

1. Restate the intended behavior and scope in your own words.
2. Inspect the diff in small sections; separate behavior changes from formatting.
3. Trace each changed input and output across its callers and storage boundaries.
4. Check error paths, empty and boundary values, and concurrency assumptions.
5. Look for accidental scope creep, debug artifacts, and leaked sensitive values.
6. Confirm tests cover the new behavior and the failure modes you identified.
7. Record findings with severity, file location, and a concrete suggested fix.

## Verification

- Every finding maps to a specific location and a reproducible scenario.
- Questions are distinguished from definite defects.
- The summary states what was checked and what was not checked.
