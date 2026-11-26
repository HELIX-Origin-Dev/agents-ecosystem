---
name: Java Development
description: Build Java code with clear contracts, explicit dependencies, and predictable lifecycle behavior.
---

## Goal

Keep Java applications maintainable through cohesive packages and well-defined boundaries.

## When to use

- Implementing services, libraries, or batch jobs in Java.
- Reviewing dependency injection, resource handling, or exception design.
- Deciding module boundaries in a growing codebase.

## Steps

1. Consult the official Java documentation as the source of truth for language and library behavior.
2. Keep package responsibilities cohesive and avoid broad utility classes.
3. Define interfaces at genuine seams, not for every implementation class.
4. Handle checked exceptions where recovery is possible; translate at boundaries.
5. Manage resources with deterministic cleanup and avoid leaking threads or handles.
6. Keep configuration and environment-specific values outside compiled code.
7. Describe runtime expectations generically without pinning version numbers.

## Verification

- The build and tests succeed from a clean checkout with documented setup.
- Lifecycle methods have clear start and shutdown behavior.
- Public APIs have documented contracts and exception behavior.
