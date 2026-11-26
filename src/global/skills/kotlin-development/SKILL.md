---
name: Kotlin Development
description: Build Kotlin code with expressive types, safe null handling, and clear coroutine boundaries.
---

## Goal

Keep Kotlin applications concise without hiding control flow or lifetime decisions.

## When to use

- Implementing Kotlin services, libraries, or client applications.
- Reviewing nullability, coroutine scopes, or platform interop.
- Defining data models shared across layers.

## Steps

1. Consult the official Kotlin documentation as the source of truth for language behavior.
2. Model optionality in types and avoid suppressing null checks at boundaries.
3. Use data classes for value semantics and keep them free of hidden side effects.
4. Give coroutines an explicit scope and cancellation path.
5. Keep platform interop conversions contained and documented.
6. Separate pure domain logic from framework and platform APIs.
7. Describe toolchain expectations generically without pinning version numbers.

## Verification

- Build and tests pass from a clean checkout with documented setup.
- No coroutine outlives the scope that owns it.
- Public models have clear nullability and documented behavior.
