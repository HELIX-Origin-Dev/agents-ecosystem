# Global Standard: Release Standards

Work is tracked by milestones, not by invented release versions. A version is assigned only when the user declares a release.

## Version policy

| Situation | Action |
|---|---|
| Ordinary implementation or documentation work | Update milestones and the `CHANGELOG.md` `Unreleased` section only |
| User asks for preparation without declaring a release | Do not assign a version; keep collecting notes under `Unreleased` |
| User declares a release | Load the `release-notes` skill and propose a SemVer version with reasoning |
| Version proposal not approved | Keep notes in `Unreleased`; do not write a release section, tag, or publish |
| Version proposal approved | Write release notes and the changelog release section, then stop before git/gh mutations unless separately authorized |

Semantic Versioning guidance:

- Breaking public behavior after `1.0.0`: MAJOR.
- New backward-compatible functionality: MINOR.
- Backward-compatible bug fix: PATCH.
- Incompatible change while still `0.y.z`: MINOR, clearly marked as breaking.
- Documentation-only or internal refactor: no version by itself; include it in the next release notes when useful.
- Explicit pre-release: append `-alpha.N`, `-beta.N`, or `-rc.N` only when the user declares a pre-release.
- The first release must not be assumed to be `1.0.0`; propose `0.y.z` for initial development unless the user explicitly states the public API is stable.

## Release-note style

Use professional, human-readable GFM with tables and lists. Use emoji consistently: 🎉 release title, 📊 summary, ✨ highlights, 🆕 added, 🧭 changed/improved, 🛠 fixed, 🔐 security, ⏳ deprecated, 🗑 removed, ⚠️ breaking changes, ✅ verification, 🔗 links. Answer what changed, why it matters, what users must do, and how the release was verified. Use ISO dates and real comparison links. Omit empty categories.

## Safety

- `CHANGELOG.md` is the only file that may reference release versions.
- Config `"version"` values are schema versions, not product releases.
- Never include webhook URLs, cookies, `.env` values, usernames, passwords, tokens, or local-only paths in release notes.
- Git tags, commits, pushes, GitHub releases, and remote state changes require separate fresh authorization in the current turn.
