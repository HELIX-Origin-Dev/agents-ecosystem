---
name: container-workflow
description: Define portable container builds and runs with explicit inputs and minimal images.
---

## Goal

Make containerized work reproducible and free of hidden host dependencies.

## When to use

- Creating a container definition for an application or tool.
- Reviewing a build that depends on local files or machine-specific settings.
- Documenting how to run a service locally for development.

## Steps

1. State what the container is responsible for and what stays outside it.
2. Keep the build context small and exclude generated or sensitive files.
3. Pin behavior through documented inputs rather than absolute host paths.
4. Pass configuration through environment variables with placeholder values.
5. Keep layers focused and avoid copying local machine state into the image.
6. Define health checks and a clear shutdown path for long-running processes.
7. Note PowerShell and POSIX quoting differences when documenting run commands.

## Verification

- The image builds from a clean checkout with the documented command.
- Running the container produces the same behavior from any host directory.
- No real sensitive values or absolute local paths appear in build files.
