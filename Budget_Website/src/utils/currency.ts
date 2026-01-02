const currencyFormatter = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const currencyFormatterRounded = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
})

const currencyFormatterSigned = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  signDisplay: "always",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const formatCurrency = (value: number) => currencyFormatter.format(value)

export const formatCurrencyRounded = (value: number) => currencyFormatterRounded.format(value)

export const formatSignedCurrency = (value: number) => currencyFormatterSigned.format(value)
