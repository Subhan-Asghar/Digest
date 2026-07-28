"use client"
import React from 'react'
import { useAttachments } from '@/store/useAttachment'
import { Button } from '../ui/button'
import { XIcon, FileTextIcon } from "lucide-react"


const DisplayAttachment = () => {
    const { attachment, removeAttachment } = useAttachments()

    if (attachment.length <= 0 || !attachment) return null

    return (
        <div className="flex justify-start w-full gap-1.5 flex-wrap">
            {attachment.map((file, id) => (
                <div className="flex items-center justify-between gap-1.5 rounded-md border bg-background p-1 pe-2 max-w-xs" key={id}>
                    <div className="flex items-center gap-2 overflow-hidden">
                        <div className="flex aspect-square size-7 shrink-0 items-center justify-center rounded border">
                            <FileTextIcon className="size-3.5" />
                        </div>
                        <div className="flex min-w-0 flex-col">
                            <p className="font-medium text-[11px] leading-tight truncate ">
                                {file.label}
                            </p>
                        </div>
                    </div>
                    <Button
                        aria-label="Remove file"
                        className="-me-1.5 size-6 text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
                        onClick={() => removeAttachment(file.value)}
                        size="icon"
                        variant="ghost"
                    >
                        <XIcon aria-hidden="true" className="size-3.5" />
                    </Button>
                </div>
            ))}
        </div>
    )
}

export default DisplayAttachment