# TASK_005 — M1 QA Validation

**Assigned to:** qa-engineer
**Project:** macro-pulse
**Project dir:** ~/Projects/macro-pulse
**Dependencies:** TASK_002, TASK_004 (both complete)

## Description

Validate all Milestone 1 deliverables against the project's success criteria.

## Validation Checklist

Run each check and report pass/fail:

### Build Verification
- [ ] `npm run build` completes with 0 errors
- [ ] `npm run dev` starts without errors (quick check, then Ctrl+C)

### Code Quality
- [ ] TypeScript strict mode — no `any` types in production code (lib/, components/, app/)
- [ ] No unused imports or variables
- [ ] All files have proper exports

### Functional Requirements
- [ ] 6 FRED indicators are configured in `lib/indicators.ts` (CPIAUCSL, UNRATE, A191RL1Q225SBEA, FEDFUNDS, DGS10, DGS2)
- [ ] API client (`lib/fred-api.ts`) filters null values (value=".")
- [ ] Mock data fallback works when FRED_API_KEY is not set
- [ ] `getAllIndicators()` returns array of 6 Indicator objects
- [ ] `getYieldCurve()` returns array of 4 YieldCurvePoint objects
- [ ] Dashboard page (`app/page.tsx`) renders indicator grid
- [ ] IndicatorCard shows: title, value, change direction, sparkline, last updated
- [ ] Sparkline component renders SVG from data array
- [ ] Loading skeletons display (check `app/loading.tsx` exists)

### ISR Configuration
- [ ] `export const revalidate = 86400` (or equivalent) set on main page
- [ ] Build output shows revalidation period

### Responsive Layout
- [ ] Grid renders 1 column on mobile (check CSS classes for < 640px)
- [ ] Grid renders 2 columns on tablet (640-1024px)
- [ ] Grid renders 3 columns on desktop (> 1024px)

### Metadata
- [ ] Page title set to "Macro Pulse" (or similar)
- [ ] Description set
- [ ] Layout has proper metadata export

## Report

Write your QA report to `~/Projects/macro-pulse/.tasks/TASK_005_qa_REPORT.md` with:
- Overall: PASS / CONDITIONAL PASS / FAIL
- Each check: pass/fail with evidence
- Issues found (if any) with severity
- Recommendations
