# TASK_007 — M1 Commit + Push

**Assigned to:** git-commit-agent
**Project:** macro-pulse
**Project dir:** ~/Projects/macro-pulse
**Dependencies:** TASK_005 (complete — M1 QA PASS)

## Description

Initialize git repo, commit all M1 files, push to GitHub.

## Requirements

1. `cd ~/Projects/macro-pulse`
2. Initialize git repo if not exists: `git init`
3. Create `.gitignore` appropriate for Next.js (node_modules, .next, .env.local, etc.) — should already exist from create-next-app
4. Stage all files EXCEPT: `.env.local`, any secrets
5. Create initial commit with message: "feat: Milestone 1 — core dashboard with FRED API integration and indicator cards"
6. Create `main` branch if not on it
7. Add remote: `git remote add origin https://github.com/butlercaine/macro-pulse.git`
8. Create the GitHub repo first if needed: `gh repo create butlercaine/macro-pulse --public --source=. --remote=origin`
9. Push: `git push -u origin main`
10. Tag: `git tag v0.1.0-m1 && git push --tags`

## Important

- Do NOT commit `.env.local` or any file containing API keys
- Do NOT commit `node_modules/`
- DO commit `.env.local.example`
- The `.tasks/` directory CAN be committed (it's project documentation)

## Response

Write response to `~/Projects/macro-pulse/.tasks/TASK_007_git-commit-agent_RESPONSE.md`.
