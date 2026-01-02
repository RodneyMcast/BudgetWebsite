import React, { useMemo } from "react"
import { Transaction } from "../../../budget/types"
import { buildRecentDays } from "../../../utils/date"
import { formatSignedCurrency } from "../../../utils/currency"
import LineChart from "../../charts/LineChart"
import Badge from "../../ui/Badge"
import Card from "../../ui/Card"
import CardHeader from "../../ui/CardHeader"

interface CashflowTrendCardProps {
  transactions: Transaction[]
}

export default function CashflowTrendCard({ transactions }: CashflowTrendCardProps) {
  const { data, labels, net } = useMemo(() => {
    const days = buildRecentDays(7)
    const totals = new Map(days.map((day) => [day.key, 0]))

    transactions.forEach((tx) => {
      if (!totals.has(tx.date)) return
      const delta = tx.type === "income" ? tx.amount : -tx.amount
      totals.set(tx.date, (totals.get(tx.date) || 0) + delta)
    })

    const dataPoints = days.map((day) => totals.get(day.key) || 0)
    const totalNet = dataPoints.reduce((sum, value) => sum + value, 0)

    return { data: dataPoints, labels: days.map((day) => day.label), net: totalNet }
  }, [transactions])

  return (
    <Card className="chart-card">
      <CardHeader
        eyebrow="Cashflow"
        title="7-day cashflow"
        description="Net inflow versus outflow."
        side={<Badge tone="accent">{formatSignedCurrency(net)}</Badge>}
      />
      <div className="chart-block">
        <LineChart data={data} tone="accent" />
        <div className="chart-axis">
          {labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        {transactions.length === 0 && <p className="muted">Add payments to see the trend line.</p>}
      </div>
    </Card>
  )
}
