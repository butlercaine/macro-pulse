# TASK_010 — Indicator Detail View + Chart Integration

**Assigned to:** react-frontend-dev
**Project:** macro-pulse
**Project dir:** ~/Projects/macro-pulse
**Dependencies:** TASK_003, TASK_009 (both complete)

## Description

Create detail pages for each indicator, accessible by clicking indicator cards. Each detail page shows the full historical trend chart with timeframe selection.

## Requirements

### 1. Indicator Config (`lib/indicators.ts`)
Add URL-friendly slugs to each indicator config:
- `cpi` → CPIAUCSL
- `unemployment` → UNRATE
- `gdp` → A191RL1Q225SBEA
- `fed-funds` → FEDFUNDS
- `treasury-10y` → DGS10
- `treasury-2y` → DGS2

### 2. Detail Page (`app/indicator/[id]/page.tsx`)
- Dynamic route: `/indicator/cpi`, `/indicator/unemployment`, etc.
- Server Component with ISR (revalidate: 86400)
- Look up indicator by slug from config
- Fetch historical data using `getIndicatorTrendHistory()` or similar
- Display:
  - Back link/button to dashboard (← Back)
  - Indicator name as page title
  - Current value (large), change direction, last updated
  - TrendChart with TimeframeSelector
  - Brief description of what this indicator measures
- If invalid slug: show 404 via `notFound()`
- Generate static params with `generateStaticParams()` for all 6 slugs

### 3. Card Click Navigation
- Update `IndicatorCard` component to wrap in Next.js `Link` to `/indicator/{slug}`
- Each Indicator object needs a `slug` field (add to type and config)
- Cursor pointer on hover

### 4. Detail page needs to be a client component for timeframe switching
- The TimeframeSelector changes state → needs client interactivity
- Options:
  - Make the whole detail page a client component (simpler)
  - Or use a client wrapper for the chart section (better for SSR)
- Either approach is fine, just make it work

## Acceptance Criteria

- [ ] Clicking any indicator card navigates to `/indicator/{slug}`
- [ ] Detail page shows indicator name, current value, change
- [ ] TrendChart renders with historical data
- [ ] TimeframeSelector switches between 1Y/5Y/10Y/Max
- [ ] Back button navigates to dashboard
- [ ] Invalid slug shows 404
- [ ] `npm run build` succeeds with 0 errors

## Response

Write response to `~/Projects/macro-pulse/.tasks/TASK_010_react-frontend-dev_RESPONSE.md`.
