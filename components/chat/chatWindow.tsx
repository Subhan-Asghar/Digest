"use client"
import React, { useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai';
import { UIMessage } from "ai";

interface Props {
    id: string,
    initialMessages:UIMessage[]
}

const ChatWindow = ({id,initialMessages}:Props) => {

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),

    messages:initialMessages

  });
  

    return (
        <div>chatWindow</div>
    )
}

export default ChatWindow