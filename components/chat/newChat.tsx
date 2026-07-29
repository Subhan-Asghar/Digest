"use client"
import React from 'react'
import ChatInput from '@/components/ai/ChatInput'

import { useCreateChat } from '@/lib/queries/chat';
import {useRouter } from 'next/navigation';
import { useSession } from '@/store/useSession';
import Background  from '@/components/chat/background';
const NewChat = () => {
  const { mutateAsync } = useCreateChat()
  const {user}=useSession()
  const router = useRouter()
  const submit = async (message: string): Promise<void> => {

    try {
      if (!user){
        router.push("/signin")
        return 

        }

      const res = await mutateAsync(message)
      router.replace(`/chat/${res.id}`)
    }
    catch (err) {
      console.log("Failed to create chat", err)
      throw new Error("Failed to start chat")
    }
  }

  return (
    
  <Background position={1}>
  <div className="w-full max-w-2xl px-4">
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-semibold">
        Welcome back
      </h1>

      <p className="mt-2 text-muted-foreground">
        Select your documents below to start querying,
        summarizing, or extracting insights.
      </p>
    </div>

    <ChatInput onSubmit={submit} />
  </div>
</Background>

    

  )
}

export default NewChat