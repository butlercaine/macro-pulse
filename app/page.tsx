import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { IndicatorGrid } from "@/components/indicator-grid"
import { YieldCurveSection } from "@/components/yield-curve-section"
import { LoadingCard } from "@/components/loading-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllIndicators, getYieldCurve, getMockData } from "@/lib/data"

// ISR: Revalidate every 24 hours
export const revalidate = 86400

// Static generation with ISR
export const dynamicParams = true

async function DashboardContent() {
  let indicators
  let yieldCurve
  let error: Error | null = null

  try {
    const hasApiKey = !!process.env.FRED_API_KEY && process.env.FRED_API_KEY !== "your_fred_api_key_here"
    
    if (hasApiKey) {
      const [indicatorsResult, yieldCurveResult] = await Promise.all([
        getAllIndicators(),
        getYieldCurve(),
      ])
      indicators = indicatorsResult
      yieldCurve = yieldCurveResult
    } else {
      const mockData = getMockData()
      indicators = mockData.indicators
      yieldCurve = mockData.yieldCurve
    }
  } catch (e) {
    error = e instanceof Error ? e : new Error("Failed to fetch data")
    const mockData = getMockData()
    indicators = mockData.indicators
    yieldCurve = mockData.yieldCurve
  }

  const lastUpdated = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader lastUpdated={lastUpdated} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
        {error && (
          <div className="mb-6 p-3 sm:p-4 rounded-lg border border-yellow-500/50 bg-yellow-500/10">
            <p className="text-xs sm:text-sm text-yellow-500">
              ⚠️ Unable to fetch live data: {error.message}. Showing cached/mock data.
            </p>
          </div>
        )}
        
        <section className="mb-8 sm:mb-10">
          <h2 className="text-base sm:text-lg font-semibold mb-4">Key Indicators</h2>
          <IndicatorGrid indicators={indicators} />
        </section>

        <section className="max-w-4xl">
          <YieldCurveSection data={yieldCurve} />
        </section>
      </div>
      
      <footer className="border-t py-6 sm:py-8 mt-10 sm:mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center text-xs sm:text-sm text-muted-foreground">
          <p>Data provided by Federal Reserve Economic Data (FRED)</p>
          <p className="mt-1">
            Next update in {Math.floor(86400 / 60 / 60)} hours
          </p>
        </div>
      </footer>
    </main>
  )
}

function LoadingSkeleton() {
  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
        <section className="mb-8 sm:mb-10">
          <h2 className="text-base sm:text-lg font-semibold mb-4">Key Indicators</h2>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <LoadingCard key={i} title="Loading..." />
            ))}
          </div>
        </section>
        <section className="max-w-4xl">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg font-semibold">US Treasury Yield Curve</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[220px] sm:h-[280px] flex items-center justify-center">
                <LoadingCard title="Loading yield curve..." />
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <DashboardContent />
    </Suspense>
  )
}
