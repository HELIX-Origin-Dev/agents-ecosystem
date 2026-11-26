# Shell Command Plan

Use this skeleton before running a multi-step shell workflow.

## Intent

- Outcome: `<VALUE>`
- Inputs: `<VALUE>`
- Outputs: `<VALUE>`
- Side effects: `<VALUE>`

## Portability

- [ ] Relative paths used throughout
- [ ] PowerShell and POSIX differences noted
- [ ] Quoting rules checked for every variable
- [ ] No machine-specific path or user-specific value present
- [ ] Untrusted text kept out of command strings

## Steps

1. Inspect current state: `<VALUE>`
2. Preview intended change: `<VALUE>`
3. Apply change: `<VALUE>`
4. Verify result: `<VALUE>`
5. Record outcome: `<VALUE>`

## Safety

- [ ] Dry-run or preview available
- [ ] Each step fails visibly
- [ ] Dependent steps stop after a failure
- [ ] Remote or destructive action separately authorized
- [ ] Reversal path described

## Verification

- [ ] Ran from a different working directory
- [ ] Failure paths leave no partial state
- [ ] Commands and results recorded locally
- [ ] No unexpected tracked files changed
