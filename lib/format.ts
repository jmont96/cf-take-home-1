const ZERO_DECIMAL = new Set(["jpy"])

export function formatMoney(amountCents: number, currency: string) {
  const code = currency.toLowerCase()
  const value = ZERO_DECIMAL.has(code) ? amountCents : amountCents / 100
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code.toUpperCase(),
  }).format(value)
}

export function formatDateTime(iso: string | null) {
  if (!iso) return "—"
  const formatted = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(iso))
  return `${formatted} UTC`
}

export function formatDate(iso: string | null) {
  if (!iso) return "—"
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso))
}

export function formatPercent(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(value)
}

export function titleLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

export function methodLabel(method: string, wallet?: string | null) {
  if (wallet === "applePay") return "Apple Pay"
  if (wallet === "googlePay") return "Google Pay"
  if (wallet === "paze") return "Paze"
  return titleLabel(method)
}
