# Testing

Validation is intentionally dry-run only. No installed global or project-local agent configuration is modified during repository checks. Destination rules come from [Agent native ecosystem layouts](research/agent-native-ecosystem-layouts.md); DCM status boundaries come from [Dynamic Context Manager](research/dynamic-context-manager.md).

## Required commands

```bash
node --check scripts/install.mjs
node scripts/install.mjs --help
node scripts/install.mjs --dry-run --agent all --scope global
node scripts/install.mjs --dry-run --agent all --scope local --project ./example-project
node scripts/install.mjs --dry-run --global-agent opencode,claude-code,codex --local-agent cursor,antigravity,github-copilot --project ./example-project
```

All dry-run commands must exit successfully without writing files or creating backups.

## Validation matrix

| Check | Expected result |
|---|---|
| Agent IDs | All six IDs are accepted; unknown IDs are rejected with a clear message. |
| Scope selection | `--scope`, `--global-agent`, and `--local-agent` resolve to exactly one scope per agent. |
| Mixed scope | Per-agent assignments are independent and conflicts are rejected. |
| Surfaces | Every agent reports its GUI and CLI surfaces, but each destination appears once. |
| Exclusions | Credential-bearing paths and `packages/` are reported as excluded and never read, except `manifest/plugin-sources.json`. |
| OpenCode boundary | `dynamic-context-manager` appears only for `opencode`; other agents receive native DCM fragments. |
| DCM status | Current context is separate from cumulative tokens and cost; current state degrades to `unknown` rather than a cumulative total. |
| DCM controls | Native compaction stays authoritative; no automatic compaction, duplicate summarizer, or UI responsiveness claim appears. |
| Copilot fragments | Native under `COPILOT_HOME` or `.github/copilot/`; internal `config.json` is never a destination. |
| Antigravity rules | Generated rules include a valid YAML `trigger`. |
| Cursor rules | Local rules use `.mdc` files; no global user-rule file is created. |
| Collision planning | Existing files produce backup plus `skip`; with `--force`, backup plus `overwrite`. |
| Portability | No absolute machine path or username appears in generated config templates. |
| Dependency check | Installer imports only `node:` modules. |

## Dry-run verification

A correct dry-run plan includes, per component:

- agent ID and scope;
- source unit;
- resolved destination;
- action;
- collision status;
- reported surfaces.

Dry-run must not create, rename, or delete any file. If a verification target already exists, the plan should say what would happen, not perform it.

## Syntax and style checks

```bash
node --check scripts/install.mjs
```

JSON manifests can be checked by loading them through the installer dry-run. Invalid JSON should fail before any plan output.

Documentation checks:

- GFM tables render with consistent column counts.
- Mermaid blocks use valid `flowchart`, `sequenceDiagram`, or `graph` syntax.
- Links resolve to existing files.
- Dates use ISO 8601.
- No unapproved release version appears outside `CHANGELOG.md`.
- No secret value, webhook URL, cookie export, environment value, username, password, or machine-specific path appears.

## Repository checks

When the repository is initialized in a separately authorized step, run:

```bash
git status --short
git diff --check
git check-ignore -v HANDOFF.md .opencode/
```

Before initialization, confirm the same intent by inspecting the tracked file list directly. `HANDOFF.md` and `.opencode/` must remain untracked artifacts.

## Review gate

For non-trivial changes, a local read-only reviewer should receive:

- the changed file list;
- the local research gate log path;
- the dry-run output;
- the relevant canonical research module paths.

The reviewer checks local-only compliance, secret hygiene, manifest correctness, surface deduplication, and documentation link integrity.

## Failure handling

| Failure | Action |
|---|---|
| Syntax error | Fix the installer or manifest before rerunning. |
| Unknown agent ID | Use a documented ID or add a complete adapter. |
| Invalid manifest path | Correct the logical path; never substitute a machine-specific absolute path. |
| Excluded source detected | Keep it excluded; do not weaken the exclusion list. |
| Collision reported | Expected. Refresh the plan or explicitly opt in with `--force` for a real install. |
| Plugin not discovered | Compare the generated manifest against [Agent native ecosystem layouts](research/agent-native-ecosystem-layouts.md). |
