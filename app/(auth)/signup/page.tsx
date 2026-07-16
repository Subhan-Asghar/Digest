import React from 'react'
import Signup from '@/components/auth/signup'
import BackButton from '@/components/auth/BackButton'


const page = () => {
   
    return (
        <>
           <BackButton />
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <Signup />
                </div>
            </div>
        </>

    )
}

export default page