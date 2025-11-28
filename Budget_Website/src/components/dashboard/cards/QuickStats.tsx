import React, { useMemo } from "react"
import { Totals } from "../../../budget/types"

interface QuickStatsProps {
  totals: Totals
  transactionCount: number
}

export default function QuickStats({ totals, transactionCount }: QuickStatsProps) {
  const burnRate = useMemo(() => {
    if (!totals.income) return 0
    return Math.min(100, Math.round((totals.expense / totals.income) * 100))
  }, [totals.expense, totals.income])

  return (
    <div className="grid two gap-md">
      <section className="card">
        <p className="eyebrow">Log activity</p>
        <h3>{transactionCount}</h3>
        <p className="muted">Rough count of transactions in this sandbox data set.</p>
      </section>
      <section className="card">
        <p className="eyebrow">Burn rate</p>
        <div className="progress">
          <span style={{ width: `${burnRate}%` }} />
        </div>
        <p className="muted">{burnRate}% of income currently allocated to expenses.</p>
      </section>
    </div>
  )
}
