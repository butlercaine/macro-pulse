# TASK_015 — M2 Commit + Push + Release

**Assigned to:** git-commit-agent
**Project:** macro-pulse
**Project dir:** ~/Projects/macro-pulse
**Dependencies:** TASK_013 (complete — M2 QA PASS)

## Description

Commit all M2 changes, push, and create release tag.

## Requirements

1. `cd ~/Projects/macro-pulse`
2. Stage all new/modified files (exclude .env.local, node_modules, .next)
3. Commit with message: "feat: Milestone 2 — yield curve chart, historical trends, indicator detail pages, responsive polish, Vercel deployment config"
4. Push to origin main
5. Tag: `git tag v1.0.0 && git push --tags`
6. Optionally create GitHub release via `gh release create v1.0.0 --title "v1.0.0 — Macro Pulse" --notes "US economic health dashboard with 6 FRED indicators, yield curve visualization, and historical trend charts."`

## Important

- Do NOT commit `.env.local` or any secrets
- DO commit all new components, pages, config, README, DECISIONS.md
- The `.tasks/` directory CAN be committed

## Response

Write response to `~/Projects/macro-pulse/.tasks/TASK_015_git-commit-agent_RESPONSE.md`.
