---
name: Localization Workflow
description: Prepare text and interfaces for translation without embedding locale-specific assumptions.
---

## Goal

Make content translatable and culturally neutral while preserving meaning and layout.

## When to use

- Adding user-facing strings, labels, or messages.
- Reviewing an interface for text expansion and locale assumptions.
- Preparing documentation for a multilingual audience.

## Steps

1. Keep strings in one external catalog instead of scattering literals through code.
2. Provide context notes for ambiguous words and placeholder names.
3. Avoid concatenating sentences from fragments; use full messages with parameters.
4. Leave room in layouts for longer text and avoid encoding word order in code.
5. Use neutral date, number, and separator formats supplied by the runtime locale.
6. Review images and examples for assumptions that will not travel well.
7. Verify that placeholders remain intact after translation.

## Verification

- No user-facing literal remains hard-coded outside the catalog.
- Layouts remain usable with substantially longer and shorter strings.
- Translated samples preserve placeholders and meaning.
