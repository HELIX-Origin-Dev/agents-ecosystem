---
name: npm-package-workflow
description: Manage JavaScript dependencies and scripts reproducibly without hardcoding machine details.
---

## Goal

Keep dependency changes reviewable and builds reproducible across contributors.

## When to use

- Adding, removing, or updating a JavaScript or TypeScript dependency.
- Reviewing a manifest change or a generated lockfile diff.
- Defining scripts for common development tasks.

## Steps

1. Consult the official package manager documentation as the source of truth for behavior.
2. State why each dependency is needed and prefer a smaller maintained option.
3. Keep runtime and development dependencies clearly separated.
4. Treat generated lockfiles as reviewable artifacts, not incidental noise.
5. Define named scripts for build, test, and lint so commands stay consistent.
6. Keep lifecycle hooks side-effect-free unless the effect is documented.
7. Describe registry and environment expectations generically without machine paths.

## Verification

- A clean checkout resolves dependencies using the committed manifest and lockfile.
- Scripts work from the project root without absolute paths.
- Dependency changes include a short rationale in the change description.
