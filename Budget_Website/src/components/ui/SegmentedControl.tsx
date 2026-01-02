import React from "react"

interface SegmentedOption {
  value: string
  label: string
}

interface SegmentedControlProps {
  value: string
  options: SegmentedOption[]
  onChange: (value: string) => void
  size?: "default" | "small"
}

export default function SegmentedControl({
  value,
  options,
  onChange,
  size = "default",
}: SegmentedControlProps) {
  const classes = ["segmented", size === "small" ? "segmented-small" : ""].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`segmented-btn ${value === option.value ? "is-active" : ""}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
