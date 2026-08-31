# Security policy

## Supported version

Security fixes are applied to the current `main` branch and the production deployment built from it.

## Reporting a vulnerability

Please report suspected vulnerabilities privately to `devstoolsapp@gmail.com`. Do not include
credentials, personal data, or working exploits in a public issue.

Include the affected route or component, reproduction steps, impact, and any suggested mitigation.
We will acknowledge a report as soon as practical, investigate it, and coordinate disclosure after a
fix is available.

## Dependency security

The repository runs npm and NuGet advisory checks in CI, verifies npm registry signatures, uses
locked dependency graphs, and schedules Dependabot and CodeQL scans. Secrets must be supplied with
environment variables or .NET User Secrets and must never be committed to tracked configuration.
