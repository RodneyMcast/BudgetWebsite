import React from "react"
import { useBudget } from "../../budget/BudgetProvider"
import BalanceCard from "./cards/BalanceCard"
import QuickStats from "./cards/QuickStats"
import CashflowTrendCard from "./cards/CashflowTrendCard"
import DailySpendCard from "./cards/DailySpendCard"
import CategoryMixCard from "./cards/CategoryMixCard"
import CategoryBreakdown from "./cards/CategoryBreakdown"
import SpendingPlanCard from "./cards/SpendingPlanCard"
import SavingsGoalsCard from "./cards/SavingsGoalsCard"
import RecentTransactions from "./cards/RecentTransactions"
import UpcomingBillsCard from "./cards/UpcomingBillsCard"
import SectionGroup from "../layout/SectionGroup"

export default function Dashboard() {
  const { state, totals } = useBudget()
  const recentCount = Math.min(5, state.transactions.length)

  return (
    <div className="stack gap-lg dashboard-grid">
      <SectionGroup
        id="overview"
        eyebrow="Overview"
        title="Snapshot"
        description="Balances and category mix at a glance."
        meta={`${state.transactions.length} payments`}
        defaultOpen
      >
        <BalanceCard totals={totals} />
        <QuickStats totals={totals} transactions={state.transactions} />
        <CategoryMixCard transactions={state.transactions} />
      </SectionGroup>

      <SectionGroup
        id="patterns"
        eyebrow="Patterns"
        title="Spending patterns"
        description="Cashflow and outflow from the last week."
        meta="Last 7 days"
        defaultOpen
      >
        <div className="grid two gap-md">
          <CashflowTrendCard transactions={state.transactions} />
          <DailySpendCard transactions={state.transactions} />
        </div>
        <CategoryBreakdown transactions={state.transactions} />
      </SectionGroup>

      <SectionGroup
        id="planning"
        eyebrow="Planning"
        title="Budgets and bills"
        description="Targets to keep spending aligned."
        meta={`${state.plans.length} plans | ${state.bills.length} bills | ${state.goals.length} goals`}
        defaultOpen={false}
      >
        <SpendingPlanCard />
        <div className="grid two gap-md">
          <SavingsGoalsCard />
          <UpcomingBillsCard />
        </div>
      </SectionGroup>

      <SectionGroup
        id="activity"
        eyebrow="Activity"
        title="Recent payments"
        description="Latest entries in your ledger."
        meta={`${recentCount} recent`}
        defaultOpen={false}
      >
        <RecentTransactions transactions={state.transactions.slice(0, 5)} />
      </SectionGroup>
    </div>
  )
}
