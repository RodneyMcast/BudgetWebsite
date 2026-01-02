import React from "react"

type ChartTone = "accent" | "cool" | "warm"

interface BarChartProps {
  data: number[]
  labels?: string[]
  tone?: ChartTone
}

export default function BarChart({ data, labels, tone = "accent" }: BarChartProps) {
  const max = Math.max(...data, 1)

  return (
    <div className={`bar-chart chart-${tone}`} role="img" aria-label="Bar chart">
      {data.map((value, index) => {
        const height = Math.round((value / max) * 100)
        return (
          <div key={`${index}-${value}`} className="bar-item">
            <div className="bar-track">
              <span className="bar-fill" style={{ height: `${height}%` }} />
            </div>
            {labels?.[index] && <span className="bar-label">{labels[index]}</span>}
          </div>
        )
      })}
    </div>
  )
}
