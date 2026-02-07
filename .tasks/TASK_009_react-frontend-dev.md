# TASK_009 — Historical Trend Chart Component

**Assigned to:** react-frontend-dev
**Project:** macro-pulse
**Project dir:** ~/Projects/macro-pulse
**Dependencies:** TASK_002 (complete), TASK_008 (Recharts must be installed first)

## Description

Build a historical trend chart component with timeframe selection for viewing indicator history.

## Requirements

### 1. Timeframe Selector (`components/timeframe-selector.tsx`)
- Row of buttons: 1Y, 5Y, 10Y, Max
- Active button highlighted (different background color)
- On click, filters data to selected range
- Default: 1Y selected

### 2. Trend Chart (`components/trend-chart.tsx`)
- Uses Recharts `AreaChart` (filled area under line) with `ResponsiveContainer`
- Props: `data: {date: string, value: number}[]`, `color?: string`, `unit?: string`
- X-axis: dates (formatted as MMM YYYY for readability, show ~6-8 labels)
- Y-axis: values with unit suffix
- Tooltip: shows exact date and formatted value on hover
- Area fill: gradient from line color to transparent
- Responsive: fills container width, height ~300px

### 3. Data Fetching
- The FRED API client already supports fetching historical data via `fetchSeries(seriesId, limit)`
- For timeframes:
  - 1Y: last 12 observations (monthly) or ~252 (daily)
  - 5Y: last 60 observations (monthly) or ~1260 (daily)
  - 10Y: last 120 observations (monthly)
  - Max: all available (limit=99999 or no limit)
- Add a helper in `lib/data.ts`: `getIndicatorHistory(seriesId: string, years: number): Promise<{date: string, value: number}[]>`

## Acceptance Criteria

- [ ] TrendChart renders area chart with gradient fill
- [ ] Timeframe selector shows 4 options (1Y, 5Y, 10Y, Max)
- [ ] Switching timeframes updates the chart data
- [ ] Tooltip shows date and value on hover
- [ ] X-axis labels are readable (not cramped)
- [ ] TypeScript compiles with 0 errors
- [ ] `npm run build` succeeds

## Response

Write response to `~/Projects/macro-pulse/.tasks/TASK_009_react-frontend-dev_RESPONSE.md`.
