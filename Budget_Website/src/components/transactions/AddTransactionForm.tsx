import React, { useEffect, useMemo, useState } from "react"
import { useBudget } from "../../budget/BudgetProvider"
import { TransactionInput, TransactionType } from "../../budget/types"
import Card from "../ui/Card"
import CardHeader from "../ui/CardHeader"
import FormField from "../ui/FormField"
import SegmentedControl from "../ui/SegmentedControl"

interface FormProps {
  onSubmitComplete?: () => void
  preset?: Partial<FormState>
}

type FormState = Omit<TransactionInput, "amount"> & { amount: string }

const buildDefaultState = (preset?: Partial<FormState>): FormState => ({
  type: preset?.type ?? "expense",
  category: preset?.category ?? "",
  amount: preset?.amount ?? "",
  description: preset?.description ?? "",
  date: preset?.date ?? new Date().toISOString().split("T")[0],
})

const typeOptions = [
  { value: "expense", label: "Expense" },
  { value: "income", label: "Income" },
]

export default function AddTransactionForm({ onSubmitComplete, preset }: FormProps) {
  const { addTransaction, state, addCategory } = useBudget()
  const [form, setForm] = useState<FormState>(buildDefaultState(preset))
  const [newCategory, setNewCategory] = useState("")
  const [newCategoryType, setNewCategoryType] = useState<TransactionType>("expense")

  const categories = useMemo(() => state.categories[form.type], [form.type, state.categories])
  const categoryListId = `categories-${form.type}`

  useEffect(() => {
    setForm(buildDefaultState(preset))
  }, [preset])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const category = form.category.trim()
    if (!category || !form.amount) return

    addTransaction({
      ...form,
      category,
      amount: parseFloat(form.amount),
    })
    setForm(buildDefaultState(preset))
    onSubmitComplete?.()
  }

  const handleAddCategory = () => {
    if (!newCategory.trim()) return
    addCategory(newCategoryType, newCategory)
    setNewCategory("")
  }

  return (
    <Card>
      <CardHeader
        eyebrow="Add payment"
        title="Log income or expense"
        description="Start empty and build the ledger as you go."
      />
      <form className="stack gap-md" onSubmit={handleSubmit}>
        <SegmentedControl
          value={form.type}
          options={typeOptions}
          onChange={(value) => setForm((prev) => ({ ...prev, type: value as TransactionType, category: "" }))}
        />

        <FormField label="Category" hint="Start typing to add a new label.">
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

        <FormField label="Amount" hint="Enter the total for this entry.">
          <input
            type="number"
            step="0.01"
            value={form.amount}
            onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
            placeholder="0.00"
          />
        </FormField>

        <FormField label="Description" hint="Optional short note to identify the spend.">
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

        <button type="submit" className="primary">
          Save payment
        </button>
      </form>

      <Card variant="nested" as="div" className="category-card">
        <CardHeader
          eyebrow="Categories"
          title="Add a label"
          headingLevel="h4"
          description="Quick helper to seed new categories."
        />
        <div className="stack gap-sm">
          <SegmentedControl
            size="small"
            value={newCategoryType}
            options={typeOptions}
            onChange={(value) => setNewCategoryType(value as TransactionType)}
          />
          <div className="inline-form">
            <input
              type="text"
              placeholder="New category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button type="button" className="ghost" onClick={handleAddCategory}>
              Add
            </button>
          </div>
        </div>
      </Card>
    </Card>
  )
}
