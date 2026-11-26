---
name: Web App Scaffold
description: Lay out a portable web application structure before choosing any framework or tooling.
---

## Goal

Establish clear boundaries for pages, data, styles, and tests so the project can grow without rework.

## When to use

- Starting a new web application or a new major feature area.
- Standardizing layout across several small applications.
- Reviewing a project whose responsibilities have become tangled.

## Steps

1. List the user journeys and the screens each journey requires.
2. Separate presentation, application logic, and data access into distinct areas.
3. Define a naming convention for components, routes, and shared modules.
4. Decide where configuration and environment-specific values enter the app.
5. Plan accessible markup and a consistent navigation model from the start.
6. Add the smallest test harness that can exercise the most important journey.
7. Document the layout and the reason for each boundary in the repository.

## Verification

- A new contributor can locate a feature by following the documented layout.
- No screen depends on machine-specific paths or hard-coded endpoints.
- The primary journey works with a clean checkout and documented setup.
