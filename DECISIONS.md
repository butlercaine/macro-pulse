# DECISIONS.md - Architectural Decisions

> Project: macro-pulse | Last updated: 2026-02-06

## Purpose
Record significant architectural and design decisions made during the macro-pulse project development.

---

## Template

```markdown
### YYYY-MM-DD | [Decision Title]

**Status:** [Proposed | Accepted | Deprecated]

**Context:**
<!-- What prompted this decision? -->

**Options Considered:**
- Option 1: [description]
- Option 2: [description]
- ...

**Decision:** [Chosen approach]
<!-- Include brief rationale -->

**Consequences:**
<!-- What changes? What trade-offs? -->

**References:**
- [Link or notes]
```

---

## Decisions

### 2026-02-06 | Tech Stack Selection

**Status:** Accepted

**Context:**
Need to select frameworks and libraries for a US economic dashboard with data visualization requirements.

**Options Considered:**
- **Option A:** Next.js 14+ with Tailwind CSS + shadcn/ui + Recharts
- **Option B:** React + Vite + plain CSS + D3.js
- **Option C:** Next.js 14+ + plain Tailwind + Chart.js

**Decision:** Next.js 16.1.6 with Tailwind CSS, shadcn/ui, and custom SVG sparklines.

**Rationale:**
- Next.js App Router provides ISR out-of-box (project requirement: 24h auto-refresh)
- shadcn/ui offers accessible, customizable components without heavy bundle overhead
- Previous project (ClawBoard) validated this stack works well
- Dark theme requirement satisfied by shadcn/ui's default dark mode palette
- Custom SVG sparklines lighter than full charting library for simple trend visualization

**Consequences:**
- Must manually manage shadcn/ui component files (no CLI for clean pipeline)
- Requires `@radix-ui` dependencies for accessible primitives

**References:**
- PROJECT_BRIEF.md (Tech stack requirement: Next.js 14+, Tailwind, shadcn/ui)
- PROJ-2026-0205-ClawBoard lessons learned

---

### 2026-02-06 | Dark Theme Implementation

**Status:** Accepted

**Context:**
PROJECT_BRIEF specifies dark theme for financial dashboard aesthetic.

**Options Considered:**
- **Option A:** CSS-only dark theme with manual color variables
- **Option B:** `next-themes` with automatic system preference detection
- **Option C:** shadcn/ui default dark mode with CSS variables

**Decision:** shadcn/ui default dark mode with CSS variables, applied via `class="dark"` on `<html>`.

**Rationale:**
- shadcn/ui provides complete dark mode CSS variable set out of box
- No need for additional `next-themes` dependency
- Consistent with shadcn/ui component library
- Simple: one class on html element, all components adapt

**Consequences:**
- All components must use CSS variables for colors (slate/zinc palette)
- Manual class application means no automatic system preference toggle

**References:**
- TASK_001_RESPONSE.md

---

### 2026-02-06 | Project Directory Structure (No src/)

**Status:** Accepted

**Context:**
Next.js defaults to `src/app/` with App Router; project requires custom structure.

**Options Considered:**
- **Option A:** Default `src/app/` directory structure
- **Option B:** Root-level `app/` directory

**Decision:** Root-level `app/` directory (no `src/`).

**Rationale:**
- Task requirement specified no `src/` directory
- Simpler deployment configuration
- Shorter import paths

**Consequences:**
- Configuration files (package.json, tsconfig.json) remain at root
- All source code in project root alongside docs and configs

**References:**
- TASK_001_RESPONSE.md

---

### 2026-02-06 | shadcn/ui Component Management

**Status:** Accepted

**Context:**
Need accessible UI components (Button, Card, Badge, etc.) for dashboard.

**Options Considered:**
- **Option A:** Run `npx shadcn@latest init` and `npx shadcn@latest add [components]`
- **Option B:** Manually create component files from shadcn/ui source

**Decision:** Manual component file creation from shadcn/ui source, without CLI.

