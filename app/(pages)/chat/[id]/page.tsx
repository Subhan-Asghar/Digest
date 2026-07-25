"use client"
import React from 'react'
import { useParams,useSearchParams } from 'next/navigation'

const page = () => {
    const { id}=useParams<{id:string}>()
     const searchParams = useSearchParams()
     const initialMessage = searchParams.get("message") 
  return (
    <>
     <div>chat :{id}</div>
     <p>{initialMessage}</p>
    </>
   
  )
}

export default page