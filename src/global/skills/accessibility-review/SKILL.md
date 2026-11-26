---
name: accessibility-review
description: Check interfaces and documents for inclusive, perceivable, and operable behavior.
---

## Goal

Remove barriers that prevent people from using a product with their preferred assistive technology.

## When to use

- Reviewing a new user interface component or page.
- Auditing forms, navigation, and interactive widgets.
- Preparing documentation, tables, or diagrams for broad audiences.

## Steps

1. Identify the user journeys and the input methods that must be supported.
2. Verify semantic structure, headings, and a meaningful reading order.
3. Check that controls are reachable and operable by keyboard alone.
4. Confirm visible focus states, sufficient contrast, and readable text sizing.
5. Ensure images, icons, and charts have equivalent text descriptions.
6. Validate form labels, error messages, and status announcements.
7. Test with an automated checker plus a manual keyboard and screen-reader pass.

## Verification

- Every interactive control works without a pointing device.
- Automated findings are triaged and either fixed or explicitly justified.
- Content remains understandable when styling is removed.
