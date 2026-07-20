
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TooltipProvider } from "@/components/ui/tooltip";
export default function PageLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <TooltipProvider delayDuration={0}>
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            <main>{children}</main>
        </SidebarProvider>
        </TooltipProvider>
    )

}
