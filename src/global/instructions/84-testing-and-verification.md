# Testing and Verification

Verification happens after every meaningful change and is reported with evidence, not assumption.

## Test design

- Cover behavior at the level where it can be checked most directly.
- Use fast unit checks for pure logic and integration checks at real boundaries.
- Reserve end-to-end checks for a small number of critical journeys.
- Keep setup deterministic by isolating time, randomness, and external calls.

## After each change

- Re-read the affected files and confirm the intended content is present.
- Run the applicable checks for the changed area before declaring completion.
- Inspect the diff for unintended edits, sensitive values, and local paths.
- Update the local progress record with the new state and remaining steps.

## Failure handling

- Describe failures precisely, including the command or scenario that exposed them.
- Do not hide a failure by weakening an assertion.
- Distinguish a missing environment from a real behavioral regression.
- Mark checks that could not run as pending rather than implying success.

## Reporting

- State which checks ran and what each result was.
- List any verification that remains outstanding with the reason.
- Keep verbose tool output out of summaries; use a structured result instead.
- Confirm that local-only artifacts remain ignored and untracked.
