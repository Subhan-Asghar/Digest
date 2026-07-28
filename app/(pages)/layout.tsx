"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { authClient } from "@/lib/auth-client";
import { useSession } from "@/store/useSession";
import { Spinner } from "@/components/ui/spinner";
import Navbar from "@/components/sidebar/navbar";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { user, setUser } = useSession();
  const { data: session, isPending } = authClient.useSession();

 
  React.useEffect(() => {
    if (session?.user && JSON.stringify(user) !== JSON.stringify(session.user)) {
      setUser(session.user);
    }
  }, [session, setUser]); 

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }


  if (!session?.user) {
    router.push("/signin"); 
    return null;
  }

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-1 flex-col min-h-screen w-full">
          <Navbar />
          <main className="flex-1 flex flex-col overflow-hidden">
  {children}
</main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}