import { BudgetAction, BudgetState } from "../types"

export function budgetReducer(state: BudgetState, action: BudgetAction): BudgetState {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return { ...state, transactions: [action.payload, ...state.transactions] }
    case "UPDATE_TRANSACTION": {
      const { id, updates } = action.payload
      return {
        ...state,
        transactions: state.transactions.map((tx) =>
          tx.id === id ? { ...tx, ...updates, description: updates.description?.trim() || "" } : tx,
        ),
      }
    }
    case "DELETE_TRANSACTION":
      return { ...state, transactions: state.transactions.filter((tx) => tx.id !== action.payload) }
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.payload.type]: [...new Set([...state.categories[action.payload.type], action.payload.category])],
        },
      }
    case "ADD_PLAN":
      return { ...state, plans: [action.payload, ...state.plans] }
    case "REMOVE_PLAN":
      return { ...state, plans: state.plans.filter((plan) => plan.id !== action.payload) }
    case "ADD_BILL":
      return { ...state, bills: [action.payload, ...state.bills] }
    case "REMOVE_BILL":
      return { ...state, bills: state.bills.filter((bill) => bill.id !== action.payload) }
    case "ADD_GOAL":
      return { ...state, goals: [action.payload, ...state.goals] }
    case "REMOVE_GOAL":
      return { ...state, goals: state.goals.filter((goal) => goal.id !== action.payload) }
    default:
      return state
  }
}
