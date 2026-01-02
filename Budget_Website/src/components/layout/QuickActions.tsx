import React from "react"
import ActionButton from "../ui/ActionButton"

type QuickActionId = "add" | "transfer" | "budgets"

interface QuickActionsProps {
  onAction: (action: QuickActionId) => void
}

const actions: { id: QuickActionId; label: string; helper: string; icon: "add" | "transfer" | "chart" }[] = [
  { id: "add", label: "Add", helper: "Payment", icon: "add" },
  { id: "transfer", label: "Transfer", helper: "Between pots", icon: "transfer" },
  { id: "budgets", label: "Budgets", helper: "Planner", icon: "chart" },
]

export default function QuickActions({ onAction }: QuickActionsProps) {
  return (
    <div className="quick-actions">
      {actions.map((action) => (
        <ActionButton
          key={action.label}
          label={action.label}
          helper={action.helper}
          icon={action.icon}
          onClick={() => onAction(action.id)}
        />
      ))}
    </div>
  )
}
