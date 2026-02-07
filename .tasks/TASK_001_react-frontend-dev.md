# TASK_001 — Next.js 14 Project Setup

**Assigned to:** react-frontend-dev
**Project:** macro-pulse
**Project dir:** ~/Projects/macro-pulse
**Dependencies:** none

## Description

Initialize a Next.js 14+ App Router project with TypeScript, Tailwind CSS, and shadcn/ui in the existing `~/Projects/macro-pulse` directory.

## Requirements

1. Initialize Next.js 14+ with App Router and TypeScript (`npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*"`)
   - If the directory already has files (PROJECT_BRIEF.md, .tasks/), that's expected — work around them
2. Install and configure shadcn/ui (`npx shadcn@latest init`)
3. Add shadcn components: card, button, badge, skeleton, select
4. Set up base layout in `app/layout.tsx` with dark theme (slate/zinc palette)
5. Create placeholder `app/page.tsx` with a centered "Macro Pulse" title
6. Configure `next.config.js` (or `next.config.mjs`) — no special config needed yet

## Acceptance Criteria

- [ ] `npm run dev` starts without errors
- [ ] `npm run build` completes with 0 errors
- [ ] Home page renders with "Macro Pulse" heading
- [ ] shadcn/ui Card, Button, Badge, Skeleton, Select components importable
- [ ] TypeScript configured with strict mode
- [ ] Tailwind dark theme works

## Response

When complete, write your response to `~/Projects/macro-pulse/.tasks/TASK_001_react-frontend-dev_RESPONSE.md` with:
- Status: COMPLETE or BLOCKED
- Files created/modified (list)
- Any decisions made
- Any issues encountered
