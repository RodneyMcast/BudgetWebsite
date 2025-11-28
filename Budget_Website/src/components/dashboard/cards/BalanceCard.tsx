import React from "react"
import { Totals } from "../../../budget/types"

export default function BalanceCard({ totals }: { totals: Totals }) {
  return (
    <section className="card balance-card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Current balance</p>
          <h2>${totals.balance.toFixed(2)}</h2>
        </div>
        <div className="chip-group">
          <span className="pill pill-positive">Income ${totals.income.toFixed(0)}</span>
          <span className="pill pill-negative">Expense ${totals.expense.toFixed(0)}</span>
        </div>
      </div>
      <p className="muted">Use this block to house hero metrics, charts, or quick filters.</p>
    </section>
  )
}
