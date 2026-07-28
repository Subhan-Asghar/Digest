"use client";
import React, { Fragment,useEffect } from "react";
import {
  MessageActions,
  MessageAction,
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { RefreshCcwIcon, CopyIcon } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIMessage } from "ai";
import { useAttachments } from "@/store/useAttachment";
import ChatInput from "../ai/ChatInput";

interface Props {
  id: string;
  initialMessages: UIMessage[];
}

const ChatWindow = ({ id, initialMessages }: Props) => {
  const { attachment } = useAttachments();

  const { messages, sendMessage, regenerate } = useChat({
    transport: new DefaultChatTransport({
      api: `/api/chat/${id}`,
    }),
    messages: initialMessages,
  });

  const handleSubmit = async (textMessage: string,generateOnly=false) => {
    await sendMessage(
      { text: textMessage },
      {
        body: {
          message: textMessage,
          attachment: attachment.map((item) => item.value),
          generateOnly
        },
      }
    );
  };

  return (
<div className="flex h-full flex-col overflow-hidden">
  <div className="flex-1 overflow-y-auto">
          <Conversation>
          <ConversationContent>
            {messages.map((message, messageIndex) => (
              <Fragment key={message.id}>
                {message.parts?.map((part, i) => {
                  switch (part.type) {
                    case "text":
                      const isLastMessage =
                        messageIndex === messages.length - 1;
                      return (
                        <Fragment key={`${message.id}-${i}`}>
                          <Message from={message.role}>
                            <MessageContent>
                              <MessageResponse>{part.text}</MessageResponse>
                            </MessageContent>
                          </Message>
                          {message.role === "assistant" && isLastMessage && (
                            <MessageActions>
                              {/* <MessageAction
                                onClick={() => regenerate()}
                                label="Retry"
                              >
                                <RefreshCcwIcon className="size-3" />
                              </MessageAction>
                              <MessageAction
                                onClick={() =>
                                  navigator.clipboard.writeText(part.text)
                                }
                                label="Copy"
                              >
                                <CopyIcon className="size-3" />
                              </MessageAction> */}
                            </MessageActions>
                          )}
                        </Fragment>
                      );
                    default:
                      return null;
                  }
                })}
              </Fragment>
            ))}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
 </div>
 <div className="sticky bottom-0 border-t z-10 bg-background p-4 w-full">
    <ChatInput onSubmit={handleSubmit} />
  </div>
  </div>

  );
};

export default ChatWindow;