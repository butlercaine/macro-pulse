"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface LoadingCardProps {
  /** Title to display in skeleton */
  title?: string
}

/**
 * Loading Card Component
 * Shows a skeleton placeholder while data is loading
 * Matches dimensions of IndicatorCard
 */
function LoadingCard({ title = "Loading..." }: LoadingCardProps) {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-4">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        {/* Value skeleton */}
        <div className="mb-3">
          <Skeleton className="h-8 w-20 mb-1" />
          <Skeleton className="h-3 w-28" />
        </div>

        {/* Sparkline skeleton */}
        <div className="mb-3">
          <Skeleton className="h-8 w-28 rounded" />
        </div>

        {/* Footer skeleton */}
        <Skeleton className="h-3 w-20" />
      </CardContent>
    </Card>
  )
}

export { LoadingCard }
