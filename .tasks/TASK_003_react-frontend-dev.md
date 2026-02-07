# TASK_003 — Indicator Card Component with Sparkline

**Assigned to:** react-frontend-dev
**Project:** macro-pulse
**Project dir:** ~/Projects/macro-pulse
**Dependencies:** TASK_002 (complete)

## Description

Build a reusable `IndicatorCard` component and an SVG `Sparkline` component for the dashboard.

## Requirements

### 1. Sparkline Component (`components/sparkline.tsx`)
- Pure SVG sparkline (no charting library needed for this)
- Props: `data: number[]`, `width?: number`, `height?: number`, `color?: string`
- Renders SVG polyline from data points
- Scales Y-axis to min/max of data
- Default size: 120x40px
- Color: use Tailwind color variable or prop

### 2. Indicator Card (`components/indicator-card.tsx`)
- Uses shadcn/ui `Card`, `CardHeader`, `CardContent` components
- Props: accepts an `Indicator` object from `lib/types.ts`
- Displays:
  - **Title**: indicator name (e.g., "CPI (Inflation)")
  - **Current Value**: large text, formatted with unit
  - **Change Indicator**: arrow icon (↑/↓/→) with color (green for up on employment/GDP, red for up on inflation/rates — or just directional green=up red=down is fine)
  - **Change Percent**: small text showing percentage change
  - **Sparkline**: trailing 12-month trend
  - **Last Updated**: small muted text with date
- Hover: subtle scale/shadow effect via Tailwind
- The card should be clickable (wrap in Link or accept onClick prop) — will link to detail view in M2

### 3. Loading Card (`components/loading-card.tsx`)
- Uses shadcn `Skeleton` component
- Same dimensions as `IndicatorCard`
- Shows placeholder shimmer for title, value, and sparkline areas

## Acceptance Criteria

- [ ] `IndicatorCard` renders with all fields from Indicator type
- [ ] Sparkline SVG renders smooth line from data array
- [ ] Change direction shows colored arrow (green/red)
- [ ] `LoadingCard` shows skeleton shimmer
- [ ] TypeScript compiles with 0 errors
- [ ] `npm run build` succeeds

## Response

Write response to `~/Projects/macro-pulse/.tasks/TASK_003_react-frontend-dev_RESPONSE.md`.
