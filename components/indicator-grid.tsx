"use client"

import { useRouter } from "next/navigation"
import { Indicator } from "@/lib/types"
import { IndicatorCard } from "./indicator-card"

interface IndicatorGridProps {
  indicators: Indicator[]
}

export function IndicatorGrid({ indicators }: IndicatorGridProps) {
  const router = useRouter()

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {indicators.map((indicator) => (
        <IndicatorCard
          key={indicator.id}
          indicator={indicator}
          onClick={() => router.push(`/indicator/${indicator.id}`)}
        />
      ))}
    </div>
  )
}
