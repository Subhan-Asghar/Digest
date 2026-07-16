import {authClient} from "@/lib/auth-client"
import {toast} from "sonner"

export const SignIn=async(data:{email:string,password:string})=> {
    try{
        const response = await authClient.signIn.email(data)
    }
    catch(error){
        console.error("Error during sign in:", error);
        toast.error("An error occurred during sign in. Please try again.");
    }
}

export const SignOut=async(router: any)=> {
        const response = await authClient.signOut({
    fetchOptions: {
    onSuccess: () => {
      router.push("/signin"); 
    },
  },
})
}