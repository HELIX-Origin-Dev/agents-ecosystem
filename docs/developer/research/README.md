# Developer Research

This directory holds the canonical, reusable research for the portable agent ecosystem project. Other documentation links to these modules instead of restating their facts.

## Modules

| Module | Covers | Use when |
|---|---|---|
| [Agent native ecosystem layouts](agent-native-ecosystem-layouts.md) | Supported agents, global and project-local discovery paths, GUI/CLI surface mapping, skill and plugin formats, and OpenCode V2-only boundaries. | Choosing native destinations or adding an adapter. |
| [Portable capability scaffolds](portable-capability-scaffolds.md) | Broad, generic, placeholder-only capability coverage and the canonical-source-to-adapter scaffold contract. | Adding capability scaffolds or reusing native fragment mappings. |
| [Dynamic Context Manager](dynamic-context-manager.md) | DCM hardware-aware design, current-versus-cumulative status semantics, complete status surfaces, per-agent native context surfaces, and fragment boundaries. | Planning or changing context/companion behavior. |
| [GitHub Copilot and GitHub Packages distribution](github-copilot-and-package-distribution.md) | Copilot native adapter locations and the support matrix for custom npm registries. | Adding Copilot fragments or package-distribution snippets. |

## Research principles

- Each technical fact lives in exactly one canonical module.
- Consumer documentation links to the relevant module rather than copying its tables.
- Facts are tied to official product documentation or upstream authoritative sources.
- Dates use ISO 8601 (`YYYY-MM-DD`).
- No product version is assigned until a release is declared. Only `CHANGELOG.md` may contain release headings.

## Consumer documentation

- [Installation](../../user/installation.md) uses the native layout research for supported agents and flags.
- [Scope and collision policy](../../user/scope-and-collision-policy.md) uses it for global, local, and mixed scope behavior.
- [Architecture](../architecture.md) uses it for the canonical-source-to-adapter flow.
- [Adapter authoring](../adapter-authoring.md) uses it when adding or changing an adapter.
- [Testing](../testing.md) uses it for the six-agent dry-run matrix and validation boundaries.
