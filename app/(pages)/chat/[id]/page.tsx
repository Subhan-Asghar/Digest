"use client"
import React from 'react'
import { useParams,} from 'next/navigation'
import { useGetChat } from '@/lib/queries/chat'
import { Spinner } from '@/components/ui/spinner'
import ChatWindow
 from '@/components/chat/chatWindow'
const page = () => {
    const { id}=useParams<{id:string}>()
    const {data,isLoading,isError}=useGetChat(id)

     if (isLoading) {
        return (
            <div className='flex h-full w-full items-center justify-center '>
                <Spinner />
            </div>
        )
    }
  return (
    <>
      <ChatWindow
      id={id}
      initialMessages={data.data}
      />
    </>
   
  )
}

export default page