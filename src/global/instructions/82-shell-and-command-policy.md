# Shell and Command Policy

Shell work must stay reviewable, reversible, and portable across different environments.

## Planning

- State the inputs, outputs, and side effects before writing any command.
- Prefer relative, project-root-relative paths over absolute locations.
- Describe the intent in plain language so another person can translate the command.
- Treat any remote or destructive operation as requiring separate, explicit approval.

## Cross-platform behavior

- Note PowerShell and POSIX differences in quoting, path separators, and exit codes.
- Do not hardcode a particular machine, user, or host layout into an example.
- Avoid features that only exist in one shell when a portable alternative exists.
- When differences matter, document both forms rather than assuming one platform.

## Safe execution

- Never place untrusted text directly into a command string.
- Quote variables and arguments consistently.
- Make each step fail visibly and stop dependent steps after a failure.
- Provide a preview or dry-run path for anything that changes files.

## Verification

- Run the workflow from a different working directory to test path assumptions.
- Confirm failure paths leave no partially modified state.
- Check that no sensitive values or machine-specific paths appear in tracked files.
- Record the commands used and their results in the local verification log.
