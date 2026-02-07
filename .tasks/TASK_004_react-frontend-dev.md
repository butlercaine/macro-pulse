# TASK_004 — Dashboard Page with Indicator Grid

**Assigned to:** react-frontend-dev
**Project:** macro-pulse
**Project dir:** ~/Projects/macro-pulse
**Dependencies:** TASK_001, TASK_003 (both complete)

## Description

Build the main dashboard page using Next.js Server Components with ISR, displaying all 6 indicators in a responsive grid.

## Requirements

### 1. Dashboard Header (`components/dashboard-header.tsx`)
- App title: "Macro Pulse"
- Subtitle: "US Economic Health Dashboard"
- Last refreshed timestamp (from data)
- Clean, minimal header — dark theme

### 2. Indicator Grid (`components/indicator-grid.tsx`)
- Accepts `indicators: Indicator[]`
- CSS Grid layout:
  - Mobile (< 640px): 1 column
  - Tablet (640-1024px): 2 columns
  - Desktop (> 1024px): 3 columns
- Gap: consistent spacing (gap-4 or gap-6)
- Each cell renders `IndicatorCard`

### 3. Main Page (`app/page.tsx`)
- **Server Component** — async function that fetches data
- Import `getAllIndicators` from `lib/data.ts`
- Set `export const revalidate = 86400` (24h ISR)
- Show `LoadingCard` grid while loading (use Suspense + loading.tsx)
- Error handling: if API fails, show error message with retry suggestion
- Layout: header + indicator grid, max-width container, centered

### 4. Loading State (`app/loading.tsx`)
- Uses `LoadingCard` components in same grid layout
- Shows 6 skeleton cards

### 5. Layout Update (`app/layout.tsx`)
- Add proper metadata: title "Macro Pulse", description "US Economic Health Dashboard"
- Add Open Graph metadata for social sharing

## Acceptance Criteria

- [ ] Dashboard displays all 6 indicators with real FRED data (or mock if no API key)
- [ ] Grid is responsive: 1 col at 375px, 2 at 768px, 3 at 1200px+
- [ ] Loading skeletons show during data fetch
- [ ] `export const revalidate = 86400` is set on the page
- [ ] `npm run build` succeeds with 0 errors
- [ ] Page metadata (title, description) is set

## Note on API Key

If `FRED_API_KEY` is not set, use mock/fallback data from `getMockData()` in `lib/data.ts` so the build doesn't fail. The build should work without an API key (static mock data), and with a key it shows live data.

## Response

Write response to `~/Projects/macro-pulse/.tasks/TASK_004_react-frontend-dev_RESPONSE.md`.
