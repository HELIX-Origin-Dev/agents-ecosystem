# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). This project does not assign a product version until a release is explicitly declared.

## [Unreleased]

## [0.2.0] - 2026-11-26

### Added

- Canonical skill display labels use polished Title Case; non-OpenCode adapters emit lowercase kebab-case `name` values from the parent skill directory.
- The installer skips unchanged files on force runs instead of rewriting them.

### Changed

- DCM is copied directly from the canonical source tree into agent-native layouts; no npm package installation is performed.
- OpenCode receives DCM only in the global plugin directory to prevent a duplicate local plugin load.
- Marketplace catalogs are retained as structure only and declare no active npm package source.
- Plugin source documentation now describes direct source installation and the GitHub Packages research boundary.

### Breaking

- The npm install path and GitHub Packages publication are no longer supported; consumers must install from canonical source with the cross-platform installer.
- Automation that depended on the declarative npm plugin source catalog or the publishable DCM package must be removed or rewritten to use direct source installation.

### Removed

- DCM npm package metadata and lockfile.
- GitHub Packages publication workflow and Dependabot npm package entry.
- Declarative npm plugin source catalog.
- `.npmrc.example`.

### Fixed

- Duplicate DCM plugin discovery from the project-local OpenCode plugin directory.
- Unchanged-file backup churn during repeated force installs.

## [0.1.0] - 2026-11-26

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
- GitHub Pages documentation source in `docs/` using mdBook, with a custom-domain file and a documentation landing page.
- Repository automation for GitHub Pages deployment, CodeQL analysis, dependency review, Dependabot updates, and CODEOWNERS review protection.
- GitHub Actions workflow that prepares and publishes eligible plugin packages to GitHub Package Registry.
- Real DCM plugin package at version `0.1.0` with OpenCode V2 server and TUI exports.
- Built-in mdBook theme picker with Auto, Light, Rust, Coal, Navy, and Ayu themes, two-tone Rust default, persisted choices, and native sidebar navigation with search.
- Manual workflow dispatch to delete up to 100 failed or cancelled GitHub Actions workflow runs, with an optional capped amount.

### Changed

- Machine-specific config paths normalized into install-time template variables.
- DCM reports current context as a labeled last-completed-step estimate and keeps cumulative session tokens and cost separate as lifetime accounting.
- DCM exposes a complete status view through `dcm.status`, `dcm.usage`, a TUI session panel, `/dcm-status`, and a conservative footer label.
- README documentation links now include the published site, roadmap, privacy notice, and documentation source.
- Package documentation now distinguishes the publishable DCM package from Claude Code and Codex marketplace catalogs.
- Documentation uses built-in mdBook themes with a two-tone Rust default, Navy dark theme, integrated search, syntax highlighting, and Mermaid rendering.
- Documentation uses mdBook's native sidebar navigation, mobile menu, keyboard shortcuts, and default 750px content width.
- Project documentation now contains only product-focused guides and research; site setup and repository-mechanics material is recorded outside the tracked docs.
- GitHub Packages publication workflow uses Node 26 LTS and verified full-SHA action pins.

### Fixed

- DCM no longer presents cumulative session tokens or `cache.read` totals as current context occupancy.

### Security

- Credential-bearing paths excluded before any installer read, copy, log, or output.
- Transitive `glob` and `minimatch` advisories are remediated in the DCM lockfile.
