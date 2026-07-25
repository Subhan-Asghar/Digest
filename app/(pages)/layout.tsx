
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";
export default async function PageLayout({

    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <TooltipProvider delayDuration={0}>
            <SidebarProvider>
                <AppSidebar  />
                <div className="flex flex-1 flex-col min-h-screen w-full">
                    <Navbar />
                    <main className="flex-1 overflow-y-auto ">
                        {children}
                    </main>
                </div>
            </SidebarProvider>
        </TooltipProvider>
    )

}
