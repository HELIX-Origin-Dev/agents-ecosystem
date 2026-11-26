---
name: cargo-workflow
description: Manage Rust crates, manifests, and workspace layout with reproducible builds.
---

## Goal

Keep Rust dependency and build configuration clear, minimal, and portable.

## When to use

- Creating a crate or adding a workspace member.
- Reviewing a manifest change or a generated lockfile diff.
- Defining features, targets, or bench and test entry points.

## Steps

1. Consult the official Cargo documentation as the source of truth for manifest behavior.
2. Keep crate metadata accurate and describe what each binary or library provides.
3. Enable only the features the project actually uses and document the rest.
4. Treat generated lockfiles as reviewable artifacts for applications.
5. Separate library and binary targets when both need to be published or tested.
6. Keep build scripts small and explain any external assumptions they make.
7. Describe toolchain expectations generically without pinning version numbers.

## Verification

- The workspace builds and tests from a clean checkout with documented setup.
- Manifest changes include a short rationale for new dependencies or features.
- No absolute paths or host-specific settings appear in tracked configuration.
