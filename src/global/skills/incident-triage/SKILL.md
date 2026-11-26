---
name: incident-triage
description: Assess and coordinate a production incident from detection through stabilization.
---

## Goal

Restore service quickly, communicate clearly, and capture durable learning afterward.

## When to use

- An alert fires or user-reported behavior indicates degraded operation.
- A release or configuration change correlates with unusual failures.
- Multiple teams need a shared picture of impact and progress.

## Steps

1. Confirm impact, scope, and start time from signals rather than assumptions.
2. Assign roles for coordination, investigation, and communication.
3. Freeze risky changes and preserve evidence before altering the system.
4. Correlate recent changes with the onset of symptoms.
5. Choose the least risky reversible mitigation first; escalate if impact grows.
6. Record decisions and timestamps in a shared timeline as work proceeds.
7. After stabilization, remove the trigger and schedule a blameless review.

## Verification

- Impact is reduced and the mitigation is documented.
- The timeline explains cause, detection, and response without guesswork.
- Follow-up actions have owners and target dates.
