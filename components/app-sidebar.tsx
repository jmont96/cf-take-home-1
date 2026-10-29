"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ClipboardListIcon, LayoutDashboardIcon, ReceiptIcon } from "lucide-react"

import { AssignmentSummaryPopover } from "@/components/assignment-summary-popover"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  { href: "/", label: "Overview", icon: LayoutDashboardIcon },
  { href: "/payments", label: "Payments", icon: ReceiptIcon },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
            N
          </div>
          <span className="text-sm font-semibold tracking-tight">Northwind</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton render={<Link href={item.href} />} isActive={pathname === item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <AssignmentSummaryPopover
                  placement="sidebar"
                  trigger={
                    <SidebarMenuButton type="button">
                      <ClipboardListIcon />
                      <span>Assignment</span>
                    </SidebarMenuButton>
                  }
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
