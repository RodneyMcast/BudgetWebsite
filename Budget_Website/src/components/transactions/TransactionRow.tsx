import React from "react"
import { Transaction } from "../../budget/types"
import { formatSignedCurrency } from "../../utils/currency"
import { formatLongDate } from "../../utils/date"
import Badge from "../ui/Badge"

type DatePlacement = "meta" | "body"

interface RowAction {
  label: string
  onClick: () => void
  tone?: "default" | "danger"
}

interface TransactionRowProps {
  transaction: Transaction
  datePlacement?: DatePlacement
  actions?: RowAction[]
  compact?: boolean
}

export default function TransactionRow({
  transaction,
  datePlacement = "meta",
  actions,
  compact = false,
}: TransactionRowProps) {
  const tone = transaction.type === "income" ? "positive" : "negative"
  const signedAmount = transaction.type === "income" ? transaction.amount : -transaction.amount
  const amountLabel = formatSignedCurrency(signedAmount)
  const rowClasses = ["list-row", compact ? "list-row-compact" : ""].filter(Boolean).join(" ")

  return (
    <div className={rowClasses}>
      <div className="list-main">
        <p className="label">{transaction.category}</p>
        <p className="muted">{transaction.description || "No description"}</p>
        {datePlacement === "body" && <p className="muted">{formatLongDate(transaction.date)}</p>}
      </div>
      <div className="list-meta">
        <Badge tone={tone}>{amountLabel}</Badge>
        {datePlacement === "meta" && <p className="muted">{formatLongDate(transaction.date)}</p>}
        {actions && actions.length > 0 && (
          <div className="list-actions">
            {actions.map((action) => (
              <button
                key={action.label}
                type="button"
                className={`ghost ${action.tone === "danger" ? "ghost-danger" : ""}`}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
