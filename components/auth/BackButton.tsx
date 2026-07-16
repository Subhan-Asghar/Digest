"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation'
const BackButton = () => {
    const router = useRouter()
  return (
    <div className='absolute z-10 top-4 left-4 '>
                <Button className='cursor-pointer'
                    variant={"ghost"}
                    onClick={() => router.back()}
                > <ArrowLeft /> Back</Button>
            </div>
  )
}

export default BackButton