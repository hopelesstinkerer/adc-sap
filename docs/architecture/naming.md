# Naming rubric

This document defines the controlled vocabulary for project names, npm scopes,
and tags across the Nx monorepo. It is the single source of truth referenced
by commit scopes, GitHub `scope:*` labels, and (later) Nx project tags.

## Controlled `type` set (Nx layer)

A project's `type` is one of:

- `app` — deployable application
- `data-access` — state, services, API/client logic
- `feature` — feature-specific UI + composition
- `ui` — presentational components
- `utils` — framework-agnostic helpers
- `models` — shared types/interfaces/DTOs
- `design-system` — primitives, tokens, theming
- `environments` — per-environment configuration
- `e2e` — end-to-end test projects

These `type` values are **Nx project tags**, not commit types or commit
scopes. Do not use them as commit types or scopes.

## Project name: `scope` × `type`

- A library is named `<domain>-<layer>`, where:
  - `<domain>` is the project's `scope` (e.g. `auth`, `catalog`)
  - `<layer>` is one of the controlled `type` values above
  - Example: `auth-data-access`, `catalog-feature`, `shared-ui`
- A deployable application is named `<app-name>-app`, where `<app-name>` is
  its `scope`.
  - Example: `adc-web-app` for the public web app (scope `adc-web`)

## npm scope

All packages publish under the `@adc` npm scope.

- Library import path alias: `@adc/<domain>-<layer>` → `libs/<domain>-<layer>/src/index.ts`.
  Per-project aliases are defined in each project's own `tsconfig` (see #5);
  the base `tsconfig.base.json` no longer carries a global `@adc/*` mapping.

## Commit scope and GitHub label

- **Commit scope = project name.** A commit touching `auth-data-access` uses
  `feat(auth-data-access): ...`. The commitlint `scope-enum` is kept in
  lockstep with the label taxonomy (see `CONTRIBUTING.md` §4).
- **GitHub `scope:*` label = the project's domain.** A PR for `auth-data-access`
  is labeled `scope:auth` (matches the Nx `scope:<domain>` tag vocabulary).

## Nx tags (deferred)

Once Nx project graphs are enforced, each project receives tags
`scope:<domain>` + `type:<layer>` (e.g. `scope:auth`, `type:data-access`).
Tag-based boundaries (e.g. "feature may depend on data-access, never the
reverse") are deferred to a later issue; this rubric records the intended
vocabulary so names stay stable in the meantime.
