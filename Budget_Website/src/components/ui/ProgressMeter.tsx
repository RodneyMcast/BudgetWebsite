import React from "react"

type MeterTone = "accent" | "warm" | "cool"

interface ProgressMeterProps {
  value: number
  tone?: MeterTone
}

export default function ProgressMeter({ value, tone }: ProgressMeterProps) {
  const safeValue = Number.isFinite(value) ? Math.min(100, Math.max(0, Math.round(value))) : 0
  const classes = ["meter", tone ? `meter-${tone}` : ""].filter(Boolean).join(" ")

  return (
    <div className={classes} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={safeValue}>
      <span style={{ width: `${safeValue}%` }} />
    </div>
  )
}
