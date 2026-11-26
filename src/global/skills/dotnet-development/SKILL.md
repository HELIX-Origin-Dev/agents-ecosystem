---
name: .NET Development
description: Build .NET code with clear dependency boundaries and predictable configuration.
---

## Goal

Keep .NET solutions understandable, testable, and portable across environments.

## When to use

- Implementing services, libraries, or tools in a .NET language.
- Reviewing dependency injection registrations and configuration binding.
- Refactoring tightly coupled application layers.

## Steps

1. Consult the official .NET documentation as the source of truth for framework behavior.
2. Separate domain logic from framework and infrastructure concerns.
3. Register dependencies explicitly and keep lifetimes intentional and documented.
4. Bind configuration through typed settings with validation at startup.
5. Keep asynchronous calls consistent end to end and avoid blocking waits.
6. Place environment-specific values in external configuration, not source code.
7. Describe target framework expectations generically without pinning version numbers.

## Verification

- Build and tests pass from a clean checkout using documented setup.
- Configuration failures produce clear messages at startup.
- No service depends on machine-specific paths or hard-coded endpoints.
