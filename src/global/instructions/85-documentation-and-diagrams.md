# Documentation and Diagrams

Documentation should give each fact one canonical home and stay readable without local context.

## Structure

- Identify the audience and the question a page must answer before writing.
- Place each technical fact in one module and link to it from other pages.
- Use headings, tables, and short status labels to improve scanning.
- Use ISO dates and real links; avoid claiming unpublished versions.

## Diagrams

- Add a diagram when a flow, sequence, state transition, or relationship benefits from one.
- Choose the smallest diagram type that answers the reader's question.
- Define node names once and reuse them consistently across diagrams.
- Include a prose summary so the content is understandable without rendering.

## Portability

- Keep examples runnable from a clean checkout with documented setup.
- Replace all sensitive values with placeholders such as `<VALUE>`.
- Never mention local tooling, machine paths, or local-only setup in shared docs.
- Keep gate logs and progress records in the local-only area, not in tracked docs.

## Verification

- Confirm every link resolves and every example matches current behavior.
- Check that facts are not duplicated in ways that could drift apart.
- Review the page as a reader with no prior context.
- Record the verification result in the local progress log.
