#!/usr/bin/env bash
set -euo pipefail

# Opt-in bypass for maintainer tip-amend / fast-forward maintenance on a
# protected branch. Set SKIP_BRANCH_GUARD=1 to use it. lint-staged and
# commitlint still run, so this preserves local linting while allowing the
# commit. Any other value (including "0" or "false") does NOT bypass it.
if [ "${SKIP_BRANCH_GUARD:-}" = "1" ]; then
  exit 0
fi

branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "HEAD")"

# Detached HEAD (e.g. during an interactive rebase or amend): skip the guard
# so rebasing does not get blocked.
if [ "$branch" = "HEAD" ]; then
  exit 0
fi

# Protected branches — block direct commits (case-insensitive).
lower="$(printf '%s' "$branch" | tr '[:upper:]' '[:lower:]')"
case "$lower" in
  main | develop | master)
    echo "ERROR: direct commits to '$branch' are blocked by the Git Flow branch guard." >&2
    echo "Use a feature/* branch, then merge via PR (#8) or fast-forward." >&2
    exit 1
    ;;
esac
