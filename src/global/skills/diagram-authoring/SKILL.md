---
name: diagram-authoring
description: Create clear, maintainable diagrams that explain flow, structure, and state transitions.
---

## Goal

Communicate a system idea accurately with a diagram that stays useful as the system changes.

## When to use

- Explaining architecture, sequence, state, or relationships in documentation.
- Comparing a current design with a proposed design.
- Documenting a workflow for contributors who are new to the project.

## Steps

1. State the question the diagram must answer and the audience reading it.
2. Pick the smallest diagram type that fits: flow, sequence, state, or graph.
3. Define node names once and reuse them consistently across diagrams.
4. Show only the edges needed for the question; move detail into notes.
5. Label direction, cardinality, and failure paths where they affect understanding.
6. Keep the source text close to the documentation so it can be updated with code.
7. Add a short prose summary so the diagram is understandable without rendering.

## Verification

- Every node and edge is defined in the accompanying prose.
- The diagram renders in the target renderer without custom local setup.
- A reader can answer the original question without verbal explanation.
