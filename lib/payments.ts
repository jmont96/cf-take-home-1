import "server-only"

import paymentsJson from "@/data/payments.json"
import type { Payment } from "@/lib/types"

let cached: Payment[] | null = null

export function getPayments(): Payment[] {
  if (!cached) cached = paymentsJson as Payment[]
  return cached
}

export function getPayment(paymentId: string) {
  return getPayments().find((payment) => payment.paymentId === paymentId) ?? null
}

export function listPayments({ limit = 50, cursor }: { limit?: number; cursor?: string } = {}) {
  const all = getPayments()
  const start = cursor ? all.findIndex((payment) => payment.paymentId === cursor) + 1 : 0
  const safeStart = start < 0 ? 0 : start
  const payments = all.slice(safeStart, safeStart + limit)
  const nextCursor = payments.length === limit ? payments[payments.length - 1]?.paymentId ?? null : null
  return { payments, nextCursor }
}
