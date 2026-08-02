"use client"
import React from 'react'
import { Button } from '@/components/ui/button';
import { authClient } from "@/lib/auth-client"
import { useSearchParams } from 'next/navigation';
import { toast } from "sonner"


const GoogleAuth = ({ errorRedirect }: { errorRedirect: string }) => {
    const params = useSearchParams();

    React.useEffect(() => {
        const error = params.get("error");

        if (error !== "account_not_linked") return;

        const id = setTimeout(() => {
            toast.error(
                "An account with this email already exists. Please sign in using your original provider."
            );
        }, 0);

        return () => clearTimeout(id);
    }, [params]);

    const submit = async (errorRedirect: string) => {
        const { data, error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/chat",
            errorCallbackURL: errorRedirect,
        })
        return { data, error }
    }
    return (
        <>
            <Button
                variant="outline" className="w-full"
                onClick={async () => {
                    const { data, error } = await submit(errorRedirect);
                    if (error) {
                        console.log(error);
                    }
                }}
            >Continue with Google</Button>
        </>
    )
}

export default GoogleAuth