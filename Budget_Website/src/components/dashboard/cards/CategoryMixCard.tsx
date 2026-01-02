import React, { useMemo } from "react"
import { Transaction } from "../../../budget/types"
import { formatCurrencyRounded } from "../../../utils/currency"
import DonutChart, { DonutSegment } from "../../charts/DonutChart"
import ChartLegend from "../../charts/ChartLegend"
import Card from "../../ui/Card"
import CardHeader from "../../ui/CardHeader"

interface CategoryMixCardProps {
  transactions: Transaction[]
}

const tones: DonutSegment["tone"][] = ["accent", "cool", "warm", "neutral"]

export default function CategoryMixCard({ transactions }: CategoryMixCardProps) {
  const segments = useMemo(() => {
    const totals = new Map<string, number>()
    transactions
      .filter((tx) => tx.type === "expense")
      .forEach((tx) => totals.set(tx.category, (totals.get(tx.category) || 0) + tx.amount))

    const sorted = Array.from(totals.entries())
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)

    const top = sorted.slice(0, 3)
    const remainder = sorted.slice(3).reduce((sum, item) => sum + item.value, 0)

    const result: DonutSegment[] = top.map((item, index) => ({
      label: item.label,
      value: item.value,
      tone: tones[index % tones.length],
    }))

    if (remainder > 0) {
      result.push({ label: "Other", value: remainder, tone: "neutral" })
    }

    return result
  }, [transactions])

  const total = segments.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="chart-card">
      <CardHeader
        eyebrow="Mix"
        title="Expense split"
        description="Top categories from your payments."
      />
      <div className="mix-grid">
        <DonutChart
          segments={segments}
          centerLabel="Total"
          centerValue={formatCurrencyRounded(total)}
        />
        {segments.length > 0 ? (
          <ChartLegend items={segments} />
        ) : (
          <p className="muted">Add expenses to fill the mix chart.</p>
        )}
      </div>
    </Card>
  )
}
