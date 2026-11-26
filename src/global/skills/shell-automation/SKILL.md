---
name: Shell Automation
description: Design portable shell workflows with explicit inputs, safe quoting, and predictable failure handling.
---

## Goal

Automate repetitive work with commands that are understandable, reviewable, and safe to rerun.

## When to use

- Writing a script for local repetition or a documented manual procedure.
- Translating an ad-hoc sequence of commands into a reusable workflow.
- Reviewing a script that must work across different shells.

## Steps

1. State the inputs, outputs, and side effects of the workflow before writing commands.
2. Prefer relative paths and project-root-relative references over absolute locations.
3. Quote variables and arguments consistently; never embed untrusted text in a command string.
4. Note PowerShell and POSIX differences such as quoting, path separators, and exit-code handling.
5. Make each step fail visibly and stop before later steps depend on a failed result.
6. Provide a dry-run or preview path for anything that modifies files.
7. Document the script in plain language so it can be translated to another shell.

## Verification

- The workflow behaves the same from any working directory when launched as documented.
- Failure paths leave no partially modified state.
- No machine-specific paths or user-specific values appear in the script.
