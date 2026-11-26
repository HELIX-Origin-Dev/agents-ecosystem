---
name: Image Processing
description: Plan image transformations with clear inputs, outputs, and quality checks.
---

## Goal

Produce consistent visual assets without destructive edits or hidden machine dependencies.

## When to use

- Resizing, cropping, or converting images for multiple destinations.
- Preparing diagrams and screenshots for documentation.
- Reviewing generated assets for accessibility and clarity.

## Steps

1. Define the target dimensions, aspect ratio, format, and acceptable quality range.
2. Keep original sources untouched and write outputs to a separate location.
3. Use relative paths and describe any tool choice as an example, not a requirement.
4. Preserve metadata only when it is needed and contains no sensitive information.
5. Batch similar operations with a manifest so settings stay consistent.
6. Inspect a sample output visually and verify file properties programmatically.
7. Note PowerShell and POSIX quoting differences for documented commands.

## Verification

- Every output matches the documented size and format requirements.
- Original sources remain unchanged and can regenerate all derivatives.
- No embedded location data or sensitive metadata remains in shared assets.
