import { OverviewDashboard } from "@/components/overview-dashboard"
import { PageHeader } from "@/components/page-header"
import { getPayments } from "@/lib/payments"

export default function OverviewPage() {
  return (
    <>
      <PageHeader title="Overview" description="Volume and approval rate for Northwind Outfitters." />
      <OverviewDashboard payments={getPayments()} />
    </>
  )
}
