---
name: Search and Navigation
description: Locate files and symbols efficiently with layered searches and clear navigation notes.
---

## Goal

Find the right code or document quickly and leave a trail that helps the next reader.

## When to use

- Orienting yourself in an unfamiliar repository.
- Finding every reference to a symbol, path, or configuration key.
- Investigating where a behavior is implemented across layers.

## Steps

1. Start from names you already know and search by literal text before broad patterns.
2. Narrow results by directory or file type instead of scanning everything repeatedly.
3. Follow imports and references outward from the first match to find ownership.
4. Distinguish definitions, call sites, tests, and documentation in your notes.
5. Record the exact paths and line references that explain the behavior.
6. Note PowerShell and POSIX differences if you record shell-based search commands.
7. Prefer relative, portable paths in any notes you share with collaborators.

## Verification

- The suspected implementation is confirmed by reading, not inferred from a name.
- Every claimed reference has a concrete location attached.
- No search command embeds a machine-specific path or user-specific value.
