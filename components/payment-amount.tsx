import { formatMoney } from "@/lib/format"
import type { Payment } from "@/lib/types"

export function PaymentAmount({ payment, className }: { payment: Payment; className?: string }) {
  const isUsd = payment.currency.toLowerCase() === "usd"
  return (
    <div className={className}>
      <div className="tabular-nums">{formatMoney(payment.amountCents, payment.currency)}</div>
      {!isUsd ? (
        <div className="text-xs text-muted-foreground tabular-nums">{formatMoney(payment.amountUsdCents, "usd")}</div>
      ) : null}
    </div>
  )
}
