"use client"
import React from 'react'
import { Button } from '../ui/button'
import { Trash2Icon } from 'lucide-react'
import { useDeleteDocument } from '@/lib/queries/document'
import {toast} from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const DeleteDocument = ({id}:{id:string}) => {
    const { mutateAsync, isPending } = useDeleteDocument()

    const handleDelete = async (id:string) => {
        try {
            const res=mutateAsync(id)
            toast.promise(res,{
                loading:"Deleting document...",
                success:"Document deleted successfully",
                error:"Error deleting document"
            })  
            await res

        } catch (error) {
            console.error('Error deleting document:', error)
        }
    }
    return (
         <AlertDialog>
      <AlertDialogTrigger asChild>
         <Button
            aria-label="Remove file"
            className="-me-2 size-8 text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
            size="icon"
            variant="ghost"
        >
            <Trash2Icon aria-hidden="true" className="size-4 text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will delete the document
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
          onClick={() => handleDelete(id)}
          >Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

       
    )
}

export default DeleteDocument