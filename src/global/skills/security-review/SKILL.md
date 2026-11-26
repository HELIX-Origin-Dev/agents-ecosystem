---
name: Security Review
description: Assess changes for trust boundaries, input validation, and safe handling of sensitive data.
---

## Goal

Identify exploitable weaknesses early and make risk explicit before release.

## When to use

- Reviewing authentication, authorization, or data-access changes.
- Adding external input paths, file handling, or outbound integrations.
- Preparing a release that handles personal or regulated information.

## Steps

1. Map trust boundaries and list what each boundary assumes about its inputs.
2. Check authorization at every entry point, not only at the user interface.
3. Validate and normalize untrusted input before use or storage.
4. Review output encoding and safe construction of queries, paths, and commands.
5. Inspect logging and error messages for unintended disclosure.
6. Confirm sensitive values come from external configuration, never source code.
7. Rank findings by impact and exploitability, with a concrete remediation.

## Verification

- Each finding includes the affected boundary and a reproduction outline.
- No real sensitive values appear in documentation, tests, or logs.
- Accepted risks are recorded with an owner and a compensating control.
