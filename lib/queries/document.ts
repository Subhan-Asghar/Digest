import {useMutation, useQueryClient  } from "@tanstack/react-query"; 
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
