import React from "react"

type HeadingLevel = "h2" | "h3" | "h4"

interface CardHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  headingLevel?: HeadingLevel
  side?: React.ReactNode
  className?: string
}

export default function CardHeader({
  eyebrow,
  title,
  description,
  headingLevel = "h3",
  side,
  className = "",
}: CardHeaderProps) {
  const TitleTag = headingLevel
  const classes = ["card-header", className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <div className="card-header-main">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <TitleTag className="card-title">{title}</TitleTag>
        {description && <p className="muted">{description}</p>}
      </div>
      {side && <div className="card-header-side">{side}</div>}
    </div>
  )
}
