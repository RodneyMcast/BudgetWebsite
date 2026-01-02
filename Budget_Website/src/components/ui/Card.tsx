import React from "react"

type CardVariant = "default" | "nested" | "soft"
type CardElement = "section" | "div" | "article"

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: CardElement
  variant?: CardVariant
}

export default function Card({ as = "section", variant = "default", className = "", children, ...rest }: CardProps) {
  const Tag = as
  const classes = ["card", variant === "nested" ? "nested" : "", variant === "soft" ? "soft" : "", className]
    .filter(Boolean)
    .join(" ")

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}
