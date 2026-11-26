---
name: performance-profiling
description: Measure, locate, and verify performance bottlenecks with evidence-led profiling.
---

## Goal

Improve the behavior users notice by optimizing the path that actually dominates cost.

## When to use

- Latency, throughput, memory use, or startup time regresses.
- A change is proposed for speed without supporting measurements.
- Resource usage grows unexpectedly with input size.

## Steps

1. Define the metric, workload, and acceptable threshold before changing code.
2. Capture a baseline with a repeatable, representative workload.
3. Profile the whole request or task to find the dominant cost, not a guess.
4. Separate computation, waiting, allocation, and input/output contributions.
5. Change one bottleneck at a time and re-measure under the same workload.
6. Watch for regressions in correctness, memory, and downstream services.
7. Record the before and after measurements with the environment described.

## Verification

- The reported improvement exceeds normal run-to-run variation.
- The optimized path still satisfies its functional tests.
- The measurement method is reproducible by another contributor.
