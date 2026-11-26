---
name: Python Development
description: Build and review Python code with attention to clarity, typing, and environment isolation.
---

## Goal

Make Python behavior explicit so code is easy to test, reuse, and maintain.

## When to use

- Implementing application logic, scripts, or data-centric tooling.
- Reviewing interfaces, exception handling, or resource management.
- Refactoring code that mixes computation with external side effects.

## Steps

1. Consult the official Python documentation as the source of truth for language behavior.
2. Keep modules focused and express public interfaces with clear names and types.
3. Prefer explicit exception handling over broad suppression at boundaries.
4. Manage files, connections, and other resources with deterministic cleanup.
5. Separate configuration and credentials from source into external configuration.
6. Write tests that exercise pure functions and document edge cases with examples.
7. Describe environment expectations generically without pinning version numbers.

## Verification

- Code runs in an isolated environment described only by portable requirements.
- Public interfaces have documented inputs, outputs, and failure behavior.
- Tests pass from a clean environment without machine-specific setup.
