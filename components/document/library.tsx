"use client"
import React from 'react'
import { useGetDocuments } from '@/lib/queries/document'
import { Spinner } from "@/components/ui/spinner"
const Library = () => {
  const { data, isLoading, isError } = useGetDocuments()

    if (isLoading) {
        return (
            <div className='flex h-full w-full items-center justify-center '>
                <Spinner  />
            </div>
        )
    }

  return (
    <div>library</div>
  )
}

export default Library