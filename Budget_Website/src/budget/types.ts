export type TransactionType = "income" | "expense"

export interface Transaction {
  id: string
  type: TransactionType
  category: string
  amount: number
  description: string
  date: string
}

export interface BudgetState {
  transactions: Transaction[]
  categories: {
    income: string[]
    expense: string[]
  }
}

export type BudgetAction =
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "DELETE_TRANSACTION"; payload: string }
  | { type: "ADD_CATEGORY"; payload: { type: TransactionType; category: string } }

export interface Totals {
  income: number
  expense: number
  balance: number
}

export interface TransactionInput {
  type: TransactionType
  category: string
  amount: number
  description?: string
  date: string
}

export interface BudgetContextValue {
  state: BudgetState
  totals: Totals
  addTransaction: (input: TransactionInput) => void
  deleteTransaction: (id: string) => void
  addCategory: (type: TransactionType, category: string) => void
}
