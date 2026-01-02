import React, { useMemo, useState } from "react"
import { useBudget } from "../../budget/BudgetProvider"
import Card from "../ui/Card"
import CardHeader from "../ui/CardHeader"
import TransactionEditor from "./TransactionEditor"
import TransactionRow from "./TransactionRow"

export default function TransactionHistory() {
  const { state, deleteTransaction } = useBudget()
  const [editingId, setEditingId] = useState<string | null>(null)

  const editingTransaction = useMemo(
    () => state.transactions.find((tx) => tx.id === editingId) || null,
    [editingId, state.transactions],
  )

  return (
    <div className="stack gap-md">
      {editingTransaction && (
        <TransactionEditor transaction={editingTransaction} onCancel={() => setEditingId(null)} />
      )}
      <Card>
        <CardHeader
          eyebrow="History"
          title="All payments"
          description="Edit, remove, or review each entry as you iterate."
        />
        <div className="stack gap-xs">
          {state.transactions.length === 0 && <p className="muted">No payments yet.</p>}
          {state.transactions.map((tx) => (
            <TransactionRow
              key={tx.id}
              transaction={tx}
              datePlacement="body"
              actions={[
                { label: "Edit", onClick: () => setEditingId(tx.id) },
                { label: "Remove", onClick: () => deleteTransaction(tx.id), tone: "danger" },
              ]}
            />
          ))}
        </div>
      </Card>
    </div>
  )
}
