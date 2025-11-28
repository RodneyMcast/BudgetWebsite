import React, { useMemo, useState } from "react"
import { useBudget } from "../../budget/BudgetProvider"
import { TransactionInput, TransactionType } from "../../budget/types"

interface FormProps {
  onSubmitComplete?: () => void
}

type FormState = Omit<TransactionInput, "amount"> & { amount: string }

const buildDefaultState = (): FormState => ({
  type: "expense",
  category: "",
  amount: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
})

export default function AddTransactionForm({ onSubmitComplete }: FormProps) {
  const { addTransaction, state, addCategory } = useBudget()
  const [form, setForm] = useState<FormState>(buildDefaultState)
  const [newCategory, setNewCategory] = useState("")
  const [newCategoryType, setNewCategoryType] = useState<TransactionType>("expense")

  const categories = useMemo(() => state.categories[form.type], [form.type, state.categories])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.category || !form.amount) return

    addTransaction({
      ...form,
      amount: parseFloat(form.amount),
    })
    setForm(buildDefaultState)
    onSubmitComplete?.()
  }

  const handleAddCategory = () => {
    if (!newCategory.trim()) return
    addCategory(newCategoryType, newCategory)
    setNewCategory("")
  }

  return (
    <section className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Add transaction</p>
          <h3>Log income or expense</h3>
        </div>
        <p className="muted">Use this lightweight form to sketch flows.</p>
      </div>
      <form className="stack gap-md" onSubmit={handleSubmit}>
        <div className="toggle">
          {(["expense", "income"] as TransactionType[]).map((type) => (
            <button
              key={type}
              type="button"
              className={`toggle-btn ${form.type === type ? "is-active" : ""}`}
              onClick={() => setForm((prev) => ({ ...prev, type, category: "" }))}
            >
              {type}
            </button>
          ))}
        </div>

        <label className="field">
          <span>Category</span>
          <select value={form.category} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}>
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Amount</span>
          <input
            type="number"
            step="0.01"
            value={form.amount}
            onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
            placeholder="0.00"
          />
        </label>

        <label className="field">
          <span>Description</span>
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Optional details"
          />
        </label>

        <label className="field">
          <span>Date</span>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
          />
        </label>

        <button type="submit" className="primary">
          Add transaction
        </button>
      </form>

      <div className="card nested">
        <div className="card-header">
          <p className="eyebrow">Categories</p>
          <p className="muted">Quick helper to seed new categories.</p>
        </div>
        <div className="stack gap-sm">
          <div className="toggle small">
            {(["expense", "income"] as TransactionType[]).map((type) => (
              <button
                key={type}
                type="button"
                className={`toggle-btn ${newCategoryType === type ? "is-active" : ""}`}
                onClick={() => setNewCategoryType(type)}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="inline-form">
            <input
              type="text"
              placeholder="New category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button type="button" onClick={handleAddCategory}>
              Add
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
