---
name: TypeScript Development
description: Use the type system to express intent and catch integration errors before runtime.
---

## Goal

Make contracts explicit so incorrect usage fails early and refactors stay safe.

## When to use

- Defining shared data models or public library interfaces.
- Migrating an existing JavaScript codebase to typed code.
- Reviewing type assertions, generics, or configuration boundaries.

## Steps

1. Consult the official TypeScript documentation as the source of truth for type behavior.
2. Model domain concepts with named types instead of repeated structural literals.
3. Prefer narrowing and guards over unchecked assertions at runtime boundaries.
4. Describe external data with validated shapes before treating it as typed input.
5. Keep compiler settings strict enough to catch realistic mistakes, then fix root causes.
6. Avoid type gymnastics that obscure the actual data flow.
7. State compatibility expectations without pinning version numbers in documentation.

## Verification

- Type checking passes with no suppressed errors hiding real problems.
- Public declarations are readable by a consumer without reading implementation.
- Runtime validation exists wherever untyped input enters the system.
