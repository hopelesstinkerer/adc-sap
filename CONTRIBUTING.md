# Contributing to ADC-SAP

Thank you for contributing. This repository enforces strict standards so that every commit is reviewable, traceable, and safe to deploy. **Read this document in full before opening your first PR.**

- **Repository:** proprietary — all rights reserved (see `README.md`).
- **Default branch:** `develop` (integration / staging). `main` is production.
- **Merge strategy:** squash-merge only.
- **Identity:** all commits must be GPG-signed.

## 1. Git Flow

| Branch      | Purpose               | Branches from | PRs into                                         |
| ----------- | --------------------- | ------------- | ------------------------------------------------ |
| `main`      | Production-ready      | —             | —                                                |
| `develop`   | Integration / staging | —             | —                                                |
| `feature/*` | New work              | `develop`     | `develop`                                        |
| `release/*` | Release preparation   | `develop`     | `main`, then `develop` (two separate squash PRs) |
| `hotfix/*`  | Production fixes      | `main`        | `main`, then `develop` (two separate squash PRs) |

Rules:

- Never commit directly to `main` or `develop`. Always work in a `feature/*`, `release/*`, or `hotfix/*` branch.
- **All merges use the squash strategy.** Each PR produces one squashed commit on its target branch. A `release/*` or `hotfix/*` change reaches both `main` and `develop` via **two separate squash PRs** (one into `main`, one into `develop`).

## 2. Commit Standards

### Conventional Commits with mandatory scope

Every commit message has the form:

```
<type>(<scope>): <subject>

<body>
```

- `<type>` — one of the allowed types (see §5).
- `<scope>` — **mandatory**. The project/domain the change belongs to (e.g. `repo`, `tooling`, `ci`). Allowed scopes: the meta set `repo`, `tooling`, `ci`, `deps` (commit-scope only — never a GitHub label) **plus any `<domain>-<layer>` / `<app>-app` project scope** per `docs/architecture/naming.md`.
- `<subject>` — short summary.

Example: `feat(auth-data-access): add login endpoint`

### 50 / 72 rule (strict)

- Subject line **≤ 50 characters** — a hard limit, never exceeded.
- Body prose **≤ 72 columns** — a hard limit, never exceeded. Both limits are enforced in review.
- **Wrap efficiently.** Fill each line close to 72 columns — avoid ragged fragments (e.g. a 10-char line beside a 71-char line). Break at clause/sentence boundaries, never mid-word, to produce elegant, easy-to-read messages. Agents: see `AGENTS.md` for the explicit how-to.
- Use the body to explain _why_, not _what_.

### GPG signing

All commits must be GPG-signed (`git commit -S`). Unsigned commits are rejected.

### `fixup!` / autosquash workflow

During PR review, address feedback with fixup commits rather than amending force-pushes:

```bash
git commit --fixup <commit-sha>
git rebase -i --autosquash <base>
```

The PR is **squash-merged** at close, so the fixups collapse into clean final commits.

### Keep the tree clean

Update `.gitignore` / add `.gitkeep` **alongside** the code changes that require them.

### Atomic, self-contained, matched to an issue

- **One logical change per commit.** Do not mix unrelated work.
- **Self-contained:** the commit must independently build, lint, typecheck, test, and deploy. Never push WIP or broken intermediate commits to a shared branch.
- **Matched to an issue:** every commit references its issue via a trailer — `Closes: #N` (closes the issue when merged to `develop`) or `Refs: #N` (reference only). A commit with no issue reference is rejected in review.

## 3. PR Standards

- **PR title is conventional-commit-shaped** (`type(scope): subject`). On squash-merge this title becomes the squashed commit's subject, so it must obey the 50/72 rule.
- **PR description must** state the `scope:*` label and reference the issue (`Closes #N` or `Refs #N`).
- **CI lints every commit** in the PR range: `commitlint --from <pr-base> --to HEAD`, where `<pr-base>` is `develop` for feature PRs and `main` for release/hotfix PRs. `amannn/action-semantic-pull-request` validates the PR title.
- **All status checks must pass** (lint, typecheck, build, test) before merge.

## 4. Taxonomy Sync Rule

The `scope:*` GitHub label set and the commitlint allowed scopes are kept **in lockstep**. Commit scope validation is performed by the commitlint `scope-or-project` rule (see `commitlint.config.ts`): meta scopes are enumerated, and project scopes are matched against the `docs/architecture/naming.md` pattern. A new `scope:<domain>` label must therefore be accompanied by a valid `<domain>-<layer>` / `<app>-app` project scope in the same PR.

- Adding or removing a `scope:*` label ⇒ update the commitlint config in the **same PR**.
- The two must never drift. If a scope exists as a label, it must be a valid commit scope, and vice versa — with the single exception of `deps`, which is a commit-scope only (never a label).

## 5. Label Taxonomy

The locked taxonomy is 19 labels; GitHub default labels were removed.
Adding or removing any label must also update the commitlint
`scope-or-project` rule / allowed scopes in the same PR (see §4).

| Category | Labels                                                                                                                                              |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Epic     | `epic:infrastructure`, `epic:marketing-site`                                                                                                        |
| Type     | `type:feat`, `type:docs`, `type:fix`, `type:style`, `type:perf`, `type:refactor`, `type:test`, `type:build`, `type:ci`, `type:chore`, `type:revert` |
| Scope    | `scope:repo`, `scope:tooling`, `scope:ci` (commit-only: `deps`)                                                                                     |
| Priority | `P0`, `P1`, `P2`                                                                                                                                    |

Note: `deps` is a commit scope only and is intentionally not a GitHub
label.

## 6. Allowed Types

`feat` · `fix` · `docs` · `style` · `perf` · `refactor` · `test` · `build` · `ci` · `chore` · `revert`

> Note: the Nx library-layer names (`app`, `data-access`, `feature`, `ui`, `utils`, `models`, `design-system`, `environments`, `e2e`) are **Nx project tags**, not commit types or scopes. Do not use them as commit types.
