import React from "react"

const paymentSources = [
  { label: "Visa •••• 4829", balance: 2845.5, note: "Placeholder wallet entry" },
  { label: "Cash on hand", balance: 540.2, note: "Use this card for petty cash ideas" },
]

export default function PaymentMethodsCard() {
  return (
    <section className="card">
      <div className="card-header">
        <p className="eyebrow">Payment methods</p>
        <h3>Surface accounts</h3>
      </div>
      <div className="stack gap-sm">
        {paymentSources.map((source) => (
          <div key={source.label} className="card nested">
            <p className="label">{source.label}</p>
            <p className="value">${source.balance.toFixed(2)}</p>
            <p className="muted">{source.note}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
