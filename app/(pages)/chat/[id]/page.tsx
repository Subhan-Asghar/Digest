"use client"
import React from 'react'
import { useParams } from 'next/navigation'
const page = () => {
    const { id}=useParams<{id:string}>()
  return (
    <div>chat :{id}</div>
  )
}

export default page