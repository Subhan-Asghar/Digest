"use client"
import * as React from "react"
import {
    IconEdit,
  IconInnerShadowTop,
  IconBooks,
} from "@tabler/icons-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import ChatHistory from "@/components/sidebar/chat-history"
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


export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">Plor</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <ChatHistory/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
    </Sidebar>
  )
}
