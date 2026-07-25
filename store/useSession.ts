import { create } from 'zustand'

export type user = {
   id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
}

type Session= {
    user:user | null
    setUser: (data:user) => void,
 
}

export const useSession = create<Session>()((set) => ({
  user:null,
  setUser:(data)=>set({user:data})
}))