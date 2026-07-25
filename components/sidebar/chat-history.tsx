"use client"
import React from 'react'
import { useGetChats } from '@/lib/queries/chat'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'
import {
  IconDots,
  IconFolder,
  IconShare3,
  IconTrash,
  type Icon,
} from "@tabler/icons-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {toast} from "sonner"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { useDeleteChat } from '@/lib/queries/chat'

type Chat={
    id: string;
    userId: string;
    title: string
    createdAt: Date}

const ChatHistory = () => {
    const{ data, isLoading}= useGetChats()
    const { isMobile } = useSidebar()
    const { mutateAsync, isPending } = useDeleteChat()
    const router=useRouter()
    if(isLoading){
        return (
            <div className='flex justify-center pt-2'>
                <Spinner/>
            </div>
        )
    }

    const handleDelete = async (id:string) => {
        try {
            const res=mutateAsync(id)
            toast.promise(res,{
                loading:"Deleting chat...",
                success:"Chat deleted successfully",
                error:"Error deleting chat"
            })  
            await res

        } catch (error) {
            console.error('Error deleting chat:', error)
        }
    }

     
  return (
   <>
   {data &&
    (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Chat History</SidebarGroupLabel>
      <SidebarMenu>
        {data.data.map((item:Chat) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton 
            className='cursor-pointer'
            onClick={()=>router.push(`/chat/${item.id}`)}
            asChild>
                <span
                >{item.title}</span>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="rounded-sm data-[state=open]:bg-accent"
                >
                  <IconDots />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-24 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                {/* <DropdownMenuItem>
                  <IconFolder />
                  <span>Open</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconShare3 />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem 
                onClick={()=>handleDelete(item.id)}
                variant="destructive">
                 <IconTrash/>
                 <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        
        {/* <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <IconDots className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
    )
   }
   </>
  )
}

export default ChatHistory 