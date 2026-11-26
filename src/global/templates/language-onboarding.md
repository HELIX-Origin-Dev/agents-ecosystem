# Language Onboarding

Use this skeleton when onboarding a contributor to a language or SDK area.

## Context

- Language or SDK: `<VALUE>`
- Project area: `<VALUE>`
- Official documentation: `<VALUE>`

## Environment expectations

- Runtime characteristics: `<VALUE>`
- Configuration source: `<VALUE>`
- Required external services: `<VALUE>`

## Conventions

- [ ] Module or package layout documented
- [ ] Naming rules for public interfaces documented
- [ ] Error and failure behavior documented
- [ ] Platform-specific code isolated behind a documented adapter
- [ ] No version numbers pinned in onboarding prose

## First task

- [ ] Task scope fits in one reviewable change
- [ ] Behavior contract stated before implementation
- [ ] Tests identified for the primary path and failure paths
- [ ] Verification commands listed without machine-specific paths

## Verification

- [ ] Clean checkout builds with documented setup
- [ ] Tests pass and results recorded
- [ ] No sensitive values or local paths found in the diff
- [ ] Contributor can explain the area boundaries without extra context
