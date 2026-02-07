// Indicator Configuration for FRED Series
// All 6 primary indicators plus additional series for yield curve

import { IndicatorConfig } from "./types";

export const INDICATORS: IndicatorConfig[] = [
  // Primary Dashboard Indicators
  {
    id: "cpi",
    name: "Consumer Price Index",
    seriesId: "CPIAUCSL",
    unit: "Index",
    frequency: "Monthly",
    showAsCard: true,
    color: "#3b82f6", // blue
  },
  {
    id: "unemployment",
    name: "Unemployment Rate",
    seriesId: "UNRATE",
    unit: "%",
    frequency: "Monthly",
    showAsCard: true,
    color: "#ef4444", // red
  },
  {
    id: "gdp",
    name: "GDP Growth Rate",
    seriesId: "A191RL1Q225SBEA",
    unit: "%",
    frequency: "Quarterly",
    showAsCard: true,
    color: "#22c55e", // green
  },
  {
    id: "fedfunds",
    name: "Federal Funds Rate",
    seriesId: "FEDFUNDS",
    unit: "%",
    frequency: "Monthly",
    showAsCard: true,
    color: "#8b5cf6", // purple
  },
  {
    id: "dgs10",
    name: "10-Year Treasury Yield",
    seriesId: "DGS10",
    unit: "%",
    frequency: "Daily",
    showAsCard: true,
    color: "#f59e0b", // amber
  },
  {
    id: "dgs2",
    name: "2-Year Treasury Yield",
    seriesId: "DGS2",
    unit: "%",
    frequency: "Daily",
    showAsCard: true,
    color: "#ec4899", // pink
  },
  // Additional series for yield curve (not displayed as cards)
  {
    id: "dgs5",
    name: "5-Year Treasury Yield",
    seriesId: "DGS5",
    unit: "%",
    frequency: "Daily",
    showAsCard: false,
    color: "#06b6d4", // cyan
  },
  {
    id: "dgs30",
    name: "30-Year Treasury Yield",
    seriesId: "DGS30",
    unit: "%",
    frequency: "Daily",
    showAsCard: false,
    color: "#84cc16", // lime
  },
];

/** Series IDs for main dashboard indicator cards */
export const INDICATOR_CARD_IDS = INDICATORS.filter((i) => i.showAsCard).map((i) => i.id);

/** Series IDs for yield curve chart */
export const YIELD_CURVE_SERIES_IDS = INDICATORS.filter((i) => 
  ["dgs2", "dgs5", "dgs10", "dgs30"].includes(i.id)
).map((i) => i.seriesId);

/** Map from series ID to indicator config */
export const SERIES_ID_TO_CONFIG = new Map(
  INDICATORS.map((config) => [config.seriesId, config])
);

/** Get indicator config by internal ID */
export function getIndicatorById(id: string): IndicatorConfig | undefined {
  return INDICATORS.find((i) => i.id === id);
}

/** Get indicator config by FRED series ID */
export function getIndicatorBySeriesId(seriesId: string): IndicatorConfig | undefined {
  return SERIES_ID_TO_CONFIG.get(seriesId);
}
