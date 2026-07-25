import React from 'react'
import {SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/theme-toggle"

const Navbar = () => {
  return (
    <div className='sticky top-0 z-50 flex h-10 items-center justify-start bg-sidebar'>
        <SidebarTrigger />  
        <div className='flex items-center justify-center'>
        <Separator 
        className='h-6 w-4 '
        orientation="vertical" />
        </div>
        
        <ModeToggle />
    </div>
  )
}

export default Navbar