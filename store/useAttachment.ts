import { create } from 'zustand'

export type Attachment = {
  value: string
  label: string
}

type Attachments = {
  attachment: Attachment[],
  setAttachment: (documents: Attachment[]) => void,
  removeAttachment:(value:string)=>void
}

export const useAttachments = create<Attachments>()((set) => ({
  attachment: [],
  setAttachment: (documents) => set({ attachment: documents }),
   removeAttachment: (value) =>
    set((state) => ({
      attachment: state.attachment.filter((item) => item.value !== value),
    })),
}))