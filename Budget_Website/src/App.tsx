import React, { useState } from "react"
import Dashboard from "./components/dashboard/Dashboard"
import AppHeader from "./components/layout/AppHeader"
import BottomNav from "./components/navigation/BottomNav"
import AddWorkspace from "./components/planning/AddWorkspace"
import TransactionHistory from "./components/transactions/TransactionHistory"
import type { TransactionType } from "./budget/types"

export type AppTab = "dashboard" | "add" | "history"
type AddMode = "payment" | "plan" | "bill" | "goal"

type TransactionPreset = {
  type?: TransactionType
  category?: string
  description?: string
  amount?: string
  date?: string
}

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>("dashboard")
  const [quickPreset, setQuickPreset] = useState<TransactionPreset | null>(null)
  const [addMode, setAddMode] = useState<AddMode>("payment")

  const handleTabChange = (tab: AppTab) => {
    setActiveTab(tab)
    if (tab === "add") {
      setQuickPreset(null)
      setAddMode("payment")
    }
  }

  const handleQuickAction = (action: "add" | "transfer" | "budgets") => {
    if (action === "add") {
      setQuickPreset(null)
      setAddMode("payment")
      setActiveTab("add")
      return
    }

    if (action === "transfer") {
      setQuickPreset({
        type: "expense",
        category: "Transfer",
        description: "Move to savings",
      })
      setAddMode("payment")
      setActiveTab("add")
      return
    }

    setQuickPreset(null)
    setAddMode("plan")
    setActiveTab("add")
  }

  return (
    <div className="app-shell">
      <AppHeader activeTab={activeTab} onTabChange={handleTabChange} onQuickAction={handleQuickAction} />

      <main className="app-main">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "add" && (
          <AddWorkspace
            preset={quickPreset || undefined}
            initialMode={addMode}
            onComplete={() => setQuickPreset(null)}
          />
        )}
        {activeTab === "history" && <TransactionHistory />}
      </main>

      <BottomNav active={activeTab} onChange={handleTabChange} />
    </div>
  )
}
