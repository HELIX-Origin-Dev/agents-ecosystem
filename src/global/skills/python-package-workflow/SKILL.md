---
name: python-package-workflow
description: Structure Python packages and declare dependencies so environments stay reproducible.
---

## Goal

Make Python projects installable and testable without relying on a particular machine layout.

## When to use

- Starting a Python library or application package.
- Declaring or updating runtime and development dependencies.
- Reviewing packaging metadata, entry points, or build configuration.

## Steps

1. Consult the official Python packaging documentation as the source of truth for behavior.
2. Separate the importable package from tests, examples, and operational files.
3. Declare dependencies once in the project metadata with meaningful constraints.
4. Keep development-only tools in a separate optional group.
5. Define console entry points instead of relying on ad-hoc launch scripts.
6. Include the minimum metadata needed for someone else to build and test locally.
7. Describe environment expectations generically without pinning version numbers.

## Verification

- The package builds and tests pass in a fresh isolated environment.
- Imports work from the installed package, not from the source directory by accident.
- No absolute paths or machine-specific settings appear in packaging metadata.
