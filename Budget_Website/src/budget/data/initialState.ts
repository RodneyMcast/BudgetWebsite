import { BudgetState } from "../types"

export const initialState: BudgetState = {
  transactions: [
    {
      id: "tx-sample-1",
      type: "income",
      category: "Paycheck",
      amount: 3200,
      description: "Monthly salary placeholder",
      date: "2024-10-28",
    },
    {
      id: "tx-sample-2",
      type: "expense",
      category: "Rent",
      amount: 1200,
      description: "Example fixed cost",
      date: "2024-11-01",
    },
    {
      id: "tx-sample-3",
      type: "expense",
      category: "Groceries",
      amount: 180,
      description: "Weekly food run",
      date: "2024-11-12",
    },
  ],
  categories: {
    income: ["Paycheck", "Freelance", "Investments", "Other"],
    expense: ["Rent", "Groceries", "Transport", "Leisure", "Utilities", "Other"],
  },
}
