import {useMutation, useQueryClient,useQuery } from "@tanstack/react-query"; 
import axios from "axios";

export const useCreateChat=()=>{
    const queryClient = useQueryClient();
    const {mutateAsync,isPending}= useMutation({

        mutationFn:async(message:string)=>{
            const res=await axios.post("api/chat",{message})
            return res.data
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["getChats"]})
        }
    })
    return {mutateAsync,isPending}
}

export const useGetChats=()=>{

     const {data,isLoading,isError} = useQuery({
        queryKey:["getChats"],
        queryFn:async()=>{
            const res=await axios.get("/api/chat")
            return res.data
        },
        
        staleTime:Infinity
    })

    return {data,isLoading,isError}
}
  
export const useDeleteChat=()=>{

    const queryClient = useQueryClient();
    const {mutateAsync,isPending}= useMutation({

        mutationFn:async(id:string)=>{
            const res=await axios.delete('/api/chat',{
                data:{id}
            })
            
            return res.data
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["getChats"]})
        }
    })
    return {mutateAsync,isPending}
}
