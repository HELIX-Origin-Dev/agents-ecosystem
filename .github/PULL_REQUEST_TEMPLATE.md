## Summary

<!-- What changed and why? -->

## Scope and agent impact

- Agents affected:
- Scope affected: global / local / mixed / none
- Native paths or plugin formats changed: yes / no

## Validation

```text
node --check scripts/install.mjs
node scripts/install.mjs --dry-run --agent all --scope global
node scripts/install.mjs --dry-run --agent all --scope local --project ./example-project
```

- [ ] Syntax check passed.
- [ ] Global dry-run passed without writes or backups.
- [ ] Local dry-run passed without writes or backups.
- [ ] Mixed-scope dry-run passed when scope behavior changed.
- [ ] New native layout facts link to [canonical research](../docs/developer/research/agent-native-ecosystem-layouts.md).
- [ ] Documentation links and Mermaid diagrams were reviewed.

## Documentation

- [ ] User docs updated if behavior changed.
- [ ] Developer docs updated if manifests or transforms changed.
- [ ] Canonical research updated if native layout facts changed.
- [ ] `CHANGELOG.md` `Unreleased` updated for notable changes.

## Safety checklist

- [ ] No secret value, webhook URL, cookie export, environment value, username, password, or token was added.
- [ ] No absolute machine path or machine-specific statement was added to tracked files.
- [ ] No credential-bearing file was added.
- [ ] The OpenCode V2-only plugin was not ported to another agent.
- [ ] Dry-run was used; no installed agent configuration was modified.
- [ ] No remote operation or product version assignment was performed.

## Related issues

<!-- Link issues or discussions. -->
