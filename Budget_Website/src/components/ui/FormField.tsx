import React from "react"

interface FormFieldProps {
  label: string
  hint?: string
  children: React.ReactNode
}

export default function FormField({ label, hint, children }: FormFieldProps) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {hint && <span className="field-hint">{hint}</span>}
    </label>
  )
}
