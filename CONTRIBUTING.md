# Contributing

Thank you for helping improve the portable agent ecosystem repository. By participating, you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).

## Scope of contributions

Contributions are welcome for:

- canonical instructions, skills, agents, commands, and templates;
- new or corrected agent adapters;
- installer behavior, validation, and portability;
- documentation in the user, developer, and canonical research tiers;
- issue and pull request quality.

Do not contribute credential-bearing files, machine-specific absolute paths, or blind ports of OpenCode V2 plugins to other agents.

## Before you start

1. Read [Architecture](docs/developer/architecture.md) and [Agent native ecosystem layouts](docs/developer/research/agent-native-ecosystem-layouts.md).
2. If you are adding or changing an agent, read [Adapter authoring](docs/developer/adapter-authoring.md).
3. Keep technical facts in the canonical research module and link from other docs instead of duplicating them.

## Development workflow

1. Make the smallest change that solves the problem.
2. Keep canonical assets agent-neutral. Native details belong in adapters.
3. Use forward-slash logical paths in manifests.
4. Do not add dependencies to the installer; it uses built-in `node:` modules only.
5. Update documentation when behavior or native paths change.
6. Add a concise entry under `Unreleased` in [CHANGELOG.md](CHANGELOG.md) when the change is notable.

## Validation

Run these before opening a pull request:

```bash
node --check scripts/install.mjs
node scripts/install.mjs --help
node scripts/install.mjs --dry-run --agent all --scope global
node scripts/install.mjs --dry-run --agent all --scope local --project ./example-project
node scripts/install.mjs --dry-run --global-agent opencode,codex --local-agent cursor,antigravity --project ./example-project
```

All dry-run commands must complete without writing files or creating backups. See [Testing](docs/developer/testing.md) for the full checklist.

## Documentation rules

- Use GFM with tables and lists where they improve scanning.
- Use Mermaid for flows, sequences, state transitions, and relationships.
- Use ISO 8601 dates.
- Link to canonical research instead of restating it.
- Never include secret values, webhook URLs, cookie exports, environment values, usernames, passwords, tokens, or machine-specific paths.
- Do not assign a product version outside `CHANGELOG.md`, and only after a release is declared.

## Pull requests

The pull request template asks for:

- what changed and why;
- scope and agent impact;
- validation commands and results;
- documentation updates;
- confirmation that no credentials or machine-specific paths were added.

Keep unrelated changes in separate pull requests.

## Reporting problems

Use the bug report issue form for reproducible defects and the feature request form for proposed behavior. For security issues, follow [SECURITY.md](SECURITY.md) instead of opening a public issue.

## Review expectations

Reviewers will check:

- native path correctness against official documentation;
- surface deduplication;
- exclusion and backup behavior;
- secret hygiene;
- documentation link integrity;
- portability across Windows, macOS, and Linux.
