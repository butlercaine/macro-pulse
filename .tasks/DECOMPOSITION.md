# Macro Pulse — Task Decomposition

**Project:** PROJ-2026-0206-MacroPulse
**PL:** project-lead
**Date:** 2026-02-06

## Milestone 1: Core Dashboard + API Integration + Indicator Cards

| Task | Agent | Title | Dependencies |
|------|-------|-------|-------------|
| TASK_001 | react-frontend-dev | Next.js 14 Project Setup | none |
| TASK_002 | react-frontend-dev | FRED API Client + Data Utils | TASK_001 |
| TASK_003 | react-frontend-dev | Indicator Card + Sparkline | TASK_002 |
| TASK_004 | react-frontend-dev | Dashboard Page + Indicator Grid | TASK_001, TASK_003 |
| TASK_005 | qa-engineer | M1 QA Validation | TASK_002, TASK_004 |
| TASK_006 | scribe | M1 Decision Log | TASK_005 |
| TASK_007 | git-commit-agent | M1 Commit + Push | TASK_005 |

## Milestone 2: Yield Curve + Historical Charts + Vercel Deployment

| Task | Agent | Title | Dependencies |
|------|-------|-------|-------------|
| TASK_008 | react-frontend-dev | Yield Curve Chart | TASK_002 |
| TASK_009 | react-frontend-dev | Historical Trend Chart | TASK_002 |
| TASK_010 | react-frontend-dev | Indicator Detail View | TASK_003, TASK_009 |
| TASK_011 | react-frontend-dev | Responsive Design Polish | TASK_004, TASK_010 |
| TASK_012 | react-frontend-dev | Vercel Deployment Config | TASK_011 |
| TASK_013 | qa-engineer | M2 QA Validation | TASK_008-012 |
| TASK_014 | scribe | M2 Decision Log | TASK_013 |
| TASK_015 | git-commit-agent | M2 Commit + Push + Release | TASK_013 |
