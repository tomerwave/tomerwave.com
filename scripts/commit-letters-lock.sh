#!/usr/bin/env bash
set -euo pipefail

if git diff --quiet scripts/letters.lock.json; then
  echo "Nothing new was scheduled."
  exit 0
fi

git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git add scripts/letters.lock.json
git commit -m "Record the letters scheduled this week"
git push
