
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";

import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { Spinner } from "@/components/ui/spinner";
export default async function PageLayout({

    children,
}: Readonly<{
    children: React.ReactNode
}>) {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
         return (
            <div className='flex h-full w-full items-center justify-center '>
                <Spinner />
            </div>
        )
    }
    return (
        <TooltipProvider delayDuration={0}>
            <SidebarProvider>
                <AppSidebar user={session.user} />
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
