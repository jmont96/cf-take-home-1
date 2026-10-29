import { Badge } from "@/components/ui/badge"
import { titleLabel } from "@/lib/format"
import { cn } from "cn"

const tones: Record<string, string> = {
  settled: "border-emerald-200 bg-emerald-50 text-emerald-800",
  won: "border-emerald-200 bg-emerald-50 text-emerald-800",
  approved: "border-emerald-200 bg-emerald-50 text-emerald-800",
  active: "border-emerald-200 bg-emerald-50 text-emerald-800",
  completed: "border-emerald-200 bg-emerald-50 text-emerald-800",
  paid: "border-emerald-200 bg-emerald-50 text-emerald-800",
  refunded: "border-sky-200 bg-sky-50 text-sky-800",
  pending: "border-amber-200 bg-amber-50 text-amber-800",
  under_review: "border-amber-200 bg-amber-50 text-amber-800",
  invited: "border-amber-200 bg-amber-50 text-amber-800",
  in_transit: "border-amber-200 bg-amber-50 text-amber-800",
  submitted: "border-sky-200 bg-sky-50 text-sky-800",
  open: "border-amber-200 bg-amber-50 text-amber-800",
  declined: "border-rose-200 bg-rose-50 text-rose-800",
  blocked: "border-rose-200 bg-rose-50 text-rose-900",
  failed: "border-rose-200 bg-rose-50 text-rose-800",
  lost: "border-rose-200 bg-rose-50 text-rose-800",
  overdue: "border-rose-200 bg-rose-50 text-rose-800",
  reversed: "border-zinc-200 bg-zinc-100 text-zinc-700",
  expired: "border-zinc-200 bg-zinc-100 text-zinc-700",
  withdrawn: "border-zinc-200 bg-zinc-100 text-zinc-700",
  accepted: "border-zinc-200 bg-zinc-100 text-zinc-700",
  closed: "border-zinc-200 bg-zinc-100 text-zinc-700",
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="outline" className={cn("capitalize", tones[status])}>
      {titleLabel(status)}
    </Badge>
  )
}
