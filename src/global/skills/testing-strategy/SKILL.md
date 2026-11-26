---
name: Testing Strategy
description: Design a balanced test suite that gives confidence without slowing delivery.
---

## Goal

Cover meaningful behavior at the right level with fast, stable, maintainable tests.

## When to use

- Starting a new module or changing a critical path.
- Reviewing a suite that is slow, flaky, or missing coverage.
- Deciding where a new check belongs in the test pyramid.

## Steps

1. List the behaviors that matter and the failure costs associated with each.
2. Cover pure logic with fast unit tests and clear input/output tables.
3. Exercise interactions and persistence with integration tests at real boundaries.
4. Reserve end-to-end tests for the few journeys that cross the whole system.
5. Keep assertions specific; prefer observable outcomes over internal details.
6. Make setup minimal and deterministic; isolate time, randomness, and external calls.
7. Track coverage as a signal, not a target, and remove tests that no longer inform.

## Verification

- Failures point to a specific behavior rather than a vague stack trace.
- The suite runs reliably in a clean environment.
- Each test has a clear reason to exist and a stable runtime cost.
