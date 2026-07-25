"use client"
import React from 'react'
import {Button} from '@/components/ui/button'
import Example from '@/components/ai/ChatInput'

const page = () => {
  
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
      <div className="md:col-span-2">
      </div>

      <div className="md:col-span-8">
        <Example/>
        </div>

        <div className="md:col-span-2">
        </div>

    </div>

          
    
    </>
  )
}

export default page