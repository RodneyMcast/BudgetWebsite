import React, { useEffect, useState } from "react"
import type { TransactionType } from "../../budget/types"
import SegmentedControl from "../ui/SegmentedControl"
import AddTransactionForm from "../transactions/AddTransactionForm"
import AddBillReminderForm from "./AddBillReminderForm"
import AddSavingsGoalForm from "./AddSavingsGoalForm"
import AddSpendingPlanForm from "./AddSpendingPlanForm"

type AddMode = "payment" | "plan" | "bill" | "goal"

type TransactionPreset = {
  type?: TransactionType
  category?: string
  description?: string
  amount?: string
  date?: string
}

interface AddWorkspaceProps {
  preset?: TransactionPreset
  onComplete?: () => void
  initialMode?: AddMode
}

const options = [
  { value: "payment", label: "Payment" },
  { value: "plan", label: "Plan" },
  { value: "bill", label: "Bill" },
  { value: "goal", label: "Goal" },
]

export default function AddWorkspace({ preset, onComplete, initialMode }: AddWorkspaceProps) {
  const [mode, setMode] = useState<AddMode>(initialMode ?? "payment")

  useEffect(() => {
    if (initialMode) setMode(initialMode)
  }, [initialMode])

  useEffect(() => {
    if (preset) setMode("payment")
  }, [preset])

  return (
    <div className="stack gap-md">
      <SegmentedControl value={mode} options={options} onChange={(value) => setMode(value as AddMode)} />

      {mode === "payment" && <AddTransactionForm preset={preset} onSubmitComplete={onComplete} />}
      {mode === "plan" && <AddSpendingPlanForm onComplete={onComplete} />}
      {mode === "bill" && <AddBillReminderForm onComplete={onComplete} />}
      {mode === "goal" && <AddSavingsGoalForm onComplete={onComplete} />}
    </div>
  )
}
