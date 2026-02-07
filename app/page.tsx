import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { IndicatorGrid } from "@/components/indicator-grid"
import { LoadingCard } from "@/components/loading-card"
import { getAllIndicators, getMockData } from "@/lib/data"

// ISR: Revalidate every 24 hours
export const revalidate = 86400

// Static generation with ISR
export const dynamicParams = true

async function DashboardContent() {
  // Try to fetch real data, fall back to mock if no API key
  let indicators
  let error: Error | null = null

  try {
    // Check if we have an API key
    const hasApiKey = !!process.env.FRED_API_KEY && process.env.FRED_API_KEY !== "your_fred_api_key_here"
    
    if (hasApiKey) {
      indicators = await getAllIndicators()
    } else {
      // Use mock data when no API key is configured
      const mockData = getMockData()
      indicators = mockData.indicators
    }
  } catch (e) {
    error = e instanceof Error ? e : new Error("Failed to fetch data")
    // Fall back to mock data on error
    const mockData = getMockData()
    indicators = mockData.indicators
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
      
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 rounded-lg border border-yellow-500/50 bg-yellow-500/10">
            <p className="text-sm text-yellow-500">
              ⚠️ Unable to fetch live data: {error.message}. Showing cached/mock data.
            </p>
          </div>
        )}
        
        <section>
          <h2 className="text-lg font-semibold mb-4">Key Indicators</h2>
          <IndicatorGrid indicators={indicators} />
        </section>
      </div>
      
      <footer className="border-t py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Data provided by Federal Reserve Economic Data (FRED)</p>
          <p className="mt-1">
            Next update in {Math.floor(86400 / 60 / 60)} hours
          </p>
        </div>
      </footer>
    </main>
  )
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-background">
          <DashboardHeader />
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-lg font-semibold mb-4">Key Indicators</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <LoadingCard key={i} title="Loading..." />
              ))}
            </div>
          </div>
        </main>
      }
    >
      <DashboardContent />
    </Suspense>
  )
}
