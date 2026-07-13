# AGENTS.md — instructions for AI coding agents

This repository enforces strict contribution standards. Read this file before committing; see `CONTRIBUTING.md` for the full rationale. Agents routinely skip `CONTRIBUTING.md` (a human-onboarding doc) — this file is the agent-native equivalent and is what you should follow.

## Branch model (Git Flow)
- The default branch is `develop` (integration / staging). `main` is production.
- **Never commit directly to `main` or `develop`.** Always work in a `feature/*`, `release/*`, or `hotfix/*` branch.
- All merges are squash-merge.

## Commit message (STRICT — treat as a hard rule, not a soft suggestion)
```
<type>(<scope>): <subject>

<body>

Closes: #N   (or Refs: #N)
```
- `<type>`: `feat` · `fix` · `docs` · `style` · `perf` · `refactor` · `test` · `build` · `ci` · `chore` · `revert`
- `<scope>`: **mandatory**. One of `repo`, `tooling`, `ci`, `deps` (`deps` is commit-scope only — never a label). New scopes require a matching `scope:*` label **and** a commitlint `scope-enum` update in the same PR.
- **Subject ≤ 50 characters.**
- **Body: hard-wrap prose at 72 columns AND fill the lines.** Do not produce ragged fragments (e.g. a 10-char line next to a 71-char line). Break at clause/sentence boundaries, never mid-word. Each paragraph should be a block of near-full ~72-char lines. Lists, code blocks, and trailers may be short — prose must be wrapped.
- **Footer: exactly one `Closes: #N`** (closes the issue when merged to `develop`) **or `Refs: #N`** (reference only). Mandatory — every commit maps to an issue.
- **Atomic & self-contained:** one logical change per commit; it must build, lint, typecheck, test, and deploy independently. Do not mix unrelated changes.

## During review
Address feedback with `git commit --fixup <sha>` then `git rebase -i --autosquash <base>`. The PR is squash-merged, so fixups collapse into clean commits.

## Full standards
`CONTRIBUTING.md` — conventions, Git Flow, PR rules, and the scope↔label lockstep.
