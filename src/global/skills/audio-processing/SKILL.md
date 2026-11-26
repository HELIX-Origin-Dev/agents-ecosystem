---
name: Audio Processing
description: Plan audio conversion and editing with clear formats, levels, and review steps.
---

## Goal

Create predictable audio outputs while preserving source material and listener quality.

## When to use

- Converting recordings to a target format or sample rate.
- Trimming, normalizing, or assembling audio for documentation.
- Preparing narrated material with captions or transcripts.

## Steps

1. Define the target format, sample rate, channel layout, and expected duration.
2. Keep masters separate from derivatives and record the transformation settings.
3. Use relative paths and describe tools generically rather than requiring a specific binary.
4. Normalize levels conservatively and listen to a sample before batch processing.
5. Check that clips, fades, and boundaries land where intended.
6. Pair spoken audio with a text transcript for accessibility.
7. Note PowerShell and POSIX quoting differences for documented commands.

## Verification

- Output files match the documented technical properties and duration.
- A listening check confirms no clipping, dropped segments, or unexpected noise.
- No embedded personal metadata or sensitive information remains in shared files.
