import React, { useMemo } from "react"
import { Transaction } from "../../../budget/types"
import { buildRecentDays } from "../../../utils/date"
import { formatCurrencyRounded } from "../../../utils/currency"
import BarChart from "../../charts/BarChart"
import Badge from "../../ui/Badge"
import Card from "../../ui/Card"
import CardHeader from "../../ui/CardHeader"

interface DailySpendCardProps {
  transactions: Transaction[]
}

export default function DailySpendCard({ transactions }: DailySpendCardProps) {
  const { data, labels, total } = useMemo(() => {
    const days = buildRecentDays(7)
    const totals = new Map(days.map((day) => [day.key, 0]))

    transactions.forEach((tx) => {
      if (tx.type !== "expense") return
      if (!totals.has(tx.date)) return
      totals.set(tx.date, (totals.get(tx.date) || 0) + tx.amount)
    })

    const dataPoints = days.map((day) => totals.get(day.key) || 0)
    const totalSpend = dataPoints.reduce((sum, value) => sum + value, 0)

    return { data: dataPoints, labels: days.map((day) => day.label), total: totalSpend }
  }, [transactions])

  return (
    <Card className="chart-card">
      <CardHeader
        eyebrow="Spending"
        title="Daily outflow"
        description="Expenses logged over the last week."
        side={<Badge tone="warm">{formatCurrencyRounded(total)}</Badge>}
      />
      <div className="chart-block">
        <BarChart data={data} labels={labels} tone="warm" />
        {transactions.length === 0 && <p className="muted">No spending data yet.</p>}
      </div>
    </Card>
  )
}
