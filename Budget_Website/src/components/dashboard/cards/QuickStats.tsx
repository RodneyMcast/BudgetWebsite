import React, { useMemo } from "react"
import { Totals, Transaction } from "../../../budget/types"
import { formatCurrencyRounded } from "../../../utils/currency"
import Card from "../../ui/Card"
import CardHeader from "../../ui/CardHeader"
import StatTile from "../../ui/StatTile"

interface QuickStatsProps {
  totals: Totals
  transactions: Transaction[]
}

export default function QuickStats({ totals, transactions }: QuickStatsProps) {
  const snapshot = useMemo(() => {
    const expenseTransactions = transactions.filter((tx) => tx.type === "expense")
    const averageExpense = expenseTransactions.length ? totals.expense / expenseTransactions.length : 0
    const savingsRate = totals.income ? Math.round(((totals.income - totals.expense) / totals.income) * 100) : 0

    return {
      transactionCount: transactions.length,
      averageExpense,
      savingsRate,
    }
  }, [transactions, totals.expense, totals.income])

  return (
    <Card>
      <CardHeader eyebrow="Snapshot" title="Quick stats" description="Small signals you can remix across layouts." />
      <div className="stat-grid">
        <StatTile
          label="Entries"
          value={`${snapshot.transactionCount}`}
          helper="Logged items"
          tone="accent"
        />
        <StatTile
          label="Avg spend"
          value={formatCurrencyRounded(snapshot.averageExpense)}
          helper="Per expense"
          tone="warm"
        />
        <StatTile
          label="Savings rate"
          value={`${snapshot.savingsRate}%`}
          helper="Income retained"
          tone="cool"
        />
      </div>
    </Card>
  )
}
