# Language and SDK Guidance

Language and SDK work should make contracts explicit and keep environment assumptions out of source.

## Source of truth

- Consult official language and framework documentation before changing behavior.
- Prefer upstream documentation over recollected examples or third-party summaries.
- Record the fact a source supports, not just the address you visited.
- Do not hardcode release numbers into portable guidance or examples.

## Code structure

- Separate pure logic from input/output so behavior can be tested directly.
- Name public interfaces clearly and document their failure behavior.
- Keep dependencies explicit and avoid hidden global state.
- Put environment-specific values into external configuration with safe defaults.

## Safety and failure handling

- Validate untrusted input at the boundary before use or storage.
- Handle errors where a caller can act on them; add context when propagating.
- Give background work and long-lived resources an explicit shutdown path.
- Keep unsafe or platform-specific code behind a small, documented interface.

## Verification

- Build and test from a clean checkout using only documented setup.
- Confirm no absolute paths, user-specific values, or sensitive data entered source.
- Re-read the affected files and confirm the intended change is present.
- Report which checks ran and which remain pending.
