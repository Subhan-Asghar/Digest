"use client";

import {
  Attachment,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
} from "@/components/ai-elements/attachments";
import SelectAttachment from "../chat/selectAttachment";
import DisplayAttachment from "../chat/displayAttachment";
import type { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionAddScreenshot,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputProvider,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  usePromptInputAttachments,
} from "@/components/ai-elements/prompt-input";

import {useState } from "react";
import { toast } from "sonner";
import { useAttachments } from "@/store/useAttachment";

import { useRouter } from "next/navigation";

const SUBMITTING_TIMEOUT = 200;
const STREAMING_TIMEOUT = 2000;



const ChatInput = () => {
  const{attachment}=useAttachments()

  const router=useRouter()
  const [status, setStatus] = useState<
    "submitted" | "streaming" | "ready" | "error"
  >("ready");
  

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);


    if (!(hasText)) {
      return;
    }
    if(attachment.length<=0){
      toast.warning("atleast select the one document ")
      return 
    }
    

    setStatus("submitted");


    console.log("Submitting message:", message);
    console.log(attachment)

    setTimeout(() => {
      setStatus("streaming");
    }, SUBMITTING_TIMEOUT);

    setTimeout(() => {
      setStatus("ready");
    }, STREAMING_TIMEOUT);

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
              {/* Add file  */}



            </PromptInputTools>

            <PromptInputSubmit status={status} />
          </PromptInputFooter>
        </PromptInput>
      </PromptInputProvider>
    </div>
  );
};

export default ChatInput;
