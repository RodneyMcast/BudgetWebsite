import React from "react"

type ChartTone = "accent" | "cool" | "warm" | "neutral"

export interface DonutSegment {
  label: string
  value: number
  tone: ChartTone
}

interface DonutChartProps {
  segments: DonutSegment[]
  centerLabel?: string
  centerValue?: string
}

export default function DonutChart({ segments, centerLabel, centerValue }: DonutChartProps) {
  const radius = 32
  const strokeWidth = 12
  const circumference = 2 * Math.PI * radius
  const total = segments.reduce((sum, segment) => sum + segment.value, 0)

  let offset = 0

  return (
    <div className="donut-wrap">
      <svg viewBox="0 0 100 100" className="donut">
        <circle
          className="donut-base"
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
        />
        {segments.map((segment) => {
          const fraction = total ? segment.value / total : 0
          const dash = `${fraction * circumference} ${circumference}`
          const circle = (
            <circle
              key={segment.label}
              className={`donut-segment donut-${segment.tone}`}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              strokeWidth={strokeWidth}
              strokeDasharray={dash}
              strokeDashoffset={-offset}
            />
          )
          offset += fraction * circumference
          return circle
        })}
      </svg>
      <div className="donut-center">
        <div className="donut-inner">
          {centerLabel && <p className="donut-label">{centerLabel}</p>}
          {centerValue && <p className="donut-value">{centerValue}</p>}
        </div>
      </div>
    </div>
  )
}
