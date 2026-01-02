import React from "react"
import { formatCurrencyRounded } from "../../utils/currency"
import type { DonutSegment } from "./DonutChart"

interface ChartLegendProps {
  items: DonutSegment[]
}

export default function ChartLegend({ items }: ChartLegendProps) {
  return (
    <div className="chart-legend">
      {items.map((item) => (
        <div key={item.label} className="legend-item">
          <span className={`legend-dot legend-${item.tone}`} />
          <span className="legend-label">{item.label}</span>
          <span className="legend-value">{formatCurrencyRounded(item.value)}</span>
        </div>
      ))}
    </div>
  )
}
