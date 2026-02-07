import { DashboardHeader } from "@/components/dashboard-header"
import { LoadingCard } from "@/components/loading-card"

export default function Loading() {
  return (
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
  )
}
