---
name: go-module-workflow
description: Organize Go modules, dependencies, and build targets so checkouts stay portable.
---

## Goal

Keep Go module boundaries explicit and dependency changes easy to audit.

## When to use

- Creating a module or splitting a large one into packages.
- Adding or upgrading a dependency and reviewing its transitive effects.
- Defining repeatable build and test entry points.

## Steps

1. Consult the official Go modules documentation as the source of truth for behavior.
2. Choose a module path that reflects the logical project, not a machine location.
3. Keep dependency files committed and review their diffs with the manifest.
4. Group packages by responsibility and avoid import cycles.
5. Replace or exclude directives only with a documented reason and an exit plan.
6. Define build and test entry points that work from the module root.
7. Describe toolchain expectations generically without pinning version numbers.

## Verification

- The module builds and tests from a clean checkout with documented setup.
- Dependency diffs include a short rationale and no unexpected transitive jumps.
- No absolute paths or local replacements remain in committed configuration.
