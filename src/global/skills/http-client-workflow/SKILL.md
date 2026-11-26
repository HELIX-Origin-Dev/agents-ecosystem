---
name: http-client-workflow
description: Exercise HTTP interfaces with clear request definitions and repeatable checks.
---

## Goal

Make HTTP interactions reproducible so behavior can be demonstrated and debugged by others.

## When to use

- Manually verifying an endpoint or webhook handler.
- Capturing a request sequence for documentation or regression tests.
- Investigating an integration failure with an external service.

## Steps

1. Describe the request purpose, method, target path, and expected response shape.
2. Keep addresses configurable and avoid embedding real service values in examples.
3. Document headers and body fields as placeholders with `<VALUE>` where appropriate.
4. Send the request and record status, headers, and a redacted response summary.
5. Separate transport failures from application-level error responses.
6. Note PowerShell and POSIX quoting differences when commands are shown in docs.
7. Convert a useful one-off request into a reusable, checked-in example.

## Verification

- The request can be replayed from documentation without discovering hidden context.
- No real sensitive values or internal addresses appear in recorded examples.
- Expected and actual responses are compared explicitly.
