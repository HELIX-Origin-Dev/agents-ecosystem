---
name: Ruby Development
description: Build Ruby code with clear objects, explicit dependencies, and maintainable conventions.
---

## Goal

Keep Ruby projects readable and predictable as responsibilities grow.

## When to use

- Implementing Ruby applications, scripts, or libraries.
- Reviewing object responsibilities, monkey patches, or configuration load order.
- Refactoring code with hidden global state.

## Steps

1. Consult the official Ruby documentation as the source of truth for language behavior.
2. Keep each class focused on one responsibility and name it after that role.
3. Pass dependencies in explicitly instead of reaching into global state.
4. Avoid reopening core classes; prefer a small, documented extension module.
5. Keep configuration loading deterministic and fail early on missing values.
6. Test behavior through public interfaces and document edge cases with examples.
7. Describe runtime expectations generically without pinning version numbers.

## Verification

- Tests pass from a clean checkout with the documented setup.
- Load order does not change observable behavior.
- Environment-specific values are external and named clearly.
