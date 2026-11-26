---
name: Gradle Workflow
description: Keep Gradle builds modular, readable, and free of host-specific assumptions.
---

## Goal

Make Gradle projects fast enough to iterate on and clear enough to review.

## When to use

- Creating or restructuring a Gradle project or multi-module build.
- Reviewing dependency declarations, plugins, or custom tasks.
- Separating local development from automated build behavior.

## Steps

1. Consult the official Gradle documentation as the source of truth for build behavior.
2. Keep the settings file focused on module inclusion and naming.
3. Put shared conventions in one place and keep module scripts declarative.
4. Declare dependencies with explicit configurations and avoid dynamic wildcards.
5. Keep custom tasks small, documented, and deterministic.
6. Move machine-specific values into external configuration with safe defaults.
7. Describe build expectations generically without pinning version numbers.

## Verification

- The build and tests pass from a clean checkout with documented setup.
- A task produces the same outputs regardless of the working directory.
- No absolute paths or local machine references appear in tracked build files.
