---
name: sql-reporting
description: Produce trustworthy SQL reports with explicit filters, joins, and reconciliation.
---

## Goal

Turn data into a report whose numbers can be explained and reproduced.

## When to use

- Answering a business question with a new query or report.
- Auditing an existing report that looks inconsistent.
- Comparing results across time periods or segments.

## Steps

1. Write the question in plain language and define each metric precisely.
2. Identify the source tables and confirm the grain of each one before joining.
3. State filters, date boundaries, and timezone assumptions explicitly.
4. Use parameterized values for anything supplied by a caller or configuration.
5. Check join cardinality so rows are neither dropped nor duplicated.
6. Reconcile totals against a known baseline and investigate discrepancies.
7. Document the query, assumptions, and refresh cadence with the report.

## Verification

- The report is reproducible from the documented inputs and filters.
- Totals reconcile with an independent check or known reference point.
- No real sensitive values or internal addresses appear in shared examples.
