# TASK_011 — Responsive Design Polish

**Assigned to:** react-frontend-dev
**Project:** macro-pulse
**Project dir:** ~/Projects/macro-pulse
**Dependencies:** TASK_004, TASK_010 (both complete)

## Description

Audit and polish responsive layout across all pages for mobile (375px) and desktop (1440px).

## Requirements

1. **Audit all components** for responsive issues:
   - `indicator-grid.tsx` — verify grid breakpoints
   - `indicator-card.tsx` — card padding/text size on mobile
   - `yield-curve-section.tsx` — chart height on mobile
   - `indicator-detail.tsx` — detail page layout on mobile
   - `dashboard-header.tsx` — header text sizing
   - `trend-chart.tsx` — chart responsiveness

2. **Mobile fixes** (375px):
   - Cards: reduce padding if cramped
   - Charts: minimum height 200px, labels don't overlap
   - Header: stack elements vertically if needed
   - Timeframe selector: ensure buttons are tappable (min 44px)
   - Back button on detail page: visible and tappable

3. **Desktop polish** (1440px):
   - Max-width container (1280px or similar) to prevent over-stretching
   - Comfortable spacing between sections
   - Yield curve chart: good aspect ratio at full width

4. **General**:
   - No horizontal scrollbar at any viewport width
   - Font sizes: body >= 14px on mobile, headings scale appropriately
   - Consistent section spacing throughout

## Acceptance Criteria

- [ ] No horizontal scroll at 375px viewport
- [ ] All touch targets >= 44px on mobile
- [ ] Charts render cleanly at both 375px and 1440px
- [ ] Timeframe selector buttons tappable on mobile
- [ ] Max-width container prevents over-stretching on large screens
- [ ] `npm run build` succeeds with 0 errors

## Response

Write response to `~/Projects/macro-pulse/.tasks/TASK_011_react-frontend-dev_RESPONSE.md`.
