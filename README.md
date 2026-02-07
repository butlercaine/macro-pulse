# Macro Pulse

A real-time US economic health dashboard built with Next.js, displaying key macroeconomic indicators from the Federal Reserve Economic Data (FRED).

![Macro Pulse Dashboard](public/og-image.png)

## Features

- **6 Key Economic Indicators**: CPI (Inflation), Unemployment Rate, GDP Growth Rate, Federal Funds Rate, 10-Year Treasury Yield, 2-Year Treasury Yield
- **US Treasury Yield Curve**: Interactive chart with real-time inversion detection (2Y-10Y spread)
- **Historical Trend Charts**: View up to 40 years of data with 1Y/5Y/10Y/Max timeframes
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark Mode**: Sleek dark theme by default
- **Incremental Static Regeneration**: Data refreshes every 24 hours

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **Data**: FRED API (Federal Reserve Economic Data)

## Getting Started

### Prerequisites

- Node.js 18+
- FRED API Key (free from [fred.stlouisfed.org](https://fred.stlouisfed.org/docs/api/api_key.html))

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd macro-pulse

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Add your FRED API key to .env.local
# Edit .env.local and replace 'your_fred_api_key_here' with your actual key

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `FRED_API_KEY` | Your free FRED API key | No (uses mock data without key) |

Get your free API key at: [fred.stlouisfed.org/docs/api/api_key.html](https://fred.stlouisfed.org/docs/api/api_key.html)

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=<your-repo-url>)

1. Connect your GitHub repository
2. Add `FRED_API_KEY` environment variable (optional - works without it)
3. Click Deploy

### Manual Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production deployment
vercel --prod
```

### Docker

```bash
# Build the image
docker build -t macro-pulse .

# Run the container
docker run -p 3000:3000 macro-pulse
```

## Project Structure

```
macro-pulse/
├── app/
│   ├── page.tsx              # Main dashboard page
│   ├── layout.tsx            # Root layout with metadata
│   ├── loading.tsx           # Loading skeleton
│   └── indicator/[slug]/      # Dynamic indicator detail pages
├── components/
│   ├── dashboard-header.tsx  # App header
│   ├── indicator-card.tsx     # Indicator display card
│   ├── indicator-grid.tsx     # Responsive grid layout
│   ├── indicator-detail.tsx   # Detail page component
│   ├── sparkline.tsx         # Mini trend chart
│   ├── trend-chart.tsx       # Historical trend chart
│   ├── yield-curve-chart.tsx  # Treasury yield curve
│   ├── yield-curve-section.tsx # Yield curve wrapper
│   └── timeframe-selector.tsx # 1Y/5Y/10Y/Max selector
├── lib/
│   ├── fred-api.ts           # FRED API client
│   ├── data.ts               # Data fetching layer
│   ├── indicators.ts         # Indicator configurations
│   ├── types.ts              # TypeScript interfaces
│   └── utils.ts              # Utility functions
└── public/                   # Static assets
```

## Available Indicators

| Indicator | Series ID | Frequency |
|-----------|-----------|------------|
| Consumer Price Index | CPIAUCSL | Monthly |
| Unemployment Rate | UNRATE | Monthly |
| GDP Growth Rate | A191RL1Q225SBEA | Quarterly |
| Federal Funds Rate | FEDFUNDS | Monthly |
| 10-Year Treasury Yield | DGS10 | Daily |
| 2-Year Treasury Yield | DGS2 | Daily |

## FRED API

This project uses the [Federal Reserve Economic Data (FRED)](https://fred.stlouisfed.org/) API.

- **Free Tier**: 120 requests/day
- **API Documentation**: [fred.stlouisfed.org/docs/api/fred/](https://fred.stlouisfed.org/docs/api/fred/)

Without an API key, the dashboard uses mock data for demonstration purposes.

## License

MIT License - see LICENSE file for details.

## Acknowledgments

- [FRED](https://fred.stlouisfed.org/) for providing free economic data
- [Vercel](https://vercel.com/) for excellent Next.js documentation
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
