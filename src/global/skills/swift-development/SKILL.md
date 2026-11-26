---
name: Swift Development
description: Build Swift code with clear optionals, value semantics, and explicit concurrency.
---

## Goal

Keep Swift applications safe and readable across platforms and runtime boundaries.

## When to use

- Implementing Swift libraries, services, or client applications.
- Reviewing optional handling, protocol design, or concurrency isolation.
- Refactoring code that mixes platform APIs with domain logic.

## Steps

1. Consult the official Swift documentation as the source of truth for language behavior.
2. Use optionals deliberately and unwrap only after an explicit check.
3. Prefer value types for data and document identity where reference types are required.
4. Design protocols around behavior that callers actually need.
5. Make concurrency isolation explicit and avoid hidden shared mutable state.
6. Keep platform-specific conditions behind small, documented adapters.
7. Describe toolchain expectations generically without pinning version numbers.

## Verification

- Build and tests pass with the documented portable setup.
- No force unwrap remains on a path that can receive external input.
- Public APIs have documented optional and failure behavior.
