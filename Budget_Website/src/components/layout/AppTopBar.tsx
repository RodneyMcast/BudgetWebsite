import React, { useMemo, useState } from "react"
import type { AppTab } from "../../App"

interface SectionLink {
  id: string
  label: string
}

interface AppTopBarProps {
  activeTab: AppTab
  onTabChange: (tab: AppTab) => void
  sections?: SectionLink[]
}

const tabLinks: { id: AppTab; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "add", label: "Add payment" },
  { id: "history", label: "History" },
]

export default function AppTopBar({ activeTab, onTabChange, sections }: AppTopBarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuSections = useMemo(() => {
    if (activeTab !== "dashboard") return []
    return sections || []
  }, [activeTab, sections])

  const handleTabChange = (tab: AppTab) => {
    onTabChange(tab)
    setIsOpen(false)
  }

  return (
    <div className="top-bar-wrap">
      <div className="top-bar">
        <button
          type="button"
          className="icon-btn"
          aria-label="Open menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
        >
          <span className="burger" aria-hidden="true" />
        </button>
        <div className="top-bar-title">Budget</div>
        <button type="button" className="icon-btn" aria-label="Quick add" onClick={() => handleTabChange("add")}>
          <span className="plus" aria-hidden="true" />
        </button>
      </div>

      <div
        className={`top-menu ${isOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        <div className="top-menu-panel">
          <div className="top-menu-header">
            <p className="eyebrow">Menu</p>
            <button type="button" className="ghost" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>

          <div className="menu-group">
            <p className="menu-label">Navigate</p>
            <div className="menu-grid">
              {tabLinks.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`menu-item ${activeTab === tab.id ? "is-active" : ""}`}
                  onClick={() => handleTabChange(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {menuSections.length > 0 && (
            <div className="menu-group">
              <p className="menu-label">Sections</p>
              <div className="menu-grid">
                {menuSections.map((section) => (
                  <a key={section.id} className="menu-item" href={`#${section.id}`} onClick={() => setIsOpen(false)}>
                    {section.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        <button type="button" className="top-menu-backdrop" onClick={() => setIsOpen(false)} aria-label="Close menu" />
      </div>
    </div>
  )
}
