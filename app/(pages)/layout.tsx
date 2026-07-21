
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";
export default function PageLayout({

    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <TooltipProvider delayDuration={0}>
        <SidebarProvider>
            <AppSidebar />
            <div className="flex flex-1 flex-col h-screen overflow-hidden">
           <Navbar />
          <main className="flex-1 overdlow-hidden">
            {children}
          </main>
        </div>
        </SidebarProvider>
        </TooltipProvider>
    )

}
