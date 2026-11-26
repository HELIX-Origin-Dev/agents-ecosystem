# Data Processing Plan

Use this skeleton for a repeatable data transformation or report.

## Contracts

- Question answered: `<VALUE>`
- Input source and shape: `<VALUE>`
- Output target and shape: `<VALUE>`
- Transformation rule: `<VALUE>`

## Assumptions

- Grain of each source: `<VALUE>`
- Filters and boundaries: `<VALUE>`
- Timezone and ordering rules: `<VALUE>`
- Null and missing-value policy: `<VALUE>`

## Pipeline

- [ ] Stage one validates input structure
- [ ] Stage two performs the transformation deterministically
- [ ] Stage three validates output structure
- [ ] Rejected records are recorded with reasons
- [ ] Sensitive values replaced with placeholders

## Workflow

1. Inspect representative records: `<VALUE>`
2. Define validation rules: `<VALUE>`
3. Implement stages: `<VALUE>`
4. Run against a copy: `<VALUE>`
5. Reconcile and document: `<VALUE>`

## Verification

- [ ] Re-run produces identical outputs
- [ ] Validation report explains every rejected record
- [ ] Totals reconcile with an independent reference
- [ ] No sensitive values or local paths in tracked artifacts
