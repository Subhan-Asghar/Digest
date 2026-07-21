import {useMutation, useQueryClient,useQuery } from "@tanstack/react-query"; 
import axios from "axios";

export const useUploadDocument=()=>{

    const {mutateAsync,isPending}= useMutation({

        mutationFn:async(files:FormData)=>{
            const res=await axios.post("api/document",files)
            return res.data
        }
    })
    return {mutateAsync,isPending}
}

export const useGetDocuments=()=>{

     const {data,isLoading,isError} = useQuery({
        queryKey:["getDocuments"],
        queryFn:async()=>{
            const res=await axios.get("/api/document")
            return res.data
        },
        
        staleTime:Infinity
    })

    return {data,isLoading,isError}
}
  