**Rationale:**
- Avoid interactive prompts in automated pipelines
- Full control over component code
- Easier to version-control component changes
- Standard approach for CI/CD pipelines

**Consequences:**
- Must manually track which components are needed
- Additional setup step when adding new components
- Dependencies must be installed separately (`class-variance-authority`, `clsx`, `tailwind-merge`, etc.)

**References:**
- TASK_001_RESPONSE.md (components created: Button, Card, Badge, Skeleton, Select)

---

### 2026-02-06 | FRED API Client Architecture

**Status:** Accepted

**Context:**
Need to fetch 6 economic indicators from FRED API with rate limiting (120 req/min) and potential API key issues.

**Options Considered:**
- **Option A:** Client-side API calls with API key in environment
- **Option B:** Server-side only API calls with mock fallback
- **Option C:** Server-side with Redis caching layer

**Decision:** Server-side only API client (`lib/fred-api.ts`) with mock data fallback.

**Rationale:**
- API key security: FRED API key never exposed to client
- ISR compatibility: Server Components can fetch during build/revalidate
- Mock fallback allows development and build without API key provisioned
- 120 req/min limit handled by ISR caching (24h)
- Simple architecture: no database or Redis required

**Consequences:**
- All data fetching happens on server
- Mock data must be maintained alongside real data
- Error handling returns empty arrays (graceful degradation)

**References:**
- TASK_002_RESPONSE.md
- PROJECT_BRIEF Risk Register (API key provisioning risk)

---

### 2026-02-06 | Indicator Configuration Strategy

**Status:** Accepted

**Context:**
PROJECT_BRIEF specifies 6 core indicators; need maintainable configuration.

**Options Considered:**
- **Option A:** Hardcoded fetch calls throughout codebase
- **Option B:** Centralized configuration array with metadata
- **Option C:** Database-backed indicator configuration

**Decision:** Centralized `INDICATORS` array in `lib/indicators.ts` with full metadata.

**Rationale:**
- Single source of truth for all indicator definitions
- Easy to add/remove indicators
- Includes FRED series ID, display name, unit, frequency, showAsCard flag
- Type-safe with `IndicatorConfig` interface

**Consequences:**
- Adding new indicator = add one object to array
- Yield curve series (DGS5, DGS30) separated from card indicators

**References:**
- TASK_002_RESPONSE.md

---

### 2026-02-06 | Missing Data Handling

**Status:** Accepted

**Context:**
FRED API returns "." for missing/null values; daily series (treasuries) have gaps on weekends/holidays.

**Options Considered:**
- **Option A:** Return null and let UI handle
- **Option B:** Interpolate missing values
- **Option C:** Filter out null/missing values

**Decision:** Filter out null/missing values in `filterAndParseObservations()` utility.

**Rationale:**
- Financial data: interpolation could create false precision
- Charts handle sparse data naturally
- Simple and transparent: what you see is what FRED reported
- Consistent with finance domain standards

**Consequences:**
- Sparklines may have fewer points if recent data is missing
- Historical charts skip dates with no data

**References:**
- TASK_002_RESPONSE.md

---

### 2026-02-06 | Sparkline Rendering Approach

**Status:** Accepted

**Context:**
Indicator cards need trailing 12-month trend visualization.

**Options Considered:**
- **Option A:** Recharts or Tremor charting library
- **Option B:** Pure SVG component
- **Option C:** Canvas-based rendering

**Decision:** Pure SVG sparkline component (`components/sparkline.tsx`).

**Rationale:**
- Sparklines are simple: line + optional gradient fill
- No charting library overhead (bundle size, complexity)
- Full control over styling (colors, stroke, gradient)
- Memoized for performance
- Perfect for "last 12 months" trend visualization

**Consequences:**
- Must manually implement hover/click interactions if needed later
- No built-in tooltips (not required by spec)

**References:**
- TASK_003_RESPONSE.md

---

