# Web and API Policy

Web and API work should be accessible, testable, and explicit about boundaries.

## Interface design

- Separate presentation, application logic, and data access into distinct areas.
- Define request and response shapes before implementing handlers.
- Use clear naming for routes, components, and shared modules.
- Keep configuration and environment-specific values external to source.

## Accessibility

- Verify semantic structure, headings, and a meaningful reading order.
- Ensure every control is reachable and operable without a pointing device.
- Provide text equivalents for images, icons, and charts.
- Validate labels, error messages, and status announcements in forms.

## Requests and data

- Parameterize any value supplied by a caller or external configuration.
- Document headers, body fields, and expected status responses with placeholders.
- Distinguish transport failures from application-level error responses.
- Never record real sensitive values or internal addresses in examples.

## Verification

- Exercise the primary journey from a clean checkout with documented setup.
- Confirm the interface works without hidden local context.
- Review the diff for unintended changes and machine-specific paths.
- Record which checks ran and which remain pending.
