# Northwind merchant portal

A light-mode payments dashboard for a fictional merchant, Northwind Outfitters, built with [shadcn/ui](https://ui.shadcn.com). It is the starter for a one-hour exercise.

## Your tickets

Work on both product tickets below; stop at 60 minutes.

**1.**

> Merchants want the ability to search payments by the last 4 of the card number.

**2.**

> Merchants want a way to visualize their card approval rates so they can understand how many payments are getting declined and how much revenue they are losing on card payments. They want to know the approval rates on count and on dollar amount.

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Treat **2026-10-28T21:00:00.000Z** as the current time (`portalNow()` in `lib/portal-now.ts`). Northwind's finance team works in **America/Chicago**. The UI currently shows timestamps in UTC.

## Pages

- **Overview** — settled volume, payment count, approval rate, and a daily chart for a date range.
- **Payments** — searchable, filterable table. A row opens the payment. Search matches payment id and customer email.

## Data

About 1,200 synthetic payments in `data/payments.json`, newest first. `getPayments()` returns them and `listPayments({ limit, cursor })` pages them (`lib/payments.ts`, server-only). Amounts are minor units. For zero-decimal currencies such as `jpy`, the field is already the major unit. Full card numbers are not in the data and should not be added.

| Field | Meaning |
| --- | --- |
| `paymentId` | `pay_…` |
| `createdAt` | ISO 8601, UTC |
| `status` | `settled`, `refunded`, `declined`, `blocked`, `pending`, `expired` |
| `responseCode`, `responseDescription` | See below. Null while pending. |
| `currency` | ISO code, lowercase |
| `amountCents`, `feesCents`, `refundedCents` | In the payment's `currency`. Minor units except `jpy` (whole yen). `refundedCents` is `0` when nothing was refunded. |
| `amountUsdCents`, `feesUsdCents`, `refundedUsdCents` | Same amounts in USD minor units at fixed synthetic FX. When `currency` is `usd`, these match the fields above. |
| `customerId`, `customerEmail` | Buyer. One email can belong to more than one customer id. |
| `paymentMethod` | `card`, `ach`, `pix`, `crypto`, `paypal`, `interac` |
| `mobileWallet` | `applePay`, `googlePay`, `paze`, or null |
| `processor` | Card payments only. Fictional names. |
| `cardBrand`, `cardFunding`, `cardLast4`, `bin`, `binCountry`, `issuerName` | Null when the method is not a card |
| `walletDeviceLast4` | Device-token last four. Wallet payments only, and not the same as `cardLast4`. |
| `threeDS` | `required`, `exempt`, `not_applicable`, or null |
| `ipCountry`, `ipIsProxy` | Buyer IP |

Statuses:

- `settled` — succeeded.
- `refunded` — succeeded, then fully refunded. A partial refund stays `settled` with `refundedCents > 0`.
- `declined` — the bank or processor said no.
- `blocked` — stopped by fraud rules before the bank.
- `pending` — still in flight.
- `expired` — the buyer never finished it (Pix and crypto).

Response codes: `00` approved, `05` do not honor, `14` invalid card number, `41` lost card, `43` stolen card, `51` insufficient funds, `54` expired card, `57` transaction not permitted, `91` issuer unavailable, `96` system malfunction, `RISK_REJECTED` blocked by fraud rules, `R01` / `R02` / `R10` ACH insufficient funds / account closed / unauthorized, `UNDERPAID` crypto amount too low, `EXPIRED` deposit window closed.

## What to hand back

Stop at 60 minutes. Leave unfinished ideas as a list instead of rushing them in.

Leave a 3–4 sentence reply to your manager: what you built, what you assumed, and what you would do next.

