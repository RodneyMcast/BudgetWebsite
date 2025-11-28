import React from "react"
import type { AppTab } from "../../App"

const tabs: { id: AppTab; label: string; helper: string }[] = [
  { id: "dashboard", label: "Dashboard", helper: "Overview" },
  { id: "add", label: "Add", helper: "New entry" },
  { id: "history", label: "History", helper: "Full log" },
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
          <span>{tab.label}</span>
          <small>{tab.helper}</small>
        </button>
      ))}
    </nav>
  )
}
