---
name: Go Development
description: Build Go code with clear interfaces, explicit errors, and straightforward concurrency.
---

## Goal

Keep Go programs simple, readable, and safe under concurrent use.

## When to use

- Implementing services, libraries, or command-line tools in Go.
- Reviewing goroutine lifetimes, channel ownership, or error propagation.
- Deciding package boundaries for a growing module.

## Steps

1. Consult the official Go documentation as the source of truth for language and library behavior.
2. Keep packages focused on a single responsibility and avoid cyclic dependencies.
3. Return errors with context and handle them at the level that can act on them.
4. Define the smallest interface that a consumer actually needs.
5. Give every goroutine an owner and a clear shutdown path.
6. Keep shared state contained or protected, and document the chosen approach.
7. Describe toolchain expectations generically without pinning version numbers.

## Verification

- Tests, including race checks where relevant, pass from a clean checkout.
- No goroutine is started without a termination condition.
- Public packages have documented behavior and error cases.
