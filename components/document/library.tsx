"use client"
import React from 'react'
import { useGetDocuments } from '@/lib/queries/document'
import { Spinner } from "@/components/ui/spinner"


import {formatBytes,} from "@/hooks/use-file-upload";

import {FileTextIcon} from "lucide-react";
import DeleteDocument from './deleteDocument';
const Library = () => {
    const { data, isLoading, isError } = useGetDocuments()

    if (isLoading) {
        return (
            <div className='flex h-full w-full items-center justify-center '>
                <Spinner />
            </div>
        )
    }


    return (
        <>
            <div className='flex flex-wrap gap-4 p-4'>
                {data && data.data.map((doc: any) => (

                    <div
                        className="flex items-center justify-between gap-2 rounded-lg border bg-background p-2 pe-3 max-w-md"
                        key={doc.id}
                    >
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
                                <FileTextIcon />
                            </div>
                            <div className="flex min-w-0 flex-col gap-0.5">
                                <p className="truncate font-medium text-[13px]">
                                    {doc.name}
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    {formatBytes(
                                        doc.size
                                    )}
                                </p>
                            </div>
                        </div>
                        <DeleteDocument id={doc.id} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default Library