### 2026-02-06 | ISR Revalidation Strategy

**Status:** Accepted

**Context:**
PROJECT_BRIEF requires daily auto-refresh for economic data.

**Options Considered:**
- **Option A:** On-demand ISR with time-based fallback
- **Option B:** Fixed 24h revalidation period
- **Option C:** Client-side polling with SWR

**Decision:** Fixed 24h revalidation (`export const revalidate = 86400`).

**Rationale:**
- Economic indicators update daily (FRED frequency)
- 24h cache aligns with data freshness requirements
- Vercel handles ISR automatically
- FRED API rate limit (120 req/min) protected by caching

**Consequences:**
- New data appears within 24 hours of FRED update
- Build output shows: `┌ ○ / 1d 1y` (1 day revalidate, 1 year expire)

**References:**
- TASK_004_RESPONSE.md
- PROJECT_BRIEF Success Criteria (#9)

---

### 2026-02-06 | Responsive Grid Layout

**Status:** Accepted

**Context:**
Dashboard must work on mobile (375px) and desktop (1440px+).

**Options Considered:**
- **Option A:** CSS Grid with media queries
- **Option B:** Flexbox with wrapping
- **Option C:** CSS Columns

**Decision:** CSS Grid with Tailwind breakpoints (`sm:grid-cols-2 lg:grid-cols-3`).

**Rationale:**
- Grid provides consistent card sizing
- Tailwind breakpoints cover target viewports
- Cards maintain aspect ratio across breakpoints
- Gap control with `gap-4`

**Consequences:**
- Mobile: 1 column
- Tablet (640px+): 2 columns
- Desktop (1024px+): 3 columns

**References:**
- TASK_004_RESPONSE.md
- TASK_005_qa_REPORT.md (validated)

---

### 2026-02-06 | Loading State Strategy

**Status:** Accepted

**Context:**
ISR fetch takes time; need UX for data loading.

**Options Considered:**
- **Option A:** Skeleton screens matching component dimensions
- **Option B:** Loading spinner
- **Option C:** Suspense fallback with minimal content

**Decision:** Skeleton screens with `Suspense` boundary.

**Rationale:**
- Skeletons maintain layout stability
- Users see expected structure while loading
- Matches shadcn/ui Skeleton component
- 6 LoadingCards in responsive grid

**Consequences:**
- Must create LoadingCard component matching IndicatorCard dimensions
- Suspense boundary wraps IndicatorGrid

**References:**
- TASK_003_RESPONSE.md (LoadingCard created)
- TASK_004_RESPONSE.md (app/loading.tsx created)

---

### 2026-02-06 | Badge Variant Extension

**Status:** Accepted

**Context:**
Indicator cards need color-coded change direction (green for positive, red for negative, gray for neutral).

**Options Considered:**
- **Option A:** Dynamic classes inline
- **Option B:** Additional shadcn/ui badge variant
- **Option C:** Custom Badge component

**Decision:** Added `success` variant to shadcn/ui Badge component.

**Rationale:**
- Consistent with shadcn/ui pattern
- Easy to extend (variants object)
- Matches existing component architecture

**Consequences:**
- Badge component now has: default, secondary, destructive, outline, success

**References:**
- TASK_003_RESPONSE.md

---

### 2026-02-06 | Mock Data Fallback Strategy

**Status:** Accepted

**Context:**
Development without FRED API key; build must succeed without `.env.local`.

**Options Considered:**
- **Option A:** Fail build if API key missing
- **Option B:** Use environment variable with default value
- **Option C:** Runtime check with mock data fallback

**Decision:** Runtime check for API key, `getMockData()` fallback.

**Rationale:**
- Build always succeeds
- Developers can work without API key
- Clear code path: `hasApiKey ? real : mock`
- Mock data matches Indicator type structure

**Consequences:**
- Development uses realistic mock data
- Production must have valid `FRED_API_KEY` for real data
- Clear indication when using mock data (via console or UI if needed)

**References:**
- TASK_002_RESPONSE.md (getMockData function)
- TASK_004_RESPONSE.md (fallback logic in page.tsx)

---

### 2026-02-06 | TypeScript Strict Mode Compliance

**Status:** Accepted

**Context:**
QA requirement: no `any` types in production code.

**Options Considered:**
- **Option A:** Allow `any` for rapid prototyping
- **Option B:** TypeScript strict mode with explicit types
- **Option C:** JSDoc with loose typing

**Decision:** Strict TypeScript with explicit types and interfaces.

**Rationale:**
- Code quality requirement from QA
- Catches errors at compile time
- Self-documenting code via types
- Industry best practice

**Consequences:**
- Must define all types (FredObservation, Indicator, YieldCurvePoint, etc.)
- No `any` escape hatch
- All utilities typed

**References:**
- TASK_005_qa_REPORT.md (validated: grep found no `any`)

---

## Change Log

| Date | Decision | Status |
|------|----------|--------|
| 2026-02-06 | Tech Stack Selection | Accepted |
| 2026-02-06 | Dark Theme Implementation | Accepted |
| 2026-02-06 | Project Directory Structure | Accepted |
| 2026-02-06 | shadcn/ui Component Management | Accepted |
| 2026-02-06 | FRED API Client Architecture | Accepted |
| 2026-02-06 | Indicator Configuration Strategy | Accepted |
| 2026-02-06 | Missing Data Handling | Accepted |
| 2026-02-06 | Sparkline Rendering Approach | Accepted |
| 2026-02-06 | ISR Revalidation Strategy | Accepted |
| 2026-02-06 | Responsive Grid Layout | Accepted |
| 2026-02-06 | Loading State Strategy | Accepted |
| 2026-02-06 | Badge Variant Extension | Accepted |
| 2026-02-06 | Mock Data Fallback Strategy | Accepted |
| 2026-02-06 | TypeScript Strict Mode | Accepted |
| 2026-02-06 | Recharts Selection for Complex Charts | Accepted |
| 2026-02-06 | Yield Curve Inversion Detection | Accepted |
| 2026-02-06 | Client/Server Component Split | Accepted |
| 2026-02-06 | Dynamic Routing with Static Generation | Accepted |
| 2026-02-06 | Responsive Chart Sizing | Accepted |
| 2026-02-06 | Vercel Deployment Configuration | Accepted |

---

## M2: Advanced Features Decisions

### 2026-02-06 | Recharts Selection for Complex Charts

**Status:** Accepted

**Context:**
Indicator cards use pure SVG sparklines (M1). Need more complex charts for yield curve and historical trends with tooltips, axes, and responsive sizing.

**Options Considered:**
- **Option A:** Recharts (React wrapper around D3)
- **Option B:** Tremor (React components built on Recharts)
- **Option C:** Chart.js with react-chartjs-2
- **Option D:** Pure D3.js
- **Option E:** Keep custom SVG approach

**Decision:** Recharts for complex charts, custom SVG for sparklines.

**Rationale:**
- Recharts is React-native and works well with Next.js Server Components
- Built-in responsive containers handle chart sizing
- Good TypeScript support
- Custom tooltips, axes, and gradients available
- Sparklines don't need axes/tooltids = lighter bundle
- Tremor would add another abstraction layer
- Previous project (CreditWatch) validated Recharts usage

**Consequences:**
- Must handle SSR (charts don't render during static generation)
- `ResponsiveContainer` needs fixed-height parent
- Gradient fills via `<defs>` in SVG
- Warning during build (expected): `width(-1) height(-1)` when no data

**References:**
- TASK_008_RESPONSE.md (yield curve chart)
- TASK_009_RESPONSE.md (trend chart)
- PROJECT_BRIEF Success Criteria (#2, #3)

---

### 2026-02-06 | Yield Curve Inversion Detection Logic

**Status:** Accepted

**Context:**
Yield curve chart needs to detect and display recession signals when short-term rates exceed long-term rates.

**Options Considered:**
- **Option A:** Calculate spread for each page load
- **Option B:** Pre-calculate during data fetch
- **Option C:** Store inversion status in database

**Decision:** Calculate spread during data fetch, store result in analysis object.

**Rationale:**
- Simple calculation: `longTermYield - shortTermYield`
- Negative = inverted (short-term > long-term)
- Spread value useful for display (e.g., "-0.24%")
- No database needed — calculated from FRED data
- Reusable function in `lib/yield-utils.ts`

**Inversion Logic:**
```typescript
// 2Y > 10Y = inverted (recession signal)
// 2Y = shortTerm, 10Y = longTerm
const isInverted = shortTermYield > longTermYield
const spread = longTermYield - shortTermYield
```

**Consequences:**
- Color-coded visualization (red=inverted, green=normal)
- Badge text changes: "INVERTED (Recession Signal)" vs "NORMAL"
- Spread displayed with sign (+/-)

**References:**
- TASK_008_RESPONSE.md
- TASK_013_qa_REPORT.md (validated)

---

### 2026-02-06 | Client/Server Component Split

**Status:** Accepted

**Context:**
Dashboard uses Server Components for data fetching (ISR). Detail pages need interactivity (timeframe selector, chart hover).

**Options Considered:**
- **Option A:** All interactive components as Client Components
- **Option B:** All components as Server Components with query params
- **Option C:** Hybrid: Server Components for data, Client Components for interactivity

**Decision:** Hybrid approach — Server Components for page + data fetching, Client Components for interactive charts.

**Component Architecture:**
```
app/page.tsx (Server)
├── Suspense → IndicatorGrid
│   └── IndicatorCard (Server → renders static)
├── YieldCurveSection
│   └── YieldCurveChart (Client → Recharts needs window)
└── Loading skeletons (Client)

app/indicator/[slug]/page.tsx (Server)
├── Suspense → IndicatorDetail (Client)
│   ├── TimeframeSelector (Client)
│   └── TrendChart (Client → Recharts)
```

**Rationale:**
- ISR requires Server Components for data fetching
- Recharts needs client-side hydration for tooltips/interactions
- Timeframe selector needs React state
- Keep client bundle small — only interactive parts

**Consequences:**
- `"use client"` directive on chart components
- Data fetched in Server Component, passed as props
- Charts render skeleton during SSR
- Build warning expected (charts have no dimensions during SSG)

**References:**
- TASK_009_RESPONSE.md (TrendChart client component)
- TASK_010_RESPONSE.md (IndicatorDetail client component)

---

### 2026-02-06 | Dynamic Routing with Static Generation

**Status:** Accepted

**Context:**
6 indicator detail pages need SEO and fast loading. Not all users will visit every page.

**Options Considered:**
- **Option A:** Fully dynamic (SSR on every request)
- **Option B:** Static Generation (SSG) for all pages
- **Option C:** Incremental Static Regeneration (ISR) with `generateStaticParams`

**Decision:** ISR with `generateStaticParams()` for pre-generation + 24h revalidation.

**Implementation:**
```typescript
// app/indicator/[slug]/page.tsx
export async function generateStaticParams() {
  return INDICATOR_SLUGS.map((slug) => ({ slug }))
}

export const revalidate = 86400 // ISR: regenerate every 24 hours
```

**Rationale:**
- Pre-generates all 6 pages at build time
- ISR allows updates without full rebuild
- 24h revalidation matches FRED data frequency
- SEO-friendly: each page has static HTML
- Fast: served from CDN, no runtime fetch

**Routes Generated:**
```
/indicator/cpi          (1d ISR)
/indicator/unemployment  (1d ISR)
/indicator/gdp          (1d ISR)
/indicator/fed-funds    (1d ISR)
/indicator/treasury-10y (1d ISR)
/indicator/treasury-2y  (1d ISR)
```

**Consequences:**
- All 6 pages built at deploy time
- Revalidated every 24 hours
- Invalid slug shows 404 (via `notFound()`)

**References:**
- TASK_010_RESPONSE.md
- TASK_013_qa_REPORT.md (all routes generated)

---

### 2026-02-06 | Responsive Chart Sizing

**Status:** Accepted

**Context:**
Charts need to render well on mobile (375px) and desktop (1440px+) with different container widths.

**Options Considered:**
- **Option A:** Fixed pixel dimensions
- **Option B:** Percentage-based with CSS
- **Option C:** Tailwind-responsive classes with `ResponsiveContainer`

**Decision:** Tailwind breakpoints + Recharts `ResponsiveContainer` with fixed-height values per breakpoint.

**Chart Height Strategy:**
| Viewport | Yield Curve | Trend Chart | Indicator Detail |
|----------|-------------|-------------|------------------|
| Mobile (default) | 220px | 250px | 250px |
| Tablet (sm) | 280px | 280px | 320px |
| Desktop (lg) | 320px | 300px | 380px |

**Implementation:**
```tsx
<ResponsiveContainer width="100%" height={height}>
  <LineChart data={data}>
```

```tsx
// Tailwind height class based on parent
<div className="h-[220px] sm:h-[280px] lg:h-[320px]">
```

**Rationale:**
- Fixed heights prevent layout shift during load
- Breakpoints scale appropriately with viewport
- ResponsiveContainer handles width dynamically
- Height values tested at 375px and 1440px

**Consequences:**
- No horizontal scroll at 375px
- Charts scale smoothly between breakpoints
- Y-axis labels remain readable on all viewports

**References:**
- TASK_011_RESPONSE.md
- TASK_013_qa_REPORT.md (responsive design validated)

---

### 2026-02-06 | Vercel Deployment Configuration

**Status:** Accepted

**Context:**
Project needs to deploy to Vercel with ISR, environment variables, and proper metadata.

**Options Considered:**
- **Option A:** Default Vercel configuration
- **Option B:** Edge runtime with custom caching
- **Option C:** Standard Next.js configuration with metadataBase

**Decision:** Standard Next.js with `metadataBase` and ISR.

**Changes Made:**
```typescript
// app/layout.tsx
const metadataBase = new URL("https://macropulse.app")
```

**Rationale:**
- `metadataBase` resolves OG image warnings
- Standard ISR works out of box on Vercel
- No additional configuration needed
- Environment variables handled via Vercel dashboard

**Files Updated:**
- `app/layout.tsx` — metadataBase added
- `.env.local.example` — FRED_API_KEY documented
- `README.md` — deployment instructions added

**Consequences:**
- OG images resolve correctly
- Build completes without metadata warnings
- Documentation for deployment

**References:**
- TASK_012_RESPONSE.md
- TASK_013_qa_REPORT.md (deployment readiness validated)

---

## Project Summary

### What Worked Well

1. **Hybrid Rendering Strategy**
   - Server Components for data fetching + ISR = fast initial loads
   - Client Components for interactivity = smooth user experience
   - Separating sparklines (SVG) from complex charts (Recharts) kept bundle small

2. **Centralized Configuration**
   - Single `INDICATORS` array made it easy to add/change indicators
   - Slug generation automatic from configuration
   - Mock data fallback seamless — same types throughout

3. **TypeScript Strict Mode**
   - Caught errors at compile time
   - Self-documenting code via interfaces
   - No `any` types meant reliable refactoring

4. **Responsive Mobile-First**
   - Default mobile styles, scale up with breakpoints
   - Fixed chart heights prevented layout shift
   - Touch targets met accessibility guidelines

5. **Component Architecture**
   - shadcn/ui provided accessible foundations
   - Recharts handled complex visualizations
   - Custom SVG sparklines were lightweight

### Key Learnings

1. **Recharts + SSR**: Charts need client-side hydration; build warnings about dimensions are expected and harmless.

2. **ISR + FRED API**: 24h revalidation aligns with FRED's data update frequency. Rate limits (120 req/min) are protected by caching.

3. **Static Generation + Dynamic Routes**: `generateStaticParams()` pre-builds all pages, but ISR ensures they stay fresh.

4. **Mock Data Strategy**: Runtime fallback enabled development without API keys while maintaining type safety.

5. **CSS Variables for Theming**: shadcn/ui's CSS variable approach made dark theme consistent across all components.

### Challenges Overcame

1. **No `src/` Directory**: Adjusted to root-level `app/` directory per requirements; shorter import paths as benefit.

2. **Manual shadcn/ui**: Avoided CLI for CI/CD compatibility; traded setup effort for version-control friendly components.

3. **Chart SSR Warnings**: Accepted Recharts dimension warnings during build; charts render correctly at runtime.

4. **Mobile Chart Sizing**: Found optimal heights for each viewport to balance information density and readability.

### Decisions That Paid Off

| Decision | Benefit |
|----------|---------|
| Server-side FRED API client | API key never exposed, ISR-compatible |
| Mock data fallback | Development without API key, build always succeeds |
| Hybrid client/server split | Fast initial load + interactive charts |
| ISR (24h) | Fresh data without hitting rate limits |
| Pure SVG sparklines | Lighter bundle than charting library |
| Tailwind breakpoints | Consistent responsive behavior |

### Decisions to Revisit (Future)

| Decision | Consideration |
|----------|---------------|
| Fixed chart heights | Consider responsive heights based on data density |
| Manual shadcn/ui | CLI might speed up adding new components |
| No database | For advanced features (alerts, historical analysis), database might help |
| Single API key | Multi-key rotation could handle high traffic |

### Statistics

| Metric | Value |
|--------|-------|
| Total decisions documented | 20 |
| M1 decisions | 14 |
| M2 decisions | 6 |
| Files created (M1 + M2) | ~25 components + utilities |
| Routes | 8 (/, /_not-found, 6 indicator pages) |
| ISR revalidation | 86400 seconds (24 hours) |
| QA checks passed | 56/56 (M1: 22, M2: 34) |

### Tech Stack Final

- **Framework:** Next.js 16.1.6 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + shadcn/ui
- **Charts:** Recharts + Custom SVG
- **Data:** FRED API + Mock fallback
- **Rendering:** Server Components + Client Components
- **Deployment:** Vercel with ISR
- **Type Safety:** Full TypeScript, no `any`

---

## Appendix

### Indicator Reference

| ID | Name | FRED Series | Frequency |
|----|------|------------|-----------|
| cpi | Consumer Price Index | CPIAUCSL | Monthly |
| unemployment | Unemployment Rate | UNRATE | Monthly |
| gdp | GDP Growth Rate | A191RL1Q225SBEA | Quarterly |
| fedfunds | Federal Funds Rate | FEDFUNDS | Monthly |
| dgs10 | 10-Year Treasury Yield | DGS10 | Daily |
| dgs2 | 2-Year Treasury Yield | DGS2 | Daily |

### Yield Curve Series

| Series | Maturity |
|--------|----------|
| DGS2 | 2-Year |
| DGS5 | 5-Year |
| DGS10 | 10-Year |
| DGS30 | 30-Year |

### Routes

| Route | Type | Revalidation |
|-------|------|--------------|
| `/` | ISR | 24h |
| `/indicator/[slug]` | ISR + SSG | 24h |
| `/_not-found` | Static | - |

### Acknowledgments

- **FRED:** Federal Reserve Economic Data (https://fred.stlouisfed.org)
- **shadcn/ui:** https://ui.shadcn.com
- **Recharts:** https://recharts.org
- **Tailwind CSS:** https://tailwindcss.com
- **Next.js:** https://nextjs.org

---

*Documented by: scribe*
*Last update: 2026-02-06*
