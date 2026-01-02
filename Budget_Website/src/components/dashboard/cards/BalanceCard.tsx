import React from "react"
import { Totals } from "../../../budget/types"
import { formatCurrency, formatCurrencyRounded } from "../../../utils/currency"
import Badge from "../../ui/Badge"
import Card from "../../ui/Card"
import CardHeader from "../../ui/CardHeader"
import ProgressMeter from "../../ui/ProgressMeter"

export default function BalanceCard({ totals }: { totals: Totals }) {
  const burnRate = totals.income ? Math.min(100, Math.round((totals.expense / totals.income) * 100)) : 0

  return (
    <Card className="balance-card">
      <CardHeader
        eyebrow="Current balance"
        title={formatCurrency(totals.balance)}
        headingLevel="h2"
        description="Net available after income and expenses."
        side={
          <div className="badge-group">
            <Badge tone="positive">Income {formatCurrencyRounded(totals.income)}</Badge>
            <Badge tone="negative">Expense {formatCurrencyRounded(totals.expense)}</Badge>
          </div>
        }
      />
      <div className="balance-meter">
        <div className="balance-meter-header">
          <p className="label">Spending pace</p>
          <p className="muted">{burnRate}% used</p>
        </div>
        <ProgressMeter value={burnRate} tone="accent" />
        <p className="muted">Share of income currently assigned to expenses.</p>
      </div>
    </Card>
  )
}
