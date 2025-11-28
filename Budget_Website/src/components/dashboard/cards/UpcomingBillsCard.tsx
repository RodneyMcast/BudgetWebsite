import React from "react"

const sampleBills = [
  { label: "Rent", amount: 1200, dueIn: "Due in 3 days" },
  { label: "Phone bill", amount: 65, dueIn: "Due in 7 days" },
  { label: "Electricity", amount: 85, dueIn: "Due in 12 days" },
]

export default function UpcomingBillsCard() {
  return (
    <section className="card">
      <div className="card-header">
        <p className="eyebrow">Upcoming</p>
        <h3>Bill reminders</h3>
      </div>
      <div className="stack gap-xs">
        {sampleBills.map((bill) => (
          <div key={bill.label} className="list-row">
            <div>
              <p className="label">{bill.label}</p>
              <p className="muted">{bill.dueIn}</p>
            </div>
            <p className="value">${bill.amount.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
