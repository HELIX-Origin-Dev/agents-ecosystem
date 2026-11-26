---
name: Maven Workflow
description: Keep Maven projects modular with explicit dependencies and reproducible build phases.
---

## Goal

Make Java builds understandable and repeatable without machine-specific configuration.

## When to use

- Creating or restructuring a Maven module hierarchy.
- Reviewing dependency scopes, plugins, or profile changes.
- Defining which build phases run in local and automated environments.

## Steps

1. Consult the official Maven documentation as the source of truth for build behavior.
2. Keep parent configuration minimal and push specifics to the modules that need them.
3. Choose dependency scopes deliberately and remove unused declarations.
4. Document why each plugin is present and what phase it binds to.
5. Keep properties for shared values and avoid repeating literals across modules.
6. Place environment-specific configuration in profiles with clear activation rules.
7. Describe build expectations generically without pinning version numbers.

## Verification

- The project builds and tests from a clean checkout with documented setup.
- No absolute paths or local repository locations appear in tracked files.
- Dependency and plugin changes include a short rationale in the change description.
