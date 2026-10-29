"use client"

import { StatusBadge } from "@/components/status-badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { formatDateTime, formatMoney, methodLabel, titleLabel } from "@/lib/format"
import type { Payment } from "@/lib/types"

export function PaymentDetailSheet({
  payment,
  onOpenChange,
}: {
  payment: Payment | null
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Sheet open={payment !== null} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto sm:max-w-md">
        {payment ? (
          <>
            <SheetHeader>
              <SheetDescription>Payment</SheetDescription>
              <SheetTitle className="font-mono text-sm">{payment.paymentId}</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 px-4 pb-6">
              <div className="flex items-center justify-between gap-3">
                <div className="text-2xl font-semibold tabular-nums">
                  {formatMoney(payment.amountCents, payment.currency)}
                </div>
                <StatusBadge status={payment.status} />
              </div>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <Field label="Created" value={formatDateTime(payment.createdAt)} />
                <Field label="Customer" value={payment.customerEmail} />
                <Field label="Customer ID" value={payment.customerId} mono />
                <Field label="Method" value={methodLabel(payment.paymentMethod, payment.mobileWallet)} />
                <Field label="Processor" value={payment.processor ?? "—"} />
                <Field label="Card" value={cardLine(payment)} />
                <Field label="Wallet device" value={payment.walletDeviceLast4 ? `···· ${payment.walletDeviceLast4}` : "—"} />
                <Field label="BIN" value={payment.bin ?? "—"} />
                <Field label="BIN country" value={payment.binCountry ?? "—"} />
                <Field label="Issuer" value={payment.issuerName ?? "—"} />
                <Field label="Funding" value={payment.cardFunding ? titleLabel(payment.cardFunding) : "—"} />
                <Field label="3-D Secure" value={payment.threeDS ? titleLabel(payment.threeDS) : "—"} />
                <Field label="IP country" value={payment.ipCountry ?? "—"} />
                <Field label="Proxy IP" value={payment.ipIsProxy ? "Yes" : "No"} />
                {payment.currency.toLowerCase() !== "usd" ? (
                  <Field label="Amount (USD)" value={formatMoney(payment.amountUsdCents, "usd")} />
                ) : null}
                <Field label="Fees" value={formatMoney(payment.feesCents, payment.currency)} />
                {payment.currency.toLowerCase() !== "usd" ? (
                  <Field label="Fees (USD)" value={formatMoney(payment.feesUsdCents, "usd")} />
                ) : null}
                <Field label="Refunded" value={formatMoney(payment.refundedCents, payment.currency)} />
                {payment.refundedCents > 0 && payment.currency.toLowerCase() !== "usd" ? (
                  <Field label="Refunded (USD)" value={formatMoney(payment.refundedUsdCents, "usd")} />
                ) : null}
                <Field label="Response" value={payment.responseCode ? `${payment.responseCode} · ${payment.responseDescription ?? ""}` : "—"} />
              </dl>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}

function cardLine(payment: Payment) {
  if (!payment.cardBrand && !payment.cardLast4) return "—"
  const brand = payment.cardBrand ? titleLabel(payment.cardBrand) : "Card"
  return payment.cardLast4 ? `${brand} ···· ${payment.cardLast4}` : brand
}

function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className={mono ? "truncate font-mono text-xs" : "truncate"}>{value}</dd>
    </div>
  )
}
