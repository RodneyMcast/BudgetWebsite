import React from "react"

type StatTone = "accent" | "warm" | "cool"

interface StatTileProps {
  label: string
  value: string
  helper?: string
  tone?: StatTone
}

export default function StatTile({ label, value, helper, tone }: StatTileProps) {
  const classes = ["stat-tile", tone ? `stat-${tone}` : ""].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
      {helper && <p className="stat-helper">{helper}</p>}
    </div>
  )
}
