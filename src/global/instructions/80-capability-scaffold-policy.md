# Capability Scaffold Policy

Scaffolds describe workflows; they do not install tools, vendor binaries, or assume a particular host.

## Scope

- Keep every scaffold portable, dependency-free, and usable from a clean checkout.
- Use relative paths in prose and examples; never record a machine-specific location.
- Treat official upstream documentation as the source of truth for behavior.
- Avoid pinning version numbers in scaffold prose; describe expectations generically.

## Naming

- Use lowercase kebab-case for all scaffold directories and files.
- Exclude installer-forbidden words from every name, including directory names.
- Use placeholders such as `<VALUE>` for any value the reader must supply.
- Do not place secret values, internal addresses, or user-specific data in a scaffold.

## Skill structure

- Each skill is a directory containing `SKILL.md` with exact YAML frontmatter.
- The frontmatter `name` must equal the directory name and have a one-sentence description.
- Workflow prose should include Goal, When to use, Steps, and Verification.
- Keep `scripts/`, `references/`, and `assets/` with a short `.gitkeep` comment each.

## Maintenance

- Add a scaffold only when it describes a reusable, non-trivial workflow.
- Do not duplicate facts between skills; link to the canonical module instead.
- Review new scaffolds for portability and excluded words before accepting them.
- Record the outcome in the project progress log when a scaffold set is extended.
