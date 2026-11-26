# Global Standard: Documentation Standards

Use the `documentation-standards` skill when creating or editing tracked documentation.

## Documentation tiers

- `docs/user/**` — user-facing setup, configuration, operations, and troubleshooting.
- `docs/developer/**` — architecture, extension points, and project standards.
- `docs/developer/research/**` — canonical shared project research.

## Requirements

- Put each technical fact in one canonical module; link to it from other docs instead of restating it.
- Be detailed, human-readable, extensive, and GFM-compliant.
- Use tables, lists, and status labels where they improve scanning.
- Add Mermaid diagrams wherever a flow, sequence, state transition, or relationship benefits from one.
- Use ISO dates and real links.
- Never mention local tooling, local paths, or local-only setup in tracked files.
- Never include secret values, webhook URLs, cookies, `.env` values, usernames, or passwords.
- Do not claim unpublished release versions outside `CHANGELOG.md`.

## Research boundary

Gate and approval logs stay local in `.opencode/research/` and are never tracked. Project research belongs in the tracked developer research directory and must be linked from local gate logs rather than duplicated.
