import React from "react"
import type { AppTab } from "../../App"

const tabs: { id: AppTab; label: string; helper: string }[] = [
  { id: "dashboard", label: "Dashboard", helper: "Overview" },
  { id: "add", label: "Add", helper: "New payment" },
  { id: "history", label: "History", helper: "All payments" },
]

interface BottomNavProps {
  active: AppTab
  onChange: (tab: AppTab) => void
}

export default function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-btn ${active === tab.id ? "is-active" : ""}`}
          onClick={() => onChange(tab.id)}
          type="button"
        >
          <span className="nav-icon" data-icon={tab.id} aria-hidden="true" />
          <span className="nav-label">{tab.label}</span>
          <small>{tab.helper}</small>
        </button>
      ))}
    </nav>
  )
}
