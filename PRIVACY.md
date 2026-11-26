# Privacy

Effective: 2026-11-25

This notice describes the data-handling boundaries of this repository and its tracked documentation. It does not replace the privacy terms of GitHub, Cloudflare, or any other service used by a repository owner or visitor. Platform-level processing is governed by the provider's own notice, including the [GitHub privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement) and the [Cloudflare privacy policy](https://www.cloudflare.com/privacypolicy/).

## What this repository handles

| Context | Information involved | Repository behavior |
|---|---|---|
| Installer dry-run | Selected agent IDs, scopes, project location, and planned destination paths. | Displayed as local preview output. The repository does not transmit this information. |
| Credential-bearing files | Environment files, cookie exports, credential exports, token files, password files, and `service.json`. | Excluded before any installer read, copy, log, or output. |
| Collision handling | Existing destination file paths and timestamped backup names. | Used locally to avoid silent overwrite. No contents are collected by this repository. |
| Issue and pull request reports | Details voluntarily submitted by a contributor. | Processed by GitHub under its own terms. Sensitive details should be redacted before submission. |
| Published documentation | Ordinary web request metadata generated when a visitor opens the docs site. | Handled by GitHub Pages and, if enabled by the domain owner, Cloudflare routing rather than by repository code. |

## What this repository does not do

- It does not include installer telemetry, analytics beacons, or tracking scripts.
- It does not restore credentials, read secret values, or publish collected data.
- It does not modify installed agent configuration as part of documentation or repository setup.
- It does not perform network publication from tracked scripts.
- It does not collect product usage statistics or assign a product version.

Repository-level details for the documentation site's custom domain, theme, and HTTPS boundary are centralized in [GitHub repository foundations](docs/developer/research/github-repository-foundations.md).

## GitHub and Cloudflare boundaries

GitHub hosts the repository and may process account, repository, issue, and platform telemetry data under its own privacy statement. Cloudflare may process visitor connection data when the custom domain is routed through its network. These services act outside the repository's own code and are not controlled by this notice.

The repository tracks a custom-domain file for the documentation site; it does not perform registrar, DNS, Cloudflare, or GitHub Pages settings changes. Those actions belong to the domain and repository owner.

## Third-party links

Links to external documentation, package registries, or service providers lead to sites with independent privacy practices. Review the notice of the destination before submitting personal or sensitive information.

## Questions and changes

Use the contact paths in [SUPPORT.md](SUPPORT.md) for privacy-related questions about this repository. Do not include secret values, webhook URLs, cookie exports, environment values, usernames, passwords, or tokens in a public issue.

Substantive changes to this notice are recorded in [CHANGELOG.md](CHANGELOG.md) under `Unreleased` until a release is declared.
