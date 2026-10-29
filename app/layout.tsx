import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { AppSidebar } from "@/components/app-sidebar"
import { AssignmentSummaryPopover } from "@/components/assignment-summary-popover"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

import "./globals.css"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Northwind",
    template: "%s · Northwind",
  },
  description: "Merchant portal for Northwind Outfitters.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-svh bg-background text-foreground">
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="min-w-0">
              <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger />
                <Separator orientation="vertical" className="h-4" />
                <span className="text-sm text-muted-foreground">Northwind Outfitters</span>
                <div className="ml-auto">
                  <AssignmentSummaryPopover />
                </div>
              </header>
              <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 md:px-8">{children}</main>
            </SidebarInset>
          </SidebarProvider>
          <Toaster theme="light" position="top-right" />
        </TooltipProvider>
      </body>
    </html>
  )
}
