export const formatDateKey = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export const formatShortDate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${month}/${day}`
}

export const buildRecentDays = (count: number) => {
  const today = new Date()
  const days: { key: string; label: string }[] = []

  for (let offset = count - 1; offset >= 0; offset -= 1) {
    const current = new Date(today)
    current.setDate(today.getDate() - offset)
    days.push({ key: formatDateKey(current), label: formatShortDate(current) })
  }

  return days
}

export const formatMonthYear = (date = new Date()) =>
  new Intl.DateTimeFormat("en-IE", { month: "long", year: "numeric" }).format(date)

export const formatLongDate = (value: string | Date) => {
  const date = typeof value === "string" ? new Date(value) : value
  if (Number.isNaN(date.getTime())) return ""
  return new Intl.DateTimeFormat("en-IE", { day: "2-digit", month: "short" }).format(date)
}

export const formatMonthShort = (value: string | Date) => {
  const date = typeof value === "string" ? new Date(value) : value
  if (Number.isNaN(date.getTime())) return ""
  return new Intl.DateTimeFormat("en-IE", { month: "short", year: "numeric" }).format(date)
}

export const formatDueIn = (value: string) => {
  if (!value) return ""
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  date.setHours(0, 0, 0, 0)
  const diffDays = Math.round((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays < 0) return "Overdue"
  if (diffDays === 0) return "Due today"
  if (diffDays === 1) return "Due tomorrow"
  return `Due in ${diffDays} days`
}
