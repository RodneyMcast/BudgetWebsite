import React from "react"
import { useBudget } from "../../../budget/BudgetProvider"
import { formatCurrencyRounded } from "../../../utils/currency"
import { formatMonthShort } from "../../../utils/date"
import Badge from "../../ui/Badge"
import Card from "../../ui/Card"
import CardHeader from "../../ui/CardHeader"
import ProgressMeter from "../../ui/ProgressMeter"

const tones: Array<"accent" | "warm"> = ["accent", "warm"]

export default function SavingsGoalsCard() {
  const { state, removeGoal } = useBudget()

  return (
    <Card>
      <CardHeader eyebrow="Goals" title="Savings targets" description="Simple visual markers for near-term goals." />
      <div className="stack gap-sm">
        {state.goals.length === 0 && <p className="muted">No goals yet. Add a target to start tracking.</p>}
        {state.goals.map((goal, index) => {
          const percent = goal.target ? Math.min(100, Math.round((goal.saved / goal.target) * 100)) : 0
          const tone = tones[index % tones.length]

          const deadlineLabel = formatMonthShort(goal.deadline)

          return (
            <div key={goal.id} className="plan-row">
              <div className="plan-header">
                <p className="label">{goal.name}</p>
                <div className="plan-actions">
                  <Badge tone="neutral">{`${formatCurrencyRounded(goal.saved)}/${formatCurrencyRounded(
                    goal.target,
                  )}`}</Badge>
                  <button type="button" className="ghost" onClick={() => removeGoal(goal.id)}>
                    Remove
                  </button>
                </div>
              </div>
              <ProgressMeter value={percent} tone={tone} />
              <p className="muted">{deadlineLabel ? `Target by ${deadlineLabel}.` : "Set a deadline to stay on track."}</p>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
