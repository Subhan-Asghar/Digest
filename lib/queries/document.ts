import {useMutation, useQueryClient,useQuery } from "@tanstack/react-query"; 
import axios from "axios";

export const useUploadDocument=()=>{
    const queryClient = useQueryClient();
    const {mutateAsync,isPending}= useMutation({

        mutationFn:async(files:FormData)=>{
            const res=await axios.post("/api/document",files)
            return res.data
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["getDocuments"]})
        }
    })
    return {mutateAsync,isPending}
}

export const useGetDocuments=(options?: { enabled?: boolean })=>{

     const {data,isLoading,isError} = useQuery({
        queryKey:["getDocuments"],
        queryFn:async()=>{
            const res=await axios.get("/api/document")
            return res.data
        },
        
        staleTime:Infinity,
        enabled:options?.enabled
    })

    return {data,isLoading,isError}
}
  
export const useDeleteDocument=()=>{
    const queryClient = useQueryClient();
    const {mutateAsync,isPending}= useMutation({

        mutationFn:async(id:string)=>{
            const res=await axios.delete('/api/document',{
                data:{id}
            })
            
            return res.data
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["getDocuments"]})
        }
    })
    return {mutateAsync,isPending}
}
