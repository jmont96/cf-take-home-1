import { PageHeader } from "@/components/page-header"
import { PaymentsTable } from "@/components/payments-table"
import { getPayments } from "@/lib/payments"

export const metadata = { title: "Payments" }

export default function PaymentsPage() {
  return (
    <>
      <PageHeader title="Payments" description="Search by payment ID or customer email." />
      <PaymentsTable payments={getPayments()} />
    </>
  )
}
