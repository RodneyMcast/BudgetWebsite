import React, { useState } from "react"
import { useBudget } from "../../budget/BudgetProvider"
import Card from "../ui/Card"
import CardHeader from "../ui/CardHeader"
import FormField from "../ui/FormField"

interface AddSavingsGoalFormProps {
  onComplete?: () => void
}

type FormState = {
  name: string
  target: string
  saved: string
  deadline: string
}

const buildDefaultState = (): FormState => ({
  name: "",
  target: "",
  saved: "",
  deadline: new Date().toISOString().split("T")[0],
})

export default function AddSavingsGoalForm({ onComplete }: AddSavingsGoalFormProps) {
  const { addGoal } = useBudget()
  const [form, setForm] = useState<FormState>(buildDefaultState)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const name = form.name.trim()
    if (!name || !form.target || !form.deadline) return

    addGoal({
      name,
      target: parseFloat(form.target),
      saved: form.saved ? parseFloat(form.saved) : 0,
      deadline: form.deadline,
    })
    setForm(buildDefaultState)
    onComplete?.()
  }

  return (
    <Card>
      <CardHeader
        eyebrow="Add goal"
        title="Create a savings target"
        description="Track progress against a future target."
      />
      <form className="stack gap-md" onSubmit={handleSubmit}>
        <FormField label="Goal name">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="e.g. Emergency fund"
          />
        </FormField>

        <FormField label="Target amount">
          <input
            type="number"
            step="0.01"
            value={form.target}
            onChange={(e) => setForm((prev) => ({ ...prev, target: e.target.value }))}
            placeholder="0.00"
          />
        </FormField>

        <FormField label="Saved so far" hint="Leave blank if starting from zero.">
          <input
            type="number"
            step="0.01"
            value={form.saved}
            onChange={(e) => setForm((prev) => ({ ...prev, saved: e.target.value }))}
            placeholder="0.00"
          />
        </FormField>

        <FormField label="Target date">
          <input
            type="date"
            value={form.deadline}
            onChange={(e) => setForm((prev) => ({ ...prev, deadline: e.target.value }))}
          />
        </FormField>

        <button type="submit" className="primary">
          Save savings goal
        </button>
      </form>
    </Card>
  )
}
