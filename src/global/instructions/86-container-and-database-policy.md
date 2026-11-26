# Container and Database Policy

Container and database changes must be reversible, observable, and free of host-specific state.

## Containers

- State what belongs inside the container and what stays outside it.
- Keep the build context small and exclude generated or sensitive files.
- Pass configuration through environment variables with placeholder values.
- Define health checks and a clear shutdown path for long-running processes.
- Document run commands without embedding a particular machine's layout.

## Databases

- Record the current schema and the invariants that must remain true.
- Design schema changes in backward-compatible stages where consumers need time to adapt.
- Parameterize values and avoid embedding real data in change files.
- Verify a recoverable backup before any destructive operation.
- Test changes on a copy before applying them to a live system.

## Authorization

- Treat remote, destructive, or history-altering operations as requiring fresh explicit approval.
- Use the exact approved command and do not broaden its scope.
- Prefer read-only inspection when a question can be answered without mutation.

## Verification

- Build or apply changes from a clean, documented starting point.
- Confirm the reversal path restores the prior state without data loss.
- Check that no sensitive values or absolute paths entered tracked configuration.
- Record the checks performed and any remaining risk.
