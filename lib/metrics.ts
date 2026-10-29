import type { Payment } from "@/lib/types"

export function paymentsInRange(payments: Payment[], from: string, to: string) {
  return payments.filter((payment) => {
    const day = payment.createdAt.slice(0, 10)
    return day >= from && day <= to
  })
}

export function grossVolumeCents(payments: Payment[]) {
  return payments
    .filter((payment) => payment.status === "settled")
    .reduce((sum, payment) => sum + payment.amountCents, 0)
}

export function approvalRate(payments: Payment[]) {
  if (payments.length === 0) return 0
  const settled = payments.filter((payment) => payment.status === "settled").length
  return settled / payments.length
}
