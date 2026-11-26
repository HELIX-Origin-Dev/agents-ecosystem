---
name: cpp-development
description: Build C++ code with explicit ownership, well-defined interfaces, and careful resource handling.
---

## Goal

Keep C++ systems correct and maintainable by making lifetime and ownership decisions visible.

## When to use

- Implementing performance-sensitive or systems-level components.
- Reviewing pointer ownership, move semantics, or exception safety.
- Refactoring code with manual resource management.

## Steps

1. Consult the official C++ documentation as the source of truth for language and library behavior.
2. Express ownership with value types and standard smart pointers where appropriate.
3. Define clear invariants for classes and enforce them in constructors.
4. Prefer standard library abstractions over bespoke low-level equivalents.
5. Document exception-safety guarantees for operations that can fail.
6. Isolate compiler or platform specifics behind a small portable interface.
7. Describe toolchain expectations generically without pinning version numbers.

## Verification

- Build and tests pass with the documented portable toolchain setup.
- No resource is released twice or left unreleased on a failure path.
- Public headers expose minimal implementation detail and clear contracts.
