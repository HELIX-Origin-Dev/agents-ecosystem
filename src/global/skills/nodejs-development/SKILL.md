---
name: nodejs-development
description: Build and review Node.js code with attention to modules, async flow, and runtime boundaries.
---

## Goal

Keep Node.js services and scripts predictable, testable, and easy to operate.

## When to use

- Implementing server-side JavaScript or a command-line utility.
- Reviewing asynchronous code, module boundaries, or startup behavior.
- Diagnosing event-loop blocking or unhandled failures.

## Steps

1. Consult the official Node.js documentation as the source of truth for runtime behavior.
2. Choose the module system deliberately and keep it consistent across the project.
3. Separate pure logic from input/output so core behavior can be tested directly.
4. Handle promise rejections and process signals explicitly at entry points.
5. Keep configuration external and validate it at startup with clear messages.
6. Avoid synchronous work in hot paths; measure before introducing concurrency.
7. Describe required runtime characteristics without pinning version numbers.

## Verification

- The application starts from a clean checkout with documented setup.
- Failure paths exit with an expected status and an actionable message.
- Tests cover the module boundaries and the asynchronous error paths.
