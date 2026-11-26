---
name: Debugging Workflow
description: Diagnose failures methodically by forming and testing hypotheses from evidence.
---

## Goal

Find the root cause of a failure and prevent its recurrence, not merely silence the symptom.

## When to use

- A test, build, or runtime path fails without an obvious cause.
- Behavior differs between environments or inputs.
- An intermittent issue appears under load or timing variation.

## Steps

1. Reproduce the failure with the smallest reliable input sequence.
2. Record the exact observed behavior, expected behavior, and environment facts.
3. Reduce the search space by bisecting inputs, configuration, or recent changes.
4. Form one falsifiable hypothesis and design an observation that tests it.
5. Instrument at boundaries to see values entering and leaving each layer.
6. Confirm the cause by making the failure disappear when the cause is removed.
7. Add a regression check before closing the investigation.

## Verification

- The issue reproduces on demand and then stops reproducing after the fix.
- The explanation accounts for all observed symptoms.
- A lasting guard against recurrence exists in tests or monitoring.
