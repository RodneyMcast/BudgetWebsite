import React from "react"
import { useBudget } from "../../budget/BudgetProvider"

export default function TransactionHistory() {
  const { state, deleteTransaction } = useBudget()

  return (
    <section className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">History</p>
          <h3>All transactions</h3>
        </div>
        <p className="muted">Browse the sample data set or remove items as you explore flows.</p>
      </div>

      <div className="stack gap-xs">
        {state.transactions.length === 0 && <p className="muted">No transactions yet.</p>}
        {state.transactions.map((tx) => (
          <div key={tx.id} className="list-row">
            <div>
              <p className="label">{tx.category}</p>
              <p className="muted">{tx.description || "No description provided"}</p>
              <p className="muted">{tx.date}</p>
            </div>
            <div className="pill-row">
              <span className={`pill ${tx.type === "income" ? "pill-positive" : "pill-negative"}`}>
                {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
              </span>
              <button onClick={() => deleteTransaction(tx.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
