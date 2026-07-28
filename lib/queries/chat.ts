import {useMutation, useQueryClient,useQuery } from "@tanstack/react-query"; 
import axios from "axios";

export const useCreateChat=()=>{
    const queryClient = useQueryClient();
    const {mutateAsync,isPending}= useMutation({

        mutationFn:async(initialMessage:string)=>{
            const res=await axios.post("api/chat",{initialMessage})
            return res.data
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["getChatHistory"]})
        }
    })
    return {mutateAsync,isPending}
}

export const useGetChatHistory=()=>{

     const {data,isLoading,isError} = useQuery({
        queryKey:["getChatHistory"],
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
            queryClient.invalidateQueries({queryKey:["getChatHistory"]})
        }
    })
    return {mutateAsync,isPending}
}



export const useGetChat=(id:string)=>{
     const {data,isLoading,isError} = useQuery({
        queryKey:["getChat",id],
        queryFn:async()=>{
            const res=await axios.get(`/api/chat/${id}`)
            return res.data
        },
    })

    return {data,isLoading,isError}
}
  
export const useSendMessage=()=>{
    const queryClient = useQueryClient();
    const {mutateAsync,isPending,isError}= useMutation({

        mutationFn:async({id,message}:{id:string,message:string})=>{
            const res=await axios.post(`/api/chat/${id}`,{message})
            return res.data
        },
       
    })
    return {mutateAsync,isPending,isError}
}