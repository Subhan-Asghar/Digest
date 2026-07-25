"use client"
import React, { useMemo, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useGetDocuments } from '@/lib/queries/document';
import { Plus } from "lucide-react";
import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner';
import { MultiSelect } from '../multi-select';
import type { Attachment } from '@/store/useAttachment'
import { useAttachments } from '@/store/useAttachment';

const SelectDocument = () => {
    const { data, isLoading } = useGetDocuments()
    const {attachment,setAttachment}=useAttachments()

    const values: Attachment[] = useMemo(() => {
        if (!data?.data) return [];

        return data.data.map((item: { id: string, name: string }) => ({
            value: item.id,
            label: item.name,
        }));
    }, [data]);
    

    const defaultValues: string[] = useMemo(() => {

        if (!attachment) return []

        const result = attachment.map(doc => doc.value)
        return result

    }, [attachment])


    return (
        <Dialog>
            <DialogTrigger className='w-full'>
                <Button variant={"ghost"}>
                    <Plus />Select
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select Document</DialogTitle>
                </DialogHeader>
                {isLoading ? (

                    <div className='flex h-full w-full items-center justify-center '>
                        <Spinner />
                    </div>
                ) : (
                    <MultiSelect
                        className='border-2 border-accent'
                        options={values}
                        placeholder="Select up to 2 documents"
                        variant="default"
                        value={defaultValues}
                        defaultValue={defaultValues}
                        hideSelectAll={true}
                        selectionLimit={2}
                        onValueChange={(selectedValues) => {
                            const selectedDocuments = values.filter(option =>
                                selectedValues.includes(option.value)
                            );
                            setAttachment(selectedDocuments);
                        }}

                    />
                )}
            </DialogContent>


        </Dialog>
    )
}

export default SelectDocument