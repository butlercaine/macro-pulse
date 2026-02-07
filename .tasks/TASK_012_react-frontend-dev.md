# TASK_012 — Vercel Deployment Configuration

**Assigned to:** react-frontend-dev
**Project:** macro-pulse
**Project dir:** ~/Projects/macro-pulse
**Dependencies:** TASK_011 (complete)

## Description

Configure the project for Vercel deployment and update the README with deployment instructions.

## Requirements

### 1. Next.js Config
- Ensure `next.config.mjs` (or .js/.ts) is properly configured for Vercel:
  - No special config needed for standard Vercel deployment
  - ISR works automatically on Vercel
  - Images config if using next/image (probably not needed)

### 2. Environment Variables Documentation
- Update `.env.local.example` to be clear:
  ```
  # Get your free API key at https://fred.stlouisfed.org/docs/api/api_key.html
  FRED_API_KEY=your_api_key_here
  ```

### 3. README.md
Update (or create) `~/Projects/macro-pulse/README.md` with:
- Project title and description
- Screenshot placeholder
- Features list (6 indicators, yield curve, historical charts)
- Tech stack
- Getting started (local development):
  - Clone, install, get FRED API key, create .env.local, run dev
- Deploy to Vercel:
  - One-click deploy button (Vercel deploy link format)
  - Or manual: connect GitHub repo, add FRED_API_KEY env var, deploy
- FRED API setup instructions
- License (MIT)

### 4. Metadata
- Set `metadataBase` in `app/layout.tsx` to avoid the build warning
- Use a placeholder URL or just remove OG image references if not needed

### 5. Build Verification
- Run `npm run build` one final time
- Verify all routes generate correctly
- Check for any warnings that should be addressed

## Acceptance Criteria

- [ ] README.md with setup and deployment instructions
- [ ] `.env.local.example` with FRED API key instructions
- [ ] `metadataBase` warning resolved
- [ ] `npm run build` succeeds with 0 errors and minimal warnings
- [ ] All 8 routes generate (/, 6 indicator pages, /_not-found)

## Response

Write response to `~/Projects/macro-pulse/.tasks/TASK_012_react-frontend-dev_RESPONSE.md`.
