import React, { useMemo } from "react"
import { useBudget } from "../../budget/BudgetProvider"
import type { AppTab } from "../../App"
import { formatCurrency, formatCurrencyRounded } from "../../utils/currency"
import { formatLongDate, formatMonthYear } from "../../utils/date"
import Card from "../ui/Card"
import StatTile from "../ui/StatTile"
import AppTopBar from "./AppTopBar"
import QuickActions from "./QuickActions"

interface AppHeaderProps {
  activeTab: AppTab
  onTabChange: (tab: AppTab) => void
  onQuickAction: (action: "add" | "transfer" | "budgets") => void
}

const sectionLinks = [
  { id: "overview", label: "Overview" },
  { id: "patterns", label: "Patterns" },
  { id: "planning", label: "Planning" },
  { id: "activity", label: "Activity" },
]

export default function AppHeader({ activeTab, onTabChange, onQuickAction }: AppHeaderProps) {
  const { totals, state } = useBudget()
  const latestDate = useMemo(
    () =>
      state.transactions.reduce((latest, tx) => {
        if (!latest) return tx.date
        return tx.date > latest ? tx.date : latest
      }, ""),
    [state.transactions],
  )

  const metaLine = useMemo(() => {
    const activityLabel = state.transactions.length ? `${state.transactions.length} payments` : "No payments yet"
    const lastUpdatedLabel = latestDate ? formatLongDate(latestDate) : "today"
    return `${formatMonthYear()} | ${activityLabel} | EUR | Updated ${lastUpdatedLabel}`
  }, [latestDate, state.transactions.length])

  const stats = [
    { label: "Balance", value: formatCurrencyRounded(totals.balance), helper: "Net position", tone: "accent" as const },
    { label: "Income", value: formatCurrencyRounded(totals.income), helper: "Total in", tone: "cool" as const },
    { label: "Expense", value: formatCurrencyRounded(totals.expense), helper: "Total out", tone: "warm" as const },
  ]

  return (
    <header className="app-header">
      <AppTopBar activeTab={activeTab} onTabChange={onTabChange} sections={sectionLinks} />
      <div className="header-intro">
        <div className="header-top">
          <div>
            <p className="eyebrow">Personal wallet</p>
            <h1>Budget workspace</h1>
          </div>
          <div className="avatar-chip">RB</div>
        </div>
        <div className="header-balance">
          <p className="muted">Total balance</p>
          <h2 className="balance-hero">{formatCurrency(totals.balance)}</h2>
          <p className="meta-line">{metaLine}</p>
        </div>
      </div>

      <Card as="div" variant="soft" className="header-panel">
        <QuickActions onAction={onQuickAction} />
        <div className="stat-grid">
          {stats.map((stat) => (
            <StatTile key={stat.label} label={stat.label} value={stat.value} helper={stat.helper} tone={stat.tone} />
          ))}
        </div>
      </Card>
    </header>
  )
}
