"use client"

import { useMemo, useState } from "react"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

import { PaymentDetailSheet } from "@/components/payment-detail-sheet"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PaymentAmount } from "@/components/payment-amount"
import { formatDateTime, methodLabel } from "@/lib/format"
import type { Payment, PaymentMethod, PaymentStatus } from "@/lib/types"

const PAGE_SIZE = 20

const STATUSES: PaymentStatus[] = ["settled", "refunded", "declined", "blocked", "pending", "expired"]
const METHODS: PaymentMethod[] = ["card", "ach", "pix", "crypto", "paypal", "interac"]

export function PaymentsTable({ payments }: { payments: Payment[] }) {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("all")
  const [method, setMethod] = useState("all")
  const [sort, setSort] = useState<"desc" | "asc">("desc")
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Payment | null>(null)

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const rows = payments.filter((payment) => {
      if (status !== "all" && payment.status !== status) return false
      if (method !== "all" && payment.paymentMethod !== method) return false
      if (!needle) return true
      return (
        payment.paymentId.toLowerCase().includes(needle) ||
        payment.customerEmail.toLowerCase().includes(needle)
      )
    })
    rows.sort((a, b) => (sort === "desc" ? b.createdAt.localeCompare(a.createdAt) : a.createdAt.localeCompare(b.createdAt)))
    return rows
  }, [payments, query, status, method, sort])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, pageCount)
  const start = (current - 1) * PAGE_SIZE
  const visible = filtered.slice(start, start + PAGE_SIZE)

  function resetPage() {
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <Input
          value={query}
          placeholder="Search payment ID or email"
          className="lg:max-w-sm"
          onChange={(event) => {
            setQuery(event.target.value)
            resetPage()
          }}
        />
        <FilterSelect
          value={status}
          onChange={(value) => {
            setStatus(value)
            resetPage()
          }}
          options={[["all", "All statuses"], ...STATUSES.map((item) => [item, item.replaceAll("_", " ")])]}
        />
        <FilterSelect
          value={method}
          onChange={(value) => {
            setMethod(value)
            resetPage()
          }}
          options={[["all", "All methods"], ...METHODS.map((item) => [item, item.charAt(0).toUpperCase() + item.slice(1)])]}
        />
        <div className="text-sm text-muted-foreground lg:ml-auto">
          {filtered.length.toLocaleString()} payment{filtered.length === 1 ? "" : "s"}
        </div>
      </div>

      <div className="rounded-xl bg-card ring-1 ring-foreground/10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-2"
                  onClick={() => setSort((value) => (value === "desc" ? "asc" : "desc"))}
                >
                  Created
                  {sort === "desc" ? <ArrowDownIcon /> : <ArrowUpIcon />}
                </Button>
              </TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No payments match this search.
                </TableCell>
              </TableRow>
            ) : (
              visible.map((payment) => (
                <TableRow key={payment.paymentId} className="cursor-pointer" onClick={() => setSelected(payment)}>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatDateTime(payment.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-xs">{payment.paymentId}</div>
                    <div className="text-xs text-muted-foreground">{payment.cardLast4 ? `···· ${payment.cardLast4}` : "No card"}</div>
                  </TableCell>
                  <TableCell className="max-w-[220px] truncate">{payment.customerEmail}</TableCell>
                  <TableCell>{methodLabel(payment.paymentMethod, payment.mobileWallet)}</TableCell>
                  <TableCell>
                    <StatusBadge status={payment.status} />
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    <PaymentAmount payment={payment} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filtered.length === 0 ? "0" : `${start + 1}–${Math.min(start + PAGE_SIZE, filtered.length)}`} of{" "}
          {filtered.length.toLocaleString()}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={current <= 1} onClick={() => setPage(current - 1)}>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled={current >= pageCount} onClick={() => setPage(current + 1)}>
            Next
          </Button>
        </div>
      </div>

      <PaymentDetailSheet payment={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </div>
  )
}

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (value: string) => void
  options: string[][]
}) {
  return (
    <Select
      value={value}
      onValueChange={(next) => {
        if (next) onChange(next)
      }}
    >
      <SelectTrigger className="w-full capitalize lg:w-44">
        <SelectValue>{(current) => options.find(([optionValue]) => optionValue === current)?.[1] ?? current}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map(([optionValue, label]) => (
          <SelectItem key={optionValue} value={optionValue}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
