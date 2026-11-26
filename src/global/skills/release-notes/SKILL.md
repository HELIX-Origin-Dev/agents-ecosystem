---
name: Release Notes
description: Prepare semantic version proposals and professional release notes at actual release time
---

Use this skill when the user asks to plan, draft, or publish a release. Never use it to assign a version to ordinary mid-work milestones.

## Paths

Relative to this global skill directory:

- Release template: `../../templates/release-notes.md`

Relative to the current project root:

- Tracked changelog: `CHANGELOG.md`
- Local milestone tracker: `HANDOFF.md`
- Local roadmap: `ROADMAP.md`
- Research gate logs: `.opencode/research/`
- Durable progress log: `.opencode/PROGRESS.md`

## Workflow

1. **Confirm release intent.** If the user has not declared a release, summarize eligible `Unreleased` items, update them if asked, and stop without assigning a version.
2. **Gather evidence.** Read the release template, `CHANGELOG.md`, local milestone files, and read-only local tags such as `git tag --list --sort=-version:refname`. Review the relevant diff or commit range. Do not open `.env` files or print secrets.
3. **Inventory changes.** Group notable changes into Added, Changed, Fixed, Security, Deprecated, Removed, and Breaking. Exclude commit noise and internal details that do not help users.
4. **Propose the version.** Show a small table with the previous version, proposed version, bump type, and rationale. Apply Semantic Versioning: breaking public behavior after `1.0.0` is MAJOR; backward-compatible functionality is MINOR; backward-compatible fixes are PATCH; incompatible `0.y.z` changes are MINOR and explicitly marked breaking. Pre-release suffixes require an explicit pre-release declaration. The first release is not assumed to be `1.0.0`.
5. **Ask for approval.** Use the `question` tool and wait. Do not write a release section, tag, commit, push, or publish before approval.
6. **Render the notes.** Fill the template with real values, consistent emoji, a summary table, highlights, grouped lists, an action-required table, a verification table, and real links. Use ISO dates and omit empty categories.
7. **Update the changelog after approval.** Convert existing `Unreleased` entries into a dated release section and leave a fresh `Unreleased` heading. Keep local ecosystem files out of tracked documentation.
8. **Stop before remote actions.** A GitHub release, tag creation, commit, push, or any remote mutation needs a separate explicit authorization in the current turn.
9. **Verify.** Re-read the rendered notes and check GFM rendering, links, version logic, secret hygiene, no local-only paths in tracked text, and applicable tests or compile checks. Consult the `local-reviewer` subagent for non-trivial releases.

## Hard rules

- Milestones are for work; versions are for releases.
- `CHANGELOG.md` is the only file that may reference product release versions.
- Never fabricate dates, comparison links, verification results, or versions.
- Never include webhook URLs, cookies, credentials, tokens, `.env` values, usernames, passwords, or local paths in release notes; webhook URLs are excluded as public content, not because they are secrets.
- Never treat a schema `version` field as a product release.
