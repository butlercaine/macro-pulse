"use client"

import { memo } from "react"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkline } from "./sparkline"
import type { Indicator } from "@/lib/types"
import { formatValue, getRelativeTime } from "@/lib/utils"

interface IndicatorCardProps {
  /** The indicator data to display */
  indicator: Indicator
  /** Optional click handler */
  onClick?: () => void
  /** Optional custom color override */
  color?: string
}

/**
 * Indicator Card Component
 * Displays a macroeconomic indicator with current value, change, and sparkline
 */
function IndicatorCardComponent({
  indicator,
  onClick,
  color,
}: IndicatorCardProps) {
  const isPositive = indicator.changeDirection === "up"
  const isNegative = indicator.changeDirection === "down"
  const isFlat = indicator.changeDirection === "flat"

  // Determine arrow icon and badge variant
  const ArrowIcon = isPositive
    ? ArrowUpRight
    : isNegative
    ? ArrowDownRight
    : Minus

  const badgeVariant: "default" | "success" | "destructive" | "secondary" | "outline" | undefined =
    isPositive
      ? "success"
      : isNegative
      ? "destructive"
      : "outline"

  // Use indicator color or default
  const sparklineColor = color || "#3b82f6"

  return (
    <Card
      className={`
        cursor-pointer transition-all duration-200
        hover:shadow-lg hover:scale-[1.02]
        active:scale-[0.98]
        ${onClick ? "cursor-pointer" : ""}
      `}
      onClick={onClick}
    >
      <CardContent className="p-4">
        {/* Header: Title and change badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground font-medium">
            {indicator.name}
          </span>
          <Badge variant={badgeVariant} className="flex items-center gap-1">
            <ArrowIcon className="w-3 h-3" />
            {Math.abs(indicator.changePercent).toFixed(2)}%
          </Badge>
        </div>

        {/* Value display */}
        <div className="mb-3">
          <div className="text-2xl font-bold tracking-tight">
            {formatValue(indicator.currentValue, indicator.unit)}
          </div>
          <div
            className={`
              text-xs
              ${isPositive ? "text-emerald-500" : ""}
              ${isNegative ? "text-red-500" : ""}
              ${isFlat ? "text-muted-foreground" : ""}
            `}
          >
            {isPositive && "+"}
            {indicator.changePercent.toFixed(2)}% from previous
          </div>
        </div>

        {/* Sparkline */}
        {indicator.sparklineData.length > 0 && (
          <div className="flex justify-start mb-3">
            <Sparkline
              data={indicator.sparklineData}
              width={100}
              height={32}
              color={sparklineColor}
              strokeWidth={1.5}
            />
          </div>
        )}

        {/* Footer: Last updated */}
        <div className="text-xs text-muted-foreground">
          Updated {getRelativeTime(indicator.lastUpdated)}
        </div>
      </CardContent>
    </Card>
  )
}

export const IndicatorCard = memo(IndicatorCardComponent)
