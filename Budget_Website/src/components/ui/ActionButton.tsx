import React from "react"

interface ActionButtonProps {
  label: string
  helper: string
  icon: "add" | "transfer" | "chart"
  onClick?: () => void
}

export default function ActionButton({ label, helper, icon, onClick }: ActionButtonProps) {
  return (
    <button type="button" className="action-btn" onClick={onClick}>
      <span className="action-icon" data-icon={icon} aria-hidden="true" />
      <span className="action-label">{label}</span>
      <span className="action-helper">{helper}</span>
    </button>
  )
}
