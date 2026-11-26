# Troubleshooting

Native paths and format requirements are defined in [Agent native ecosystem layouts](../developer/research/agent-native-ecosystem-layouts.md). This page covers only observed symptoms and safe checks.

## No agents selected

**Symptom:** The installer reports that no agent was selected.

**Cause:** No `--agent`, `--global-agent`, or `--local-agent` value was supplied, and interactive input was unavailable.

**Resolution:** Pass an explicit selection:

```bash
node scripts/install.mjs --dry-run --agent all --scope global
```

## Unknown agent ID

**Symptom:** The installer rejects an agent ID.

**Cause:** The ID is not one of `opencode`, `claude-code`, `codex`, `cursor`, `antigravity`, or `github-copilot`.

**Resolution:** Use the exact IDs listed in [Installation](installation.md#supported-agent-ids).

## Conflicting scope options

**Symptom:** The installer reports conflicting agent lists.

**Cause:** The same agent appears in both `--global-agent` and `--local-agent`.

**Resolution:** Assign each agent to exactly one scope.

## Destination already exists

**Symptom:** A planned component is reported as `skip`.

**Cause:** The destination file exists and `--force` was not supplied.

**Resolution:** Keep the existing file, or rerun with `--force`. A timestamped backup is created before any overwrite. See [Scope and collision policy](scope-and-collision-policy.md#collision-states).

## Source path excluded

**Symptom:** A planned component is reported as `excluded`.

**Cause:** The source path matched a credential or environment exclusion rule.

**Resolution:** Do not bypass the exclusion. Remove the file from the source tree if it should not be part of the repository.

## OpenCode config paths look unusual

**Symptom:** Generated `opencode.jsonc` contains a placeholder before installation.

**Cause:** Canonical config uses an install-time template variable so no machine-specific absolute path is tracked.

**Resolution:** Run the installer with the intended OpenCode config home. The variable is substituted during installation. For global CLI settings, remember that `cli.json` is global-only; there is no project-local CLI settings file.

## Antigravity rule is not recognized

**Symptom:** A generated Antigravity rule is ignored.

**Possible causes:**

- Missing YAML frontmatter.
- `trigger` is missing or not one of `model_decision`, `always_on`, `glob`, or `manual`.
- The rule was placed outside the documented `rules/` directory.

**Resolution:** Regenerate the rule through the adapter and confirm placement under `~/.gemini/config/rules/` for personal scope or `.agents/rules/` for workspace scope.

## Cursor user rule cannot be found

**Symptom:** A global Cursor user rule is not visible on disk.

**Cause:** Cursor manages user rules in the Customize UI rather than a documented file path.

**Resolution:** Use project rules under `.cursor/rules/*.mdc` for file-managed rules, or add the user rule through the Cursor UI.

## Plugin is not discovered

**Symptom:** An installed plugin manifest is present but the agent does not load it.

**Checks:**

| Agent | Check |
|---|---|
| OpenCode V2 | Local plugin paths must be directories; CLI plugins are declared in global `cli.json`; Desktop plugins use the experimental GUI export. |
| Claude Code | Manifest must be at `.claude-plugin/plugin.json` inside the plugin folder. |
| Codex | Root `plugin.json` is preferred; `.codex-plugin/plugin.json` is a compatibility fallback. |
| Cursor | Local plugin development uses `~/.cursor/plugins/local`. |
| Antigravity | Manifest keys are case-sensitive, `name` is required, and `$schema` should match the documented schema URL. |
| GitHub Copilot | Fragments live under `.github/copilot` and use `copilot-agent-plugin` format; user settings resolve from `~/.copilot` or `COPILOT_HOME`, and internal `config.json` is not an install target. |

## Dry-run succeeded but real install failed

**Cause:** A destination became unwritable, a parent directory could not be created, or a file changed between planning and writing.

**Resolution:** Rerun `--dry-run` to refresh the plan, fix permissions, and then retry. The installer does not delete unrelated files.

## Validation checklist

```bash
node --check scripts/install.mjs
node scripts/install.mjs --dry-run --agent all --scope global
node scripts/install.mjs --dry-run --agent all --scope local --project ./example-project
```

These commands do not modify installed agent configuration.
