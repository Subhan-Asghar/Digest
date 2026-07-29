"use client"
import React from 'react'
import { useParams,} from 'next/navigation'
import { useGetChat } from '@/lib/queries/chat'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'
import ChatWindow
 from '@/components/chat/chatWindow'
import { Button } from '@/components/ui/button'
import {
    IconEdit,
} from "@tabler/icons-react"

const page = () => {
    const {id}=useParams<{id:string}>()
    const {data,isLoading,isError}=useGetChat(id)
    const router=useRouter()
     if (isLoading) {
        return (
            <div className='flex h-full w-full items-center justify-center '>
                <Spinner />
            </div>
        )
    }

if (isError || !data) {
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="flex w-full max-w-2xl flex-col items-center gap-6 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">
            Chat not found
          </h1>
          <p className="text-sm text-muted-foreground max-w-md">
            This chat no longer exists or may have been deleted. You can start a new conversation below.
          </p>
        </div>
        
        <Button
        onClick={()=>router.push("/chat")}
        >
          <IconEdit />
          New Chat
        </Button>
      </div>
    </div>
  );
}
  return (
    <>
   <div className="flex h-full flex-1 overflow-hidden">
      <div className="hidden md:flex flex-1" />

      <div className="flex w-full max-w-4xl flex-col ">
        <ChatWindow id={id} initialMessages={data.data} />
      </div>

      <div className="hidden md:flex flex-1" />
    </div>
     
    </>
   
  )
}

export default page