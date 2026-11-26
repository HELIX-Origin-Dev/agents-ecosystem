# Adapter Authoring

An adapter translates canonical source units into one agent's native layout. Native paths, plugin formats, and surface-sharing rules are defined in [Agent native ecosystem layouts](research/agent-native-ecosystem-layouts.md). DCM boundaries are defined in [Dynamic Context Manager](research/dynamic-context-manager.md), and Copilot plus package limits are defined in [GitHub Copilot and GitHub Packages distribution](research/github-copilot-and-package-distribution.md).

## When to add an adapter

Add an adapter when:

- a new agent needs global or local restoration;
- an existing agent changes its discovery paths or plugin manifest format;
- a surface stops sharing configuration with its sibling surfaces.

Do not add an adapter that duplicates a full asset tree. Native folders should contain only manifests and small format-specific fragments.

## Files to create

```text
adapters/<agent-id>/
├── manifest.json
├── global/
│   ├── native.json
│   └── <native plugin manifest or plugins.json>
└── local/
    ├── native.json
    └── <native plugin manifest or plugins.json>
```

## Adapter manifest schema

| Field | Type | Required | Meaning |
|---|---|---|---|
| `id` | string | Yes | Stable lowercase ID used by `--agent`. |
| `displayName` | string | Yes | Human-readable product name. |
| `sharedConfig` | boolean | Yes | Whether GUI and CLI surfaces share one tree. |
| `surfaces` | array of strings | Yes | Surface IDs reported in plans. |
| `pluginFormat` | string | Yes | `opencode-config`, `claude-plugin`, `codex-plugin`, `cursor-plugin`, `antigravity-plugin`, or `copilot-agent-plugin`. |
| `scopes.global.root` | string | Yes | Logical global destination base. |
| `scopes.local.root` | string | Yes | Project-relative local destination base. |
| `scopes.<scope>.components` | array | Yes | Component mappings for that scope. |

### Component schema

| Field | Type | Required | Meaning |
|---|---|---|---|
| `id` | string | Yes | Stable component identifier. |
| `source` | string | Yes | Logical path under `src/` or `adapters/`. |
| `destination` | string | Yes | Relative path under the scope root. |
| `transform` | string | No | One of the transforms listed in [Architecture](architecture.md#transformations). Defaults to `copy`. |
| `when` | string | No | Conditional rule, such as `global-only`. |
| `exclusiveTo` | string | No | Agent ID that may emit this component, used for OpenCode V2-only assets. |

## Minimal example

```json
{
  "id": "example",
  "displayName": "Example Agent",
  "sharedConfig": true,
  "surfaces": ["cli", "gui"],
  "pluginFormat": "example-plugin",
  "scopes": {
    "global": {
      "root": "~/.example",
      "components": [
        {
          "id": "instructions",
          "source": "src/global/instructions",
          "destination": "AGENTS.md",
          "transform": "agents-md"
        },
        {
          "id": "skills",
          "source": "src/global/skills",
          "destination": "skills"
        }
      ]
    },
    "local": {
      "root": ".example",
      "components": [
        {
          "id": "skills",
          "source": "src/local/skills",
          "destination": "skills"
        }
      ]
    }
  }
}
```

This is a shape example only. A real adapter must use the agent's documented native paths and manifest format.

## Native fragment rules

| Agent | Required native fragment |
|---|---|
| OpenCode V2 | `plugins.json` declaring CLI packages, GUI export, and local plugin directories. No `plugin.json`. |
| Claude Code | `.claude-plugin/plugin.json` with component paths. |
| Codex | Root `plugin.json` with skill components. |
| Cursor | `.cursor-plugin/plugin.json` with skills, agents, commands, and rules. |
| Antigravity | `.antigravity-plugin/plugin.json` with `$schema`, required `name`, and component paths. |
| GitHub Copilot | Native Agent Plugin `plugin.json`, fixed `skills/NAME/SKILL.md`, root `mcp.json`, and `com.github.copilot/` extension files. |

Antigravity rule fragments must include YAML frontmatter with a valid `trigger` value. Copilot internal `config.json` and installed-plugin state are read-only sources, not fragment targets. Invalid or missing triggers cause discovery failure.

## Surface handling

Set `sharedConfig: true` when official documentation confirms that GUI and CLI surfaces read the same configuration. The installer will report all `surfaces` but write one tree.

If an agent truly has separate global config per surface, set `sharedConfig: false` and declare per-surface roots explicitly. This requires a matching installer change and canonical research update before it is accepted.

## Portability requirements

- Use forward slashes in manifest logical paths.
- Do not put absolute user paths, home directories, or platform-specific drive letters in manifests.
- Use scope variables such as `~/.example` or project-relative `.example`; the installer resolves them.
- Do not copy credential-bearing filenames into any component.
- Do not port the OpenCode V2 `dynamic-context-manager` plugin implementation. Use `exclusiveTo: "opencode"` for any OpenCode-only component; other agents receive native DCM fragments.
- Keep plugin manifest versions as placeholder values; they are not product releases.

## Registration

After creating an adapter:

1. Add its ID to the installer's known adapter list and help text.
2. Add the adapter's plugin format to the documented format enum.
3. Add any new transform to the installer and to [Architecture](architecture.md#transformations).
4. Add user-facing notes to [Installation](../user/installation.md) only when behavior changes for users.
5. Update canonical research if the agent's native layout facts changed.

## Validation

```bash
node --check scripts/install.mjs
node scripts/install.mjs --dry-run --agent <agent-id> --scope global
node scripts/install.mjs --dry-run --agent <agent-id> --scope local --project ./example-project
```

Confirm that:

- surfaces are reported but destinations are deduplicated;
- no excluded path is read;
- no destination contains a machine-specific absolute path;
- the native plugin manifest appears only in the correct adapter;
- existing-file collisions produce backup and skip entries without `--force`.

See [Testing](testing.md) for the full validation checklist.
