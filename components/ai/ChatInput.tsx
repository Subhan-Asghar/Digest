"use client";

import SelectAttachment from "./selectAttachment";
import DisplayAttachment from "./displayAttachment";
import type { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputProvider,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";

import {useState } from "react";
import { toast } from "sonner";
import { useAttachments } from "@/store/useAttachment";

const SUBMITTING_TIMEOUT = 200;
const STREAMING_TIMEOUT = 2000;

const ChatInput = ({onSubmit}:{onSubmit:(message:string)=>Promise<void>}) => {

  const{attachment}=useAttachments()

  const [status, setStatus] = useState<
    "submitted" | "streaming" | "ready" | "error"
  >("ready");


  const handleSubmit = async (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);

    if (!(hasText)) {
      return;
    }
    // if(attachment.length<=0){
    //   toast.warning("atleast select the one document ")
    //   return 
    // }
    
    setStatus("submitted");

    try{
       await onSubmit(message.text)
       setStatus("streaming");
        setStatus("ready");
    }catch{
      toast.error("Failed to start new chat")
    }
    
  }

  return (
    <div className="size-full">
      <PromptInputProvider>
        <PromptInput globalDrop multiple onSubmit={handleSubmit}>
          <DisplayAttachment/>
          <PromptInputBody>
            <PromptInputTextarea />
          </PromptInputBody>

          <PromptInputFooter>

            {/* All the tools like search web, model select and add file  */}
            <PromptInputTools>
              <SelectAttachment/>
            </PromptInputTools>

            <PromptInputSubmit status={status} />
          </PromptInputFooter>
        </PromptInput>
      </PromptInputProvider>
    </div>
  );
};

export default ChatInput;
