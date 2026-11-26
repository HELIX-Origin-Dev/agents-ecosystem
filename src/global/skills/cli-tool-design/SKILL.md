---
name: cli-tool-design
description: Design command-line tools with predictable arguments, clear output, and safe defaults.
---

## Goal

Make a command-line interface easy to discover, script, and recover from mistakes.

## When to use

- Creating a new command-line utility or subcommand.
- Refactoring flags, exit behavior, or output formats.
- Preparing a tool for use in automated pipelines.

## Steps

1. Define the primary job and the smallest useful invocation.
2. Choose noun-and-verb subcommands where multiple actions exist.
3. Provide short flags for common cases and long flags for clarity.
4. Make output structured by default when another program will consume it.
5. Separate human-readable diagnostics from machine-readable results.
6. Use distinct exit statuses for success, user error, and runtime failure.
7. Write help text with one example per common task and a safe default path.

## Verification

- Help text matches actual behavior and includes runnable examples.
- Destructive actions require explicit confirmation or a dry-run option.
- Output parses cleanly in a non-interactive shell.
