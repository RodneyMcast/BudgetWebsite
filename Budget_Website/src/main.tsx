import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { BudgetProvider } from "./budget/BudgetProvider"
import "./index.css"

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BudgetProvider>
      <App />
    </BudgetProvider>
  </React.StrictMode>
)
