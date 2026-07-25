"use client"
import * as React from "react"
import {
    IconEdit,
  IconInnerShadowTop,
  IconBooks,
} from "@tabler/icons-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


  const navMain= [
    {
      title: "New Chat",
      url: "/chat",
      icon: IconEdit,
    },
    {
      title: "Library",
      url: "/library",
      icon: IconBooks,
    },
  ]

interface SidebarUserData {
  name: string
  email: string
  avatar?: string
}
 
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: SidebarUserData 
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props} >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">Digest</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
