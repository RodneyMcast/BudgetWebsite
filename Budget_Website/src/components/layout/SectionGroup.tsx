import React, { useEffect, useState } from "react"

interface SectionGroupProps {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  meta?: string
  defaultOpen?: boolean
  children: React.ReactNode
}

export default function SectionGroup({
  id,
  eyebrow,
  title,
  description,
  meta,
  defaultOpen = true,
  children,
}: SectionGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  useEffect(() => {
    if (!id || typeof window === "undefined") return
    const hash = `#${id}`
    const handleHash = () => {
      if (window.location.hash === hash) setIsOpen(true)
    }
    handleHash()
    window.addEventListener("hashchange", handleHash)
    return () => window.removeEventListener("hashchange", handleHash)
  }, [id])

  return (
    <details
      className="section-card"
      id={id}
      open={isOpen}
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
    >
      <summary className="section-header">
        <div className="section-title">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h3>{title}</h3>
          {description && <p className="muted">{description}</p>}
        </div>
        {meta && <p className="section-meta">{meta}</p>}
        <span className="section-toggle" aria-hidden="true" />
      </summary>
      <div className="section-body">{children}</div>
    </details>
  )
}
