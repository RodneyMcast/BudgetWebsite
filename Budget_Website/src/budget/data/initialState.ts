import { BudgetState } from "../types"

const formatDate = (offset: number) => {
  const date = new Date()
  date.setDate(date.getDate() - offset)
  return date.toISOString().split("T")[0]
}

const formatFutureDate = (offset: number) => {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  return date.toISOString().split("T")[0]
}

export const initialState: BudgetState = {
  transactions: [
    {
      id: "tx-seed-1",
      type: "income",
      category: "Salary",
      amount: 2850,
      description: "Monthly salary",
      date: formatDate(3),
    },
    {
      id: "tx-seed-2",
      type: "income",
      category: "Freelance",
      amount: 420,
      description: "Design sprint support",
      date: formatDate(1),
    },
    {
      id: "tx-seed-3",
      type: "expense",
      category: "Rent",
      amount: 980,
      description: "January rent",
      date: formatDate(5),
    },
    {
      id: "tx-seed-4",
      type: "expense",
      category: "Groceries",
      amount: 76.45,
      description: "Weekly shop",
      date: formatDate(2),
    },
    {
      id: "tx-seed-5",
      type: "expense",
      category: "Transport",
      amount: 32.9,
      description: "Metro and fuel",
      date: formatDate(1),
    },
    {
      id: "tx-seed-6",
      type: "expense",
      category: "Dining",
      amount: 45.2,
      description: "Coffee and lunch",
      date: formatDate(0),
    },
  ],
  plans: [
    { id: "plan-seed-1", category: "Groceries", cap: 260, note: "Weekly food and essentials." },
    { id: "plan-seed-2", category: "Transport", cap: 120, note: "Metro, fuel, and rides." },
    { id: "plan-seed-3", category: "Dining", cap: 180, note: "Coffee runs and meals out." },
  ],
  bills: [
    { id: "bill-seed-1", label: "Rent", amount: 980, dueDate: formatFutureDate(4) },
    { id: "bill-seed-2", label: "Electricity", amount: 68, dueDate: formatFutureDate(9) },
    { id: "bill-seed-3", label: "Internet", amount: 35, dueDate: formatFutureDate(14) },
  ],
  goals: [
    { id: "goal-seed-1", name: "Emergency fund", saved: 820, target: 2500, deadline: formatFutureDate(180) },
    { id: "goal-seed-2", name: "Summer trip", saved: 300, target: 900, deadline: formatFutureDate(120) },
  ],
  categories: {
    income: ["Salary", "Freelance", "Refund", "Other"],
    expense: ["Rent", "Groceries", "Transport", "Utilities", "Dining", "Subscriptions", "Savings", "Other"],
  },
}
