---
name: JSON Processing
description: Inspect, transform, and validate JSON data with attention to shape and failure modes.
---

## Goal

Make JSON transformations predictable and safe even when input varies.

## When to use

- Inspecting an unfamiliar payload or configuration file.
- Reshaping data between two systems with different schemas.
- Validating that generated output matches an expected contract.

## Steps

1. Describe the expected shape, required fields, and nullable values first.
2. Inspect a small representative sample before processing the full dataset.
3. Validate input structure before accessing nested fields.
4. Preserve unknown fields only when the downstream contract requires them.
5. Keep transformations deterministic and avoid silent type coercion.
6. Show a before-and-after sample with sensitive values replaced by `<VALUE>`.
7. Note PowerShell and POSIX quoting differences for any commands you document.

## Verification

- Generated JSON parses cleanly and matches the documented schema.
- Missing or malformed fields produce a clear error rather than a wrong result.
- No real sensitive values appear in samples, logs, or examples.
