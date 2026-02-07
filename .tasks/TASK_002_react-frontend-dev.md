# TASK_002 — FRED API Client + Data Fetching Utilities

**Assigned to:** react-frontend-dev
**Project:** macro-pulse
**Project dir:** ~/Projects/macro-pulse
**Dependencies:** TASK_001 (complete)

## Description

Create a type-safe FRED API client and data transformation utilities for all 6 macroeconomic indicators.

## Requirements

### 1. Types (`lib/types.ts`)
```typescript
interface FredObservation {
  date: string;       // "2024-01-01"
  value: string;      // "3.1" or "."
}

interface Indicator {
  id: string;          // internal ID: "cpi", "unemployment", etc.
  name: string;        // display name
  seriesId: string;    // FRED series ID
  currentValue: number;
  previousValue: number;
  changeDirection: "up" | "down" | "flat";
  changePercent: number;
  unit: string;        // "%", "$ Billions", etc.
  frequency: string;   // "Monthly", "Quarterly", "Daily"
  sparklineData: number[];  // last 12 data points
  lastUpdated: string;
}

interface YieldCurvePoint {
  maturity: string;    // "2Y", "5Y", "10Y", "30Y"
  yield: number;
}
```

### 2. FRED API Client (`lib/fred-api.ts`)
- Base URL: `https://api.stlouisfed.org/fred/series/observations`
- API key from `process.env.FRED_API_KEY`
- Params: `series_id`, `api_key`, `file_type=json`, `sort_order=desc`, `limit=120`, `observation_start` (optional)
- Export: `fetchSeries(seriesId: string, limit?: number): Promise<FredObservation[]>`
- Filter out observations where value is "." (missing data)
- Handle fetch errors gracefully (return empty array, log error)

### 3. Indicator Config (`lib/indicators.ts`)
Static config for all 6 indicators:
```
CPIAUCSL    → CPI (Inflation)          → unit: "Index", frequency: Monthly
UNRATE      → Unemployment Rate         → unit: "%", frequency: Monthly
A191RL1Q225SBEA → GDP Growth Rate       → unit: "%", frequency: Quarterly
FEDFUNDS    → Federal Funds Rate        → unit: "%", frequency: Monthly
DGS10       → 10-Year Treasury Yield    → unit: "%", frequency: Daily
DGS2        → 2-Year Treasury Yield     → unit: "%", frequency: Daily
```
Also add DGS5 and DGS30 for yield curve (not displayed as cards, only in yield curve chart).

### 4. Data Utils (`lib/utils.ts` — extend existing)
- `calculateChange(current: number, previous: number): { direction, percent }`
- `formatValue(value: number, unit: string): string` — format with appropriate decimals
- `transformToSparkline(observations: FredObservation[], count: number): number[]` — extract last N numeric values

### 5. Data Fetching (`lib/data.ts`)
- `getAllIndicators(): Promise<Indicator[]>` — fetches all 6 in parallel, returns array
- `getYieldCurve(): Promise<YieldCurvePoint[]>` — fetches DGS2, DGS5, DGS10, DGS30, returns latest values

### 6. Environment
- Create `.env.local.example` with `FRED_API_KEY=your_api_key_here`
- Add `.env.local` to `.gitignore` (should already be there from Next.js)

## Acceptance Criteria

- [ ] `lib/fred-api.ts` exports `fetchSeries()` that works with valid FRED API key
- [ ] All 6 series IDs fetch correctly
- [ ] Null/missing values (value=".") are filtered out
- [ ] `getAllIndicators()` returns 6 Indicator objects with sparkline data
- [ ] `getYieldCurve()` returns 4 YieldCurvePoint objects
- [ ] TypeScript compiles with 0 errors
- [ ] `npm run build` succeeds

## Response

When complete, write response to `~/Projects/macro-pulse/.tasks/TASK_002_react-frontend-dev_RESPONSE.md`.
