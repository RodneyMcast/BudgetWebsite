import React, { useMemo } from "react"
import { Transaction } from "../../../budget/types"

interface CategoryBreakdownProps {
  transactions: Transaction[]
}

export default function CategoryBreakdown({ transactions }: CategoryBreakdownProps) {
  const breakdown = useMemo(() => {
    const totals = new Map<string, number>()
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => totals.set(t.category, (totals.get(t.category) || 0) + t.amount))
    return Array.from(totals.entries())
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
  }, [transactions])

  return (
    <section className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Category breakdown</p>
          <h3>Where money is going</h3>
        </div>
        <p className="muted">Top expense categories from the sample data.</p>
      </div>
      <div className="stack gap-sm">
        {breakdown.length === 0 && <p className="muted">Add expenses to see the mix.</p>}
        {breakdown.map((item) => (
          <div key={item.category} className="list-row">
            <div>
              <p className="label">{item.category}</p>
            </div>
            <div className="bar">
              <span style={{ width: `${Math.min(100, item.amount)}%` }} />
            </div>
            <p className="value">${item.amount.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
