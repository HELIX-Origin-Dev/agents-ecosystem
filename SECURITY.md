# Security Policy

## Supported status

This repository is in active development. Security fixes are considered for the latest tracked state of the repository.

No product version is assigned until a release is declared. Do not infer a supported version from adapter plugin manifest placeholder values.

## Reporting a vulnerability

Do not open a public issue for a security vulnerability.

Use the repository's private reporting channel if one is configured. If no private channel is available, contact the repository maintainers through the method listed in [SUPPORT.md](SUPPORT.md) and request a private response.

Include:

- affected component or file path;
- description of the issue and its impact;
- reproduction steps or a dry-run plan;
- expected versus actual behavior;
- whether credentials or installed agent configuration are affected.

Never include secret values, webhook URLs, cookie exports, environment values, usernames, passwords, or tokens in a report.

## What is in scope

- Path traversal or unintended writes outside the selected scope.
- Exclusion bypass that causes a credential-bearing file to be read, copied, or logged.
- Unsafe collision handling that deletes or overwrites without backup.
- Absolute machine paths or secret values written into tracked assets or generated config.
- Blind export of the OpenCode V2-only plugin to another agent.

## What is out of scope

- Behavior documented in [Scope and collision policy](docs/user/scope-and-collision-policy.md) when the user explicitly opts in with `--force`.
- Native agent behavior that is outside this repository's installer and manifests.
- Issues that require network publication or remote repository mutation; those are not performed by this repository.

## Response expectations

- Reports are reviewed promptly and fairly.
- Maintainers may request additional non-sensitive reproduction details.
- Fixes are validated with dry-run checks before any real install guidance is given.
- The reporter will be informed when the issue is resolved or declined, with a short rationale.
