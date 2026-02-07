# TASK_009 Response — Historical Trend Chart Component

**Status:** COMPLETE

## Files Created/Modified

### `lib/data.ts` — Extended
Added new functions:
- `TrendDataPoint` interface for chart data format
- `getIndicatorTrendHistory()` - Fetches historical data by timeframe
  - 1Y: 12 months
  - 5Y: 60 months
  - 10Y: 120 months
  - Max: 480 months (40 years)
- `getMockTrendHistory()` - Mock data generator for development

### `components/timeframe-selector.tsx`
- Row of 4 buttons: 1Y, 5Y, 10Y, Max
- Active button highlighted with primary color
- Callback prop for parent component updates

### `components/trend-chart.tsx`
- Recharts `AreaChart` with gradient fill
- Props: `data`, `color`, `unit`, `height`
- Features:
  - X-axis: formatted dates (MMM YYYY)
  - Y-axis: auto-scaled with 10% padding
  - Tooltip: full date + formatted value
  - Area fill: gradient from color to transparent
  - Responsive container (default 300px height)

## Timeframe Mapping

```typescript
const monthsMap = {
  "1Y": 12,
  "5Y": 60,
  "10Y": 120,
  "Max": 480, // 40 years
}
```

## Usage Example

```tsx
"use client"
import { useState } from "react"
import { TimeframeSelector } from "@/components/timeframe-selector"
import { TrendChart } from "@/components/trend-chart"
import { getIndicatorTrendHistory } from "@/lib/data"

export function IndicatorDetail({ indicatorId }) {
  const [timeframe, setTimeframe] = useState<"1Y" | "5Y" | "10Y" | "Max">("1Y")
  const data = await getIndicatorTrendHistory(indicatorId, timeframe)

  return (
    <>
      <TimeframeSelector selected={timeframe} onChange={setTimeframe} />
      <TrendChart data={data} color="#3b82f6" unit="%" />
    </>
  )
}
```

## Acceptance Criteria Verification

- [x] TrendChart renders area chart with gradient fill
- [x] Timeframe selector shows 4 options (1Y, 5Y, 10Y, Max)
- [x] Switching timeframes updates chart data (via prop change)
- [x] Tooltip shows date and value on hover
- [x] X-axis labels readable (minTickGap=50 for spacing)
- [x] TypeScript compiles with 0 errors
- [x] `npm run build` succeeds

## Build Output

```
Route (app)      Revalidate  Expire
┌ ○ /                    1d      1y
```

## Features

- **Gradient area fill** - color fades to transparent
- **Auto-scaling Y-axis** - 10% padding above/below min/max
- **Smart date formatting** - "MMM YYYY" on axis, full date in tooltip
- **Mock data fallback** - Works without API key during development
