import React, { useId } from "react"

type ChartTone = "accent" | "cool" | "warm"

interface LineChartProps {
  data: number[]
  tone?: ChartTone
}

export default function LineChart({ data, tone = "accent" }: LineChartProps) {
  const gradientId = useId()
  const safeData = data.length >= 2 ? data : [0, ...(data.length === 1 ? data : [0])]
  const width = 100
  const height = 40
  const max = Math.max(...safeData, 1)
  const min = Math.min(...safeData, 0)
  const range = max - min || 1

  const points = safeData
    .map((value, index) => {
      const x = (index / (safeData.length - 1)) * width
      const y = height - ((value - min) / range) * height
      return `${x},${y}`
    })
    .join(" ")

  const areaPoints = `0,${height} ${points} ${width},${height}`

  return (
    <svg className={`chart-line chart-${tone}`} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`line-fill-${gradientId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#line-fill-${gradientId})`} />
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}
