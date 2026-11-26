# Media and Data Policy

Media and data work must preserve sources, protect sensitive values, and remain reproducible.

## Media assets

- Keep originals immutable and write derivatives to a clearly named output area.
- Define target format, dimensions, duration, and quality before processing.
- Record transformation settings alongside the outputs they produced.
- Provide text equivalents for spoken or visual content where appropriate.

## Data handling

- State the input contract, output contract, and transformation rule in plain language.
- Validate structure before accessing nested fields or joining datasets.
- Make transformations deterministic and avoid implicit ordering assumptions.
- Report rejected records and reasons instead of silently dropping them.

## Sensitive values

- Replace sensitive values with placeholders such as `<VALUE>` in all examples.
- Check metadata and embedded fields before sharing generated files.
- Never record secret content, internal addresses, or user-specific values in tracked files.
- Keep local-only notes out of shared documentation.

## Verification

- Re-running the same inputs must produce the same outputs.
- Inspect a representative sample visually or programmatically before a full batch.
- Confirm totals reconcile with an independent reference where numbers are involved.
- Document the checks performed and any known limitations.
