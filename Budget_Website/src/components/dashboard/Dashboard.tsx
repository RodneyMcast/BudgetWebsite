import React from "react"
import { useBudget } from "../../budget/BudgetProvider"
import BalanceCard from "./cards/BalanceCard"
import QuickStats from "./cards/QuickStats"
import CategoryBreakdown from "./cards/CategoryBreakdown"
import PaymentMethodsCard from "./cards/PaymentMethodsCard"
import InsightsCard from "./cards/InsightsCard"
import RecentTransactions from "./cards/RecentTransactions"
import UpcomingBillsCard from "./cards/UpcomingBillsCard"

export default function Dashboard() {
  const { state, totals } = useBudget()

  return (
    <div className="stack gap-lg">
      <BalanceCard totals={totals} />
      <QuickStats totals={totals} transactionCount={state.transactions.length} />
      <CategoryBreakdown transactions={state.transactions} />
      <div className="grid two gap-md">
        <PaymentMethodsCard />
        <InsightsCard />
      </div>
      <div className="grid two gap-md">
        <RecentTransactions transactions={state.transactions.slice(0, 5)} />
        <UpcomingBillsCard />
      </div>
    </div>
  )
}
