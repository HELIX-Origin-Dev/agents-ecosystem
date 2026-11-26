# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). This project does not assign a product version until a release is explicitly declared.

## [Unreleased]

### Added

- Canonical global source tree with portable config templates, instructions, skills, agents, commands, templates, and the OpenCode V2-only plugin.
- Local source placeholders for project-scoped assets.
- Manifests for assets, scopes, and six per-agent native adapters.
- Cross-platform installer with global, local, mixed scope, interactive selection, dry-run, and force options.
- Collision handling with timestamped backups and skip-by-default behavior.
- User documentation for installation, scope and collision policy, and troubleshooting.
- Developer documentation for architecture, adapter authoring, testing, and canonical research.
- GitHub-ready root files: `.gitignore`, README, changelog, contributing guide, code of conduct, security policy, support guide, license, issue forms, and pull request template.
- Root roadmap and repository-scope privacy notice with links to canonical research and support paths.
- GitHub Pages documentation source using `just-the-docs`, a custom-domain file, a Gemfile, and a documentation landing page.
- Repository automation for GitHub Pages deployment, CodeQL analysis, dependency review, Dependabot updates, and CODEOWNERS review protection.
- GitHub Actions workflow that prepares and publishes eligible plugin packages to GitHub Package Registry.
- Real DCM plugin package at version `0.1.0` with OpenCode V2 server and TUI exports.

### Changed

- Machine-specific config paths normalized into install-time template variables.
- DCM reports current context as a labeled last-completed-step estimate and keeps cumulative session tokens and cost separate as lifetime accounting.
- DCM exposes a complete status view through `dcm.status`, `dcm.usage`, a TUI session panel, `/dcm-status`, and a conservative footer label.
- README documentation links now include the published site, roadmap, privacy notice, and documentation source.
- Package documentation now distinguishes the publishable DCM package from Claude Code and Codex marketplace catalogs.

### Fixed

- DCM no longer presents cumulative session tokens or `cache.read` totals as current context occupancy.

### Security

- Credential-bearing paths excluded before any installer read, copy, log, or output.
