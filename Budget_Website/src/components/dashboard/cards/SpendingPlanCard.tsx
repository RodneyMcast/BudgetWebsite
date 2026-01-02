import React, { useMemo } from "react"
import { useBudget } from "../../../budget/BudgetProvider"
import { formatCurrencyRounded } from "../../../utils/currency"
import Badge from "../../ui/Badge"
import Card from "../../ui/Card"
import CardHeader from "../../ui/CardHeader"
import ProgressMeter from "../../ui/ProgressMeter"

const tones: Array<"accent" | "cool" | "warm"> = ["accent", "cool", "warm"]

export default function SpendingPlanCard() {
  const { state, removePlan } = useBudget()

  const spentMap = useMemo(() => {
    const totals = new Map<string, number>()
    state.transactions
      .filter((tx) => tx.type === "expense")
      .forEach((tx) => totals.set(tx.category, (totals.get(tx.category) || 0) + tx.amount))
    return totals
  }, [state.transactions])

  return (
    <Card>
      <CardHeader eyebrow="Planning" title="Spending plan" description="Lightweight caps to keep priorities visible." />
      <div className="stack gap-sm">
        {state.plans.length === 0 && <p className="muted">No spending caps yet. Add budgets as you build the plan.</p>}
        {state.plans.map((plan, index) => {
          const spent = spentMap.get(plan.category) || 0
          const percent = plan.cap ? Math.min(100, Math.round((spent / plan.cap) * 100)) : 0
          const tone = tones[index % tones.length]

          return (
            <div key={plan.id} className="plan-row">
              <div className="plan-header">
                <p className="label">{plan.category}</p>
                <div className="plan-actions">
                  <Badge tone="neutral">{`${formatCurrencyRounded(spent)}/${formatCurrencyRounded(plan.cap)}`}</Badge>
                  <button type="button" className="ghost" onClick={() => removePlan(plan.id)}>
                    Remove
                  </button>
                </div>
              </div>
              <ProgressMeter value={percent} tone={tone} />
              <p className="muted">{plan.note || "Set a note to explain this budget."}</p>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
