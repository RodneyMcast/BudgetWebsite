import React, { createContext, useContext, useMemo, useReducer } from "react"
import { initialState } from "./data/initialState"
import { budgetReducer } from "./state/budgetReducer"
import {
  BillReminder,
  BillReminderInput,
  BudgetContextValue,
  SavingsGoal,
  SavingsGoalInput,
  SpendingPlan,
  SpendingPlanInput,
  Transaction,
  TransactionInput,
  TransactionType,
} from "./types"

const BudgetContext = createContext<BudgetContextValue | undefined>(undefined)

function buildId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`
}

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(budgetReducer, initialState)

  const totals = useMemo(() => {
    const income = state.transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
    const expense = state.transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
    return { income, expense, balance: income - expense }
  }, [state.transactions])

  const addTransaction = (input: TransactionInput) => {
    const category = input.category.trim()
    const transaction: Transaction = {
      id: buildId("tx"),
      ...input,
      category,
      amount: Number.isFinite(input.amount) ? input.amount : 0,
      description: input.description?.trim() || "",
    }
    dispatch({ type: "ADD_TRANSACTION", payload: transaction })
    if (category) {
      dispatch({ type: "ADD_CATEGORY", payload: { type: transaction.type, category } })
    }
  }

  const updateTransaction = (id: string, input: TransactionInput) => {
    const category = input.category.trim()
    const updates: TransactionInput = {
      ...input,
      category,
      amount: Number.isFinite(input.amount) ? input.amount : 0,
      description: input.description?.trim() || "",
    }
    dispatch({ type: "UPDATE_TRANSACTION", payload: { id, updates } })
    if (category) {
      dispatch({ type: "ADD_CATEGORY", payload: { type: updates.type, category } })
    }
  }

  const deleteTransaction = (id: string) => dispatch({ type: "DELETE_TRANSACTION", payload: id })

  const addCategory = (type: TransactionType, category: string) => {
    const trimmed = category.trim()
    if (!trimmed) return
    dispatch({ type: "ADD_CATEGORY", payload: { type, category: trimmed } })
  }

  const addPlan = (input: SpendingPlanInput) => {
    const category = input.category.trim()
    if (!category) return
    const plan: SpendingPlan = {
      id: buildId("plan"),
      ...input,
      category,
      cap: Number.isFinite(input.cap) ? input.cap : 0,
      note: input.note?.trim() || "",
    }
    dispatch({ type: "ADD_PLAN", payload: plan })
    dispatch({ type: "ADD_CATEGORY", payload: { type: "expense", category } })
  }

  const removePlan = (id: string) => dispatch({ type: "REMOVE_PLAN", payload: id })

  const addBill = (input: BillReminderInput) => {
    const label = input.label.trim()
    if (!label) return
    const bill: BillReminder = {
      id: buildId("bill"),
      ...input,
      label,
      amount: Number.isFinite(input.amount) ? input.amount : 0,
      dueDate: input.dueDate,
    }
    dispatch({ type: "ADD_BILL", payload: bill })
  }

  const removeBill = (id: string) => dispatch({ type: "REMOVE_BILL", payload: id })

  const addGoal = (input: SavingsGoalInput) => {
    const name = input.name.trim()
    if (!name) return
    const goal: SavingsGoal = {
      id: buildId("goal"),
      ...input,
      name,
      target: Number.isFinite(input.target) ? input.target : 0,
      saved: Number.isFinite(input.saved) ? input.saved : 0,
      deadline: input.deadline,
    }
    dispatch({ type: "ADD_GOAL", payload: goal })
  }

  const removeGoal = (id: string) => dispatch({ type: "REMOVE_GOAL", payload: id })

  const value = useMemo(
    () => ({
      state,
      totals,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      addCategory,
      addPlan,
      removePlan,
      addBill,
      removeBill,
      addGoal,
      removeGoal,
    }),
    [state, totals],
  )

  return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
}

export function useBudget() {
  const ctx = useContext(BudgetContext)
  if (!ctx) throw new Error("useBudget must be used inside BudgetProvider")
  return ctx
}
