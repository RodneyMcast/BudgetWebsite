import React from "react"
import { useBudget } from "../../../budget/BudgetProvider"
import { formatCurrencyRounded } from "../../../utils/currency"
import { formatDueIn, formatLongDate } from "../../../utils/date"
import Badge from "../../ui/Badge"
import Card from "../../ui/Card"
import CardHeader from "../../ui/CardHeader"

export default function UpcomingBillsCard() {
  const { state, removeBill } = useBudget()

  return (
    <Card>
      <CardHeader eyebrow="Upcoming" title="Bill reminders" description="Scheduled and recurring payments." />
      <div className="stack gap-xs">
        {state.bills.length === 0 && <p className="muted">No upcoming bills yet.</p>}
        {state.bills.map((bill) => (
          <div key={bill.id} className="list-row">
            <div className="list-main">
              <p className="label">{bill.label}</p>
              <p className="muted">
                {formatDueIn(bill.dueDate)} - {formatLongDate(bill.dueDate)}
              </p>
            </div>
            <div className="list-actions">
              <Badge tone="warm">{formatCurrencyRounded(bill.amount)}</Badge>
              <button type="button" className="ghost" onClick={() => removeBill(bill.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
