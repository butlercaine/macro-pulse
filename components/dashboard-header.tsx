"use client"

import { Activity } from "lucide-react"

interface DashboardHeaderProps {
  lastUpdated?: string
}

export function DashboardHeader({ lastUpdated }: DashboardHeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary shrink-0">
              <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight">Macro Pulse</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                US Economic Health Dashboard
              </p>
            </div>
          </div>
          
          {lastUpdated && (
            <div className="text-left sm:text-right">
              <p className="text-[10px] sm:text-xs text-muted-foreground">Last updated</p>
              <p className="text-xs sm:text-sm font-medium">{lastUpdated}</p>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
