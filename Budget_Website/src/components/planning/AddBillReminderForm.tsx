import React, { useState } from "react"
import { useBudget } from "../../budget/BudgetProvider"
import Card from "../ui/Card"
import CardHeader from "../ui/CardHeader"
import FormField from "../ui/FormField"

interface AddBillReminderFormProps {
  onComplete?: () => void
}

type FormState = {
  label: string
  amount: string
  dueDate: string
}

const buildDefaultState = (): FormState => ({
  label: "",
  amount: "",
  dueDate: new Date().toISOString().split("T")[0],
})

export default function AddBillReminderForm({ onComplete }: AddBillReminderFormProps) {
  const { addBill } = useBudget()
  const [form, setForm] = useState<FormState>(buildDefaultState)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const label = form.label.trim()
    if (!label || !form.amount || !form.dueDate) return

    addBill({
      label,
      amount: parseFloat(form.amount),
      dueDate: form.dueDate,
    })
    setForm(buildDefaultState)
    onComplete?.()
  }

  return (
    <Card>
      <CardHeader
        eyebrow="Add bill"
        title="Set a bill reminder"
        description="Track fixed bills with a due date."
      />
      <form className="stack gap-md" onSubmit={handleSubmit}>
        <FormField label="Bill name">
          <input
            type="text"
            value={form.label}
            onChange={(e) => setForm((prev) => ({ ...prev, label: e.target.value }))}
            placeholder="e.g. Rent"
          />
        </FormField>

        <FormField label="Amount">
          <input
            type="number"
            step="0.01"
            value={form.amount}
            onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
            placeholder="0.00"
          />
        </FormField>

        <FormField label="Due date">
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm((prev) => ({ ...prev, dueDate: e.target.value }))}
          />
        </FormField>

        <button type="submit" className="primary">
          Save bill reminder
        </button>
      </form>
    </Card>
  )
}
