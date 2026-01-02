import React, { useMemo, useState } from "react"
import { useBudget } from "../../budget/BudgetProvider"
import Card from "../ui/Card"
import CardHeader from "../ui/CardHeader"
import FormField from "../ui/FormField"

interface AddSpendingPlanFormProps {
  onComplete?: () => void
}

type FormState = {
  category: string
  cap: string
  note: string
}

const buildDefaultState = (): FormState => ({
  category: "",
  cap: "",
  note: "",
})

export default function AddSpendingPlanForm({ onComplete }: AddSpendingPlanFormProps) {
  const { addPlan, state } = useBudget()
  const [form, setForm] = useState<FormState>(buildDefaultState)

  const categoryListId = "plan-categories"
  const categories = useMemo(() => state.categories.expense, [state.categories.expense])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const category = form.category.trim()
    if (!category || !form.cap) return

    addPlan({
      category,
      cap: parseFloat(form.cap),
      note: form.note,
    })
    setForm(buildDefaultState)
    onComplete?.()
  }

  return (
    <Card>
      <CardHeader
        eyebrow="Add plan"
        title="Create a spending cap"
        description="Set a monthly limit and track category usage."
      />
      <form className="stack gap-md" onSubmit={handleSubmit}>
        <FormField label="Category">
          <input
            list={categoryListId}
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
            placeholder="e.g. Groceries"
          />
          <datalist id={categoryListId}>
            {categories.map((cat) => (
              <option key={cat} value={cat} />
            ))}
          </datalist>
        </FormField>

        <FormField label="Monthly cap">
          <input
            type="number"
            step="0.01"
            value={form.cap}
            onChange={(e) => setForm((prev) => ({ ...prev, cap: e.target.value }))}
            placeholder="0.00"
          />
        </FormField>

        <FormField label="Note" hint="Optional reminder about this budget.">
          <input
            type="text"
            value={form.note}
            onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
            placeholder="Weekly essentials"
          />
        </FormField>

        <button type="submit" className="primary">
          Save spending plan
        </button>
      </form>
    </Card>
  )
}
