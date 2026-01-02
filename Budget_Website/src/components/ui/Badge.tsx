import React from "react"

type BadgeTone = "neutral" | "positive" | "negative" | "accent" | "warm" | "cool"

interface BadgeProps {
  tone?: BadgeTone
  className?: string
  children: React.ReactNode
}

export default function Badge({ tone = "neutral", className = "", children }: BadgeProps) {
  const classes = ["badge", `badge-${tone}`, className].filter(Boolean).join(" ")
  return <span className={classes}>{children}</span>
}
