---
name: php-development
description: Build PHP code with explicit dependencies, validated input, and clear request boundaries.
---

## Goal

Keep PHP applications safe and maintainable by making boundaries and types explicit.

## When to use

- Implementing web handlers, services, or scripts in PHP.
- Reviewing request parsing, validation, or dependency wiring.
- Refactoring legacy code with hidden globals.

## Steps

1. Consult the official PHP documentation as the source of truth for language behavior.
2. Type method signatures and return values so contracts are visible.
3. Validate and normalize request input at the boundary before use.
4. Keep dependencies injected rather than located through global state.
5. Separate routing, application logic, and persistence into distinct layers.
6. Write errors to logs with context and return safe messages to callers.
7. Describe runtime expectations generically without pinning version numbers.

## Verification

- Tests and static checks pass from a clean checkout with documented setup.
- Untrusted input is validated before reaching business logic.
- Error responses do not expose internal implementation details.
