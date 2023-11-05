import { create } from 'zustand'

export const messageStore = create((set) => ({
    messageObj: { message: '', status: '' },
    setMessageObj: (message, status) => set((state) => ({ messageObj: { message: message, status: status } })),
}))