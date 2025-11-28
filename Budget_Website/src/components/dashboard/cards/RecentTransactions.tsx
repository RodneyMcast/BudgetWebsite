import React from "react"
import { Transaction } from "../../../budget/types"

export default function RecentTransactions({ transactions }: { transactions: Transaction[] }) {
  return (
    <section className="card">
      <div className="card-header">
        <p className="eyebrow">Recent</p>
        <h3>Latest activity</h3>
      </div>
      <div className="stack gap-xs">
        {transactions.length === 0 && <p className="muted">Nothing logged yet.</p>}
        {transactions.map((tx) => (
          <div key={tx.id} className="list-row">
            <div>
              <p className="label">{tx.category}</p>
              <p className="muted">{tx.description || "No description"}</p>
            </div>
            <div className="pill-row">
              <span className={`pill ${tx.type === "income" ? "pill-positive" : "pill-negative"}`}>
                {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
              </span>
              <p className="muted">{tx.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
