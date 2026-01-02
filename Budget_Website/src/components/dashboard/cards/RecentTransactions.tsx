import React from "react"
import { Transaction } from "../../../budget/types"
import Card from "../../ui/Card"
import CardHeader from "../../ui/CardHeader"
import TransactionRow from "../../transactions/TransactionRow"

export default function RecentTransactions({ transactions }: { transactions: Transaction[] }) {
  return (
    <Card>
      <CardHeader eyebrow="Recent" title="Latest activity" description="Most recent items in the ledger." />
      <div className="stack gap-xs">
        {transactions.length === 0 && <p className="muted">No payments yet.</p>}
        {transactions.map((tx) => (
          <TransactionRow key={tx.id} transaction={tx} datePlacement="meta" compact />
        ))}
      </div>
    </Card>
  )
}
