"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PaymentAmount } from "@/components/payment-amount"
import { formatDateTime, formatMoney, formatPercent, methodLabel } from "@/lib/format"
import { approvalRate, grossVolumeCents, paymentsInRange } from "@/lib/metrics"
import type { Payment } from "@/lib/types"

const chartConfig = {
  volume: { label: "Settled volume", color: "var(--chart-2)" },
} satisfies ChartConfig

export function OverviewDashboard({ payments }: { payments: Payment[] }) {
  const [from, setFrom] = useState("2026-09-28")
  const [to, setTo] = useState("2026-10-28")
  const range = useMemo(() => paymentsInRange(payments, from, to), [payments, from, to])

  const chartData = useMemo(() => {
    const totals = new Map<string, number>()
    const cursor = new Date(`${from}T00:00:00.000Z`)
    const end = new Date(`${to}T00:00:00.000Z`)
    while (cursor <= end) {
      totals.set(cursor.toISOString().slice(0, 10), 0)
      cursor.setUTCDate(cursor.getUTCDate() + 1)
    }
    for (const payment of range) {
      if (payment.status !== "settled") continue
      const day = payment.createdAt.slice(0, 10)
      totals.set(day, (totals.get(day) ?? 0) + payment.amountCents / 100)
    }
    return [...totals.entries()].map(([day, volume]) => ({ day, volume }))
  }, [range, from, to])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Input type="date" aria-label="From" value={from} onChange={(event) => setFrom(event.target.value)} className="w-40" />
        <span className="text-sm text-muted-foreground">to</span>
        <Input type="date" aria-label="To" value={to} onChange={(event) => setTo(event.target.value)} className="w-40" />
        <span className="ml-1 text-xs text-muted-foreground">UTC</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Settled volume" value={formatMoney(grossVolumeCents(range), "usd")} />
        <Metric label="Payments" value={range.length.toLocaleString()} />
        <Metric label="Approval rate" value={formatPercent(approvalRate(range))} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Settled volume</CardTitle>
          <CardDescription>Per day, for the selected dates.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="aspect-auto h-60 w-full">
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={24}
                tickFormatter={(value) => String(value).slice(5)}
              />
              <ChartTooltip
                content={<ChartTooltipContent formatter={(value) => formatMoney(Math.round(Number(value) * 100), "usd")} />}
              />
              <Bar dataKey="volume" fill="var(--color-volume)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent payments</CardTitle>
          <CardDescription>Newest in the selected dates.</CardDescription>
          <div className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
            <Button variant="outline" size="sm" nativeButton={false} render={<Link href="/payments" />}>
              View all
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Created</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {range.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-20 text-center text-muted-foreground">
                    No payments in this range.
                  </TableCell>
                </TableRow>
              ) : (
                range.slice(0, 6).map((payment) => (
                  <TableRow key={payment.paymentId}>
                    <TableCell className="whitespace-nowrap text-muted-foreground">{formatDateTime(payment.createdAt)}</TableCell>
                    <TableCell className="max-w-60 truncate">{payment.customerEmail}</TableCell>
                    <TableCell>{methodLabel(payment.paymentMethod, payment.mobileWallet)}</TableCell>
                    <TableCell>
                      <StatusBadge status={payment.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <PaymentAmount payment={payment} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums">{value}</CardTitle>
      </CardHeader>
    </Card>
  )
}
