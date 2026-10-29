"use client"

import type { ReactElement } from "react"
import { ClipboardListIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { assignmentSummary } from "@/lib/assignment"

function AssignmentSummaryBody() {
  return (
    <ScrollArea className="max-h-[min(28rem,calc(100vh-6rem))]">
      <div className="flex flex-col gap-3 p-3">
        <PopoverHeader>
          <PopoverTitle>{assignmentSummary.title}</PopoverTitle>
          <PopoverDescription>{assignmentSummary.intro}</PopoverDescription>
        </PopoverHeader>
        <ol className="list-decimal space-y-3 pl-4 text-sm">
          {assignmentSummary.tickets.map((ticket) => (
            <li key={ticket} className="pl-1">
              <blockquote className="border-l-2 border-border pl-3 text-foreground not-italic">{ticket}</blockquote>
            </li>
          ))}
        </ol>
        <p className="text-xs leading-relaxed text-muted-foreground">{assignmentSummary.handback}</p>
        <p className="text-xs text-muted-foreground">
          Field definitions and setup: <span className="font-mono">README.md</span> in the repo.
        </p>
      </div>
    </ScrollArea>
  )
}

export function AssignmentSummaryPopover({
  trigger,
  placement = "header",
}: {
  trigger?: ReactElement
  placement?: "header" | "sidebar"
}) {
  const defaultTrigger = (
    <Button variant="outline" size="sm" type="button">
      <ClipboardListIcon data-icon="inline-start" />
      Assignment
    </Button>
  )

  const contentProps =
    placement === "sidebar"
      ? { align: "start" as const, side: "right" as const }
      : { align: "end" as const, side: "bottom" as const }

  return (
    <Popover>
      <PopoverTrigger render={trigger ?? defaultTrigger} />
      <PopoverContent {...contentProps} className="w-[min(24rem,calc(100vw-2rem))] p-0">
        <AssignmentSummaryBody />
      </PopoverContent>
    </Popover>
  )
}
