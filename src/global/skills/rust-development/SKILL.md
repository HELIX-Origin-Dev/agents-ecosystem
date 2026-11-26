---
name: Rust Development
description: Build Rust code that uses ownership and error types to make invalid states unrepresentable.
---

## Goal

Produce safe, clear Rust by modeling state in the type system and handling errors deliberately.

## When to use

- Implementing Rust libraries, services, or command-line tools.
- Reviewing ownership, borrowing, or lifetime decisions.
- Refactoring code that relies on unchecked unwrap paths.

## Steps

1. Consult the official Rust documentation as the source of truth for language and library behavior.
2. Model valid states with enums and structs instead of loose booleans and strings.
3. Choose error types that callers can act on, and add context at boundaries.
4. Keep ownership transitions visible; avoid fighting the borrow checker with clones.
5. Isolate unsafe code behind a small, documented, tested interface.
6. Prefer trait bounds that express required capability, not concrete implementations.
7. Describe toolchain expectations generically without pinning version numbers.

## Verification

- The crate builds and its tests pass from a clean checkout.
- No unchecked unwrap remains on a path that can receive external input.
- Unsafe blocks have a documented safety argument and focused tests.
