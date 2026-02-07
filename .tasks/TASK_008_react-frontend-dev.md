# TASK_008 — Yield Curve Chart Component

**Assigned to:** react-frontend-dev
**Project:** macro-pulse
**Project dir:** ~/Projects/macro-pulse
**Dependencies:** TASK_002 (complete)

## Description

Build a yield curve chart using Recharts, displaying current US Treasury yield curve with inversion detection.

## Requirements

### 1. Install Recharts
```bash
npm install recharts
```

### 2. Yield Curve Chart (`components/yield-curve-chart.tsx`)
- Use Recharts `LineChart` with `ResponsiveContainer`
- X-axis: maturity labels (2Y, 5Y, 10Y, 30Y)
- Y-axis: yield percentage (auto-scaled with padding)
- Single line connecting the 4 points
- Data dots at each maturity point
- Tooltip showing maturity and yield value on hover
- Grid lines for readability

### 3. Inversion Detection
- Import/create utility: `isYieldCurveInverted(points: YieldCurvePoint[]): boolean`
  - Inverted when 2Y yield > 10Y yield
- If inverted: show a prominent red `Badge` with "YIELD CURVE INVERTED" above the chart
- If normal: show green `Badge` with "NORMAL" (subtle)
- Calculate and display the 2Y-10Y spread value

### 4. Yield Curve Section (`components/yield-curve-section.tsx`)
- Wrapper component with:
  - Section title: "US Treasury Yield Curve"
  - Inversion badge
  - Spread value: "2Y-10Y Spread: X.XX%"
  - The chart
  - Last updated timestamp
- Uses shadcn Card as container

### 5. Integration
- Add yield curve section to `app/page.tsx` below the indicator grid
- Fetch yield curve data using `getYieldCurve()` from `lib/data.ts`
- Same ISR revalidation applies

## Acceptance Criteria

- [ ] Recharts installed and working
- [ ] Yield curve chart renders 4 data points (2Y, 5Y, 10Y, 30Y)
- [ ] Inversion detection works (badge changes color/text)
- [ ] 2Y-10Y spread displayed
- [ ] Chart integrated into main dashboard page
- [ ] `npm run build` succeeds with 0 errors

## Response

Write response to `~/Projects/macro-pulse/.tasks/TASK_008_react-frontend-dev_RESPONSE.md`.
