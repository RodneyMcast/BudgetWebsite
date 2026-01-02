import React, { useEffect, useMemo, useState } from "react"
import { useBudget } from "../../budget/BudgetProvider"
import { Transaction, TransactionInput, TransactionType } from "../../budget/types"
import Card from "../ui/Card"
import CardHeader from "../ui/CardHeader"
import FormField from "../ui/FormField"
import SegmentedControl from "../ui/SegmentedControl"

interface TransactionEditorProps {
  transaction: Transaction
  onCancel: () => void
}

type FormState = Omit<TransactionInput, "amount"> & { amount: string }

const typeOptions = [
  { value: "expense", label: "Expense" },
  { value: "income", label: "Income" },
]

const buildFormState = (tx: Transaction): FormState => ({
  type: tx.type,
  category: tx.category,
  amount: tx.amount.toString(),
  description: tx.description,
  date: tx.date,
})

export default function TransactionEditor({ transaction, onCancel }: TransactionEditorProps) {
  const { updateTransaction, state } = useBudget()
  const [form, setForm] = useState<FormState>(() => buildFormState(transaction))

  useEffect(() => {
    setForm(buildFormState(transaction))
  }, [transaction])

  const categories = useMemo(() => state.categories[form.type], [form.type, state.categories])
  const categoryListId = `edit-categories-${form.type}`

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const category = form.category.trim()
    if (!category || !form.amount) return

    updateTransaction(transaction.id, {
      ...form,
      category,
      amount: parseFloat(form.amount),
    })
    onCancel()
  }

  return (
    <Card className="editor-card">
      <CardHeader
        eyebrow="Editing"
        title={`Update ${transaction.category}`}
        description="Adjust the details and save the changes."
      />
      <form className="stack gap-md" onSubmit={handleSubmit}>
        <SegmentedControl
          value={form.type}
          options={typeOptions}
          onChange={(value) => setForm((prev) => ({ ...prev, type: value as TransactionType }))}
        />

        <FormField label="Category">
          <input
            list={categoryListId}
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
            placeholder="Category"
          />
          <datalist id={categoryListId}>
            {categories.map((cat) => (
              <option key={cat} value={cat} />
            ))}
          </datalist>
        </FormField>

        <FormField label="Amount">
          <input
            type="number"
            step="0.01"
            value={form.amount}
            onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
          />
        </FormField>

        <FormField label="Description">
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Optional details"
          />
        </FormField>

        <FormField label="Date">
          <input type="date" value={form.date} onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))} />
        </FormField>

        <div className="editor-actions">
          <button type="button" className="ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="primary">
            Save changes
          </button>
        </div>
      </form>
    </Card>
  )
}
