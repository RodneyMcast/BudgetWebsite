import { BudgetAction, BudgetState } from "../types"

export function budgetReducer(state: BudgetState, action: BudgetAction): BudgetState {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return { ...state, transactions: [action.payload, ...state.transactions] }
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
    default:
      return state
  }
}
