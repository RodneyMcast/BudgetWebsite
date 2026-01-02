export type TransactionType = "income" | "expense"

export interface Transaction {
  id: string
  type: TransactionType
  category: string
  amount: number
  description: string
  date: string
}

export interface SpendingPlan {
  id: string
  category: string
  cap: number
  note: string
}

export interface BillReminder {
  id: string
  label: string
  amount: number
  dueDate: string
}

export interface SavingsGoal {
  id: string
  name: string
  target: number
  saved: number
  deadline: string
}

export interface BudgetState {
  transactions: Transaction[]
  plans: SpendingPlan[]
  bills: BillReminder[]
  goals: SavingsGoal[]
  categories: {
    income: string[]
    expense: string[]
  }
}

export type BudgetAction =
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "UPDATE_TRANSACTION"; payload: { id: string; updates: TransactionInput } }
  | { type: "DELETE_TRANSACTION"; payload: string }
  | { type: "ADD_CATEGORY"; payload: { type: TransactionType; category: string } }
  | { type: "ADD_PLAN"; payload: SpendingPlan }
  | { type: "REMOVE_PLAN"; payload: string }
  | { type: "ADD_BILL"; payload: BillReminder }
  | { type: "REMOVE_BILL"; payload: string }
  | { type: "ADD_GOAL"; payload: SavingsGoal }
  | { type: "REMOVE_GOAL"; payload: string }

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

export type SpendingPlanInput = Omit<SpendingPlan, "id">
export type BillReminderInput = Omit<BillReminder, "id">
export type SavingsGoalInput = Omit<SavingsGoal, "id">

export interface BudgetContextValue {
  state: BudgetState
  totals: Totals
  addTransaction: (input: TransactionInput) => void
  updateTransaction: (id: string, input: TransactionInput) => void
  deleteTransaction: (id: string) => void
  addCategory: (type: TransactionType, category: string) => void
  addPlan: (input: SpendingPlanInput) => void
  removePlan: (id: string) => void
  addBill: (input: BillReminderInput) => void
  removeBill: (id: string) => void
  addGoal: (input: SavingsGoalInput) => void
  removeGoal: (id: string) => void
}
