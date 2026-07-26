"use client"
import React from 'react'
import ChatInput from '@/components/ai/ChatInput'

import { useCreateChat } from '@/lib/queries/chat';
import { useRouter } from 'next/navigation';
import { useSession } from "@/store/useSession"

const NewChat = () => {
  const { mutateAsync } = useCreateChat()
  const { user} = useSession()
  const router = useRouter()

  if (!user) return null

  const submit = async (message: string): Promise<void> => {

    try {
      const res = await mutateAsync(message)
      router.replace(`/chat/${res.id}`)
    }
    catch (err) {
      console.log("Failed to create chat", err)
      throw new Error("Failed to start chat")
    }
  }

  return (

    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="flex flex-col w-full max-w-2xl gap-6">
        <div className="text-center space-y-1.5">
          <h1 className="text-2xl font-semibold text-foreground">
            Welcome back, {user?.name}
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Select your documents below to start querying, summarizing, or extracting insights.
          </p>
        </div>
        <ChatInput onSubmit={submit} />
      </div>
    </div>

  )
}

export default NewChat