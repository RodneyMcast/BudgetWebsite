import React, { useState } from "react"
import Dashboard from "./components/dashboard/Dashboard"
import AddTransactionForm from "./components/transactions/AddTransactionForm"
import TransactionHistory from "./components/transactions/TransactionHistory"
import BottomNav from "./components/navigation/BottomNav"

export type AppTab = "dashboard" | "add" | "history"

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>("dashboard")

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Brainstorm Sandbox</p>
          <h1>Budget Website</h1>
        </div>
        <p className="muted">Use this scaffold to map sections and interactions before styling in detail.</p>
      </header>

      <main className="app-main">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "add" && <AddTransactionForm onSubmitComplete={() => setActiveTab("dashboard")} />}
        {activeTab === "history" && <TransactionHistory />}
      </main>

      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  )
}
