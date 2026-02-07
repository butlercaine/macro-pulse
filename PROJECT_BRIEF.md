# Project Brief: PROJ-2026-0206-MacroPulse

**Created**: 2026-02-06
**Domain**: Engineering (Secondary: Finance)
**Complexity**: 3/5
**Status**: SCOPING — Awaiting Human Operator approval

## Objective

Build and deploy a US economic health dashboard ("Macro Pulse") that pulls live data from the FRED API and displays key macroeconomic indicators with trend visualization, hosted on Vercel with daily auto-refresh.

## Scope

### In Scope
- Next.js 14+ App Router web application with Tailwind CSS and shadcn/ui
- FRED API integration (free tier, API key required) for 6 core indicators:
  1. **Inflation (CPI)** — series `CPIAUCSL` (monthly)
  2. **Unemployment Rate** — series `UNRATE` (monthly)
  3. **GDP Growth Rate** — series `A191RL1Q225SBEA` (quarterly, annualized)
  4. **Federal Funds Rate** — series `FEDFUNDS` (monthly)
  5. **10-Year Treasury Yield** — series `DGS10` (daily)
  6. **2-Year Treasury Yield** — series `DGS2` (daily)
- Dashboard layout with indicator cards (current value, previous value, change direction, sparkline)
- Yield curve chart (2Y vs 5Y vs 10Y vs 30Y, with inversion detection)
- Historical trend charts with selectable timeframes (1Y, 5Y, 10Y, Max)
- Responsive design (mobile + desktop)
- Next.js ISR with daily revalidation (`revalidate: 86400`)
- Vercel deployment with `FRED_API_KEY` environment variable
- GitHub repo at `butlercaine/macro-pulse`

### Out of Scope
- User authentication or accounts
- Custom indicator selection (fixed set of 6)
- Real-time streaming / WebSocket updates
- Push notifications or alerting
- Database / persistence layer (API-only, no caching layer beyond ISR)
- International economic data (US only)

## Success Criteria (Measurable — must be verifiable by QA)

- [ ] All 6 FRED indicators fetch successfully and display current values
- [ ] Yield curve chart renders with 2Y, 5Y, 10Y, 30Y points and detects/labels inversion
- [ ] Historical trend charts render for each indicator with 1Y/5Y/10Y/Max toggle
- [ ] Sparklines on indicator cards show trailing 12-month trend
- [ ] Dashboard is responsive: renders correctly at 375px (mobile) and 1440px (desktop)
- [ ] `next build` completes with 0 errors
- [ ] Lighthouse performance score >= 80 on desktop
- [ ] Deployed to Vercel and accessible via public URL
- [ ] ISR revalidation configured at 24h intervals
- [ ] All unit tests pass (minimum: API fetch functions, data transformation utils)

## Team Composition

**Mandatory:**
- Project Lead: `project-lead` (decomposition + rework advisory)
- QA Agent: `qa-engineer` (validate against success criteria)
- Scribe Agent: `scribe` (DECISIONS.md, project history)
- Git Commit Agent: `git-commit-agent` (Engineering domain — required)

**Specialists:**
- `react-frontend-dev`: Next.js 14+ App Router, Tailwind, shadcn/ui, Recharts charting, Vercel deployment

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| FRED API rate limit (120 req/min) hit during build | L | M | Batch API calls, use ISR to cache responses for 24h |
| FRED API key not provisioned before dev starts | M | H | Caine provisions key in Vercel env vars before Phase 4 |
| Yield curve data gaps (weekends/holidays for daily series) | M | L | Filter null values, interpolate or skip missing dates |
| ISR revalidation fails silently on Vercel | L | M | Add error boundary + fallback UI for stale data |

## Similar Past Projects (from Obsidian Brain)

- **PROJ-2026-0205-ClawBoard** — Next.js 14+ App Router + Tailwind + shadcn/ui. Same tech stack. Lessons: keep component count low, use server components for data fetching, shadcn/ui setup is straightforward.
- **PROJ-2026-0206-CreditWatch** — Finance domain, external API integration. Lessons: validate API responses defensively, Finance DC useful for indicator selection rationale.

## Timeline

- Estimated milestones: 2 (M1: core dashboard + API integration, M2: charts + Vercel deploy)
- M1: Indicator cards with current values, sparklines, basic layout
- M2: Yield curve chart, historical trend charts, responsive polish, Vercel deployment

## Required Skills

- Next.js 14+ (App Router, Server Components, ISR)
- Tailwind CSS + shadcn/ui
- Recharts (or Tremor) for data visualization
- FRED API integration
- Vercel deployment

---
**Human Operator Approval**: [ ] Approved / [ ] Needs revision
**Notes**:
