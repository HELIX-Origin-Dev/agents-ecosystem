# Capability Scaffold

Use this skeleton when adding a new portable capability scaffold.

## Identity

- Folder name: `<VALUE>`
- Skill name (must match folder): `<VALUE>`
- One-sentence description: `<VALUE>`

## Purpose

- Goal: `<VALUE>`
- When to use: `<VALUE>`
- Out of scope: `<VALUE>`

## Structure

- [ ] `SKILL.md` has exact YAML frontmatter with `name` and `description`
- [ ] Workflow includes Goal, When to use, Steps, and Verification
- [ ] `scripts/.gitkeep` explains portable helper scripts
- [ ] `references/.gitkeep` explains portable reference material
- [ ] `assets/.gitkeep` explains portable static assets

## Portability checks

- [ ] No package installs, binaries, or host-specific commands are required
- [ ] No absolute paths, user-specific values, or sensitive values appear
- [ ] Version numbers are not pinned in prose
- [ ] All file and directory names are lowercase kebab-case
- [ ] No excluded words appear in any name

## Verification

- [ ] Frontmatter name equals folder name
- [ ] Every step is actionable without local context
- [ ] Verification section states observable checks
- [ ] Progress log updated with the new scaffold set
