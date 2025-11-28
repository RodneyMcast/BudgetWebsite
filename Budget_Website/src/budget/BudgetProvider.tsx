import React, { createContext, useContext, useMemo, useReducer } from "react"
import { initialState } from "./data/initialState"
import { budgetReducer } from "./state/budgetReducer"
import { BudgetContextValue, Transaction, TransactionInput, TransactionType } from "./types"

const BudgetContext = createContext<BudgetContextValue | undefined>(undefined)

function buildId() {
  return `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`
}

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(budgetReducer, initialState)

  const totals = useMemo(() => {
    const income = state.transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
    const expense = state.transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
    return { income, expense, balance: income - expense }
  }, [state.transactions])

  const addTransaction = (input: TransactionInput) => {
    const transaction: Transaction = {
      id: buildId(),
      ...input,
      amount: Number.isFinite(input.amount) ? input.amount : 0,
      description: input.description?.trim() || "",
    }
    dispatch({ type: "ADD_TRANSACTION", payload: transaction })
  }

  const deleteTransaction = (id: string) => dispatch({ type: "DELETE_TRANSACTION", payload: id })

  const addCategory = (type: TransactionType, category: string) => {
    const trimmed = category.trim()
    if (!trimmed) return
    dispatch({ type: "ADD_CATEGORY", payload: { type, category: trimmed } })
  }

  const value = useMemo(
    () => ({
      state,
      totals,
      addTransaction,
      deleteTransaction,
      addCategory,
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
