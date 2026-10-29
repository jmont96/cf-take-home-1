export type PaymentStatus =
  | "settled"
  | "refunded"
  | "declined"
  | "blocked"
  | "pending"
  | "expired"

export type PaymentMethod = "card" | "ach" | "pix" | "crypto" | "paypal" | "interac"

export type Payment = {
  paymentId: string
  createdAt: string
  status: PaymentStatus
  responseCode: string | null
  responseDescription: string | null
  currency: string
  amountCents: number
  feesCents: number
  refundedCents: number
  /** USD minor units at fixed synthetic FX. Same as `amountCents` when `currency` is `usd`. */
  amountUsdCents: number
  feesUsdCents: number
  refundedUsdCents: number
  customerId: string
  customerEmail: string
  paymentMethod: PaymentMethod
  mobileWallet: "applePay" | "googlePay" | "paze" | null
  processor: string | null
  cardBrand: "visa" | "mastercard" | "amex" | "discover" | null
  cardFunding: "credit" | "debit" | "prepaid" | null
  cardLast4: string | null
  walletDeviceLast4: string | null
  bin: string | null
  binCountry: string | null
  issuerName: string | null
  threeDS: "required" | "exempt" | "not_applicable" | null
  ipCountry: string | null
  ipIsProxy: boolean
}
