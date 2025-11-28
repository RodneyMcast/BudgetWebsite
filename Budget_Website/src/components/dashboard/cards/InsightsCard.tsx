import React from "react"

const insights = [
  "Savings nudged up vs last month.",
  "Groceries trend is steady with the sample data.",
  "Entertainment is creeping higher — worth reviewing.",
]

export default function InsightsCard() {
  return (
    <section className="card insights">
      <div className="card-header">
        <p className="eyebrow">Monthly notes</p>
        <h3>Conversation starters</h3>
      </div>
      <ul className="insights-list">
        {insights.map((insight) => (
          <li key={insight}>{insight}</li>
        ))}
      </ul>
    </section>
  )
}
