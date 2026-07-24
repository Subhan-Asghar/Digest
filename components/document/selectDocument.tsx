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
import type {MultiSelectOption} from "@/components/multi-select"


const SelectDocument = () => {
    const { data, isLoading } = useGetDocuments()
    const [open, setOpen] = useState(false);
    const [documents, setDocuments] = useState<string[]>([]);

    const values: MultiSelectOption[] = useMemo(() => {
        if (!data?.data) return [];

        return data.data.map((item:{id:string,name:string}) => ({
            value: item.id,
            label: item.name,
        }));
    }, [data]);

const submit=()=>{
    console.log(documents)
}

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
          value={documents}
          defaultValue={documents}
          hideSelectAll={true}
          onValueChange={(value)=>setDocuments(value)}
          selectionLimit={2}
        />
                )}

                 <DialogFooter>
                 <div className='flex justify-end gap-2'>
                        
                                    <Button
                                        className='gap-2'
                                        onClick={submit}
                                        size="sm" variant="default">
                                        Confirm
                                    </Button>
                                </div>
            </DialogFooter>
            </DialogContent>

           
        </Dialog>
    )
}

export default SelectDocument