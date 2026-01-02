import React, { useMemo } from "react"
import { Transaction } from "../../../budget/types"
import { formatCurrencyRounded } from "../../../utils/currency"
import Badge from "../../ui/Badge"
import Card from "../../ui/Card"
import CardHeader from "../../ui/CardHeader"
import ProgressMeter from "../../ui/ProgressMeter"

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

  const maxAmount = breakdown[0]?.amount ?? 0

  return (
    <Card>
      <CardHeader
        eyebrow="Category breakdown"
        title="Where money is going"
        description="Top expense categories from your payments."
      />
      <div className="stack gap-sm">
        {breakdown.length === 0 && <p className="muted">Add expenses to see the mix.</p>}
        {breakdown.map((item) => {
          const percent = maxAmount ? Math.min(100, Math.round((item.amount / maxAmount) * 100)) : 0

          return (
            <div key={item.category} className="bar-row">
              <div className="plan-header">
                <p className="label">{item.category}</p>
                <Badge tone="neutral">{formatCurrencyRounded(item.amount)}</Badge>
              </div>
              <ProgressMeter value={percent} tone="accent" />
            </div>
          )
        })}
      </div>
    </Card>
  )
}
