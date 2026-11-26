---
name: Data Processing
description: Build repeatable data pipelines with explicit schemas and validation at each stage.
---

## Goal

Transform data reliably so results can be reproduced and audited.

## When to use

- Combining data from several sources into one output.
- Cleaning or normalizing records before analysis.
- Reviewing a pipeline that produces inconsistent or surprising results.

## Steps

1. State the input contract, output contract, and the transformation rule in plain language.
2. Inspect representative records and document expected types and ranges.
3. Keep stages small and validate the output of each before continuing.
4. Make transformations deterministic and avoid implicit ordering assumptions.
5. Record rejected records and reasons instead of silently dropping them.
6. Replace sensitive values with placeholders in samples, logs, and examples.
7. Note PowerShell and POSIX quoting differences for any documented commands.

## Verification

- Re-running the pipeline on the same inputs produces the same outputs.
- Validation reports explain every rejected or altered record.
- No real sensitive values or machine-specific paths appear in tracked artifacts.
