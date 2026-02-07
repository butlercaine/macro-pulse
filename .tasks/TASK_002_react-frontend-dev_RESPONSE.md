# TASK_002 Response — FRED API Client + Data Fetching Utilities

**Status:** COMPLETE

## Files Created

### Core Type Definitions (`lib/types.ts`)
- `FredObservation` - Raw FRED API observation shape
- `Indicator` - Processed indicator for UI display
- `YieldCurvePoint` - Single yield curve data point
- `IndicatorConfig` - Configuration for each indicator
- `ChangeResult` - Change calculation result

### FRED API Client (`lib/fred-api.ts`)
- `fetchSeries()` - Fetch observations for a FRED series
- `fetchSeriesBatch()` - Parallel fetch for multiple series
- Filters out missing values (value=".")
- Handles API errors gracefully (returns empty array, logs error)
- Reads API key from `process.env.FRED_API_KEY`

### Indicator Configuration (`lib/indicators.ts`)
All 6 primary indicators:
| FRED Series | Internal ID | Name | Unit | Frequency |
|------------|-------------|------|------|-----------|
| CPIAUCSL | cpi | Consumer Price Index | Index | Monthly |
| UNRATE | unemployment | Unemployment Rate | % | Monthly |
| A191RL1Q225SBEA | gdp | GDP Growth Rate | % | Quarterly |
| FEDFUNDS | fedfunds | Federal Funds Rate | % | Monthly |
| DGS10 | dgs10 | 10-Year Treasury Yield | % | Daily |
| DGS2 | dgs2 | 2-Year Treasury Yield | % | Daily |

Additional yield curve series (not displayed as cards):
- DGS5 (5-Year Treasury Yield)
- DGS30 (30-Year Treasury Yield)

### Data Utilities (`lib/utils.ts`) — Extended
- `calculateChange()` - Calculate direction, change amount, percent
- `formatValue()` - Format with appropriate decimals based on unit
- `filterAndParseObservations()` - Remove missing values, parse floats
- `transformToSparkline()` - Extract last N values for sparklines
- `getLatestValue()` - Get most recent numeric value
- `formatDate()` - Format date for display
- `getRelativeTime()` - Human-readable relative time
- `cn()` - Class name merger (added for shadcn/ui compatibility)

### Data Fetching Layer (`lib/data.ts`)
- `getIndicator()` - Fetch and transform single indicator
- `getAllIndicators()` - Fetch all 6 indicators in parallel
- `getYieldCurve()` - Fetch DGS2, DGS5, DGS10, DGS30
- `getIndicatorHistory()` - Fetch historical data
- `getMockData()` - Mock data for development without API key

### Environment Configuration
- `.env.local.example` - Template with `FRED_API_KEY` placeholder

## Dependencies Installed
- `@radix-ui/react-select` - For Select component used in UI

## Decisions Made

1. **Indicator Frequency Handling:** Respects each indicator's natural frequency (Daily for treasuries, Monthly for most, Quarterly for GDP)

2. **Missing Data Handling:** FRED uses "." for missing values - all utilities filter these out

3. **Mock Data:** Included `getMockData()` function for development/demo without requiring API key

4. **Error Handling:** All fetch operations return empty arrays on error with console logging for debugging

## Issues Encountered

1. **Module Resolution:** The `cn` utility function was missing from `lib/utils.ts` - the UI components expected it for class merging. Fixed by adding the `cn` function at the top of the file.

## Acceptance Criteria Verification

- [x] `lib/fred-api.ts` exports `fetchSeries()` that works with valid FRED API key
- [x] All 6 series IDs fetch correctly (CPIAUCSL, UNRATE, A191RL1Q225SBEA, FEDFUNDS, DGS10, DGS2)
- [x] Null/missing values (value=".") are filtered out in `filterAndParseObservations()`
- [x] `getAllIndicators()` returns 6 Indicator objects with sparkline data
- [x] `getYieldCurve()` returns 4 YieldCurvePoint objects (DGS2, DGS5, DGS10, DGS30)
- [x] TypeScript compiles with 0 errors
- [x] `npm run build` succeeds

## Usage

```typescript
// With FRED API key in .env.local
import { getAllIndicators, getYieldCurve } from "@/lib/data"

const indicators = await getAllIndicators()
const yieldCurve = await getYieldCurve()

// For development without API key
import { getMockData } from "@/lib/data"
const { indicators, yieldCurve } = getMockData()
```
