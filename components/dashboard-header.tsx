"use client"

import { Activity } from "lucide-react"

interface DashboardHeaderProps {
  lastUpdated?: string
}

export function DashboardHeader({ lastUpdated }: DashboardHeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Activity className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Macro Pulse</h1>
              <p className="text-sm text-muted-foreground">
                US Economic Health Dashboard
              </p>
            </div>
          </div>
          
          {lastUpdated && (
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Last updated</p>
              <p className="text-sm font-medium">{lastUpdated}</p>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
