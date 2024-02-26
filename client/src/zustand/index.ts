import { create } from 'zustand'

export interface IMessage {
    id: string;
    session_id: string;
    type: string;
    value: string;
    mediaUrl: string;
    senderId: string;
    seen: boolean;
    shouldShake?: boolean;
}

export type StoreState = {
    conversations: any;
    setConversations: (conversations: any[]) => void;
    updateConversations: (conversations: any) => void;
    AddConversations: (conversations: any) => void;

    selectedConversation: any;
    setSelectedConversation: (selectedConversation: any) => void;
    messages: any[];
    setMessages: (messages: any[]) => void;
    AddMessages: (messages: any) => void;
    removesAllMessages: () => void;
    removeEverything: () => void,
};

const useStore = create<StoreState>((set) => ({
    conversations: [],
    setConversations: (conversations: any) => set({ conversations }),
    updateConversations: (conversation: any) => set((prev) => {
        const id = conversation?.id;
        if (!id) return prev;
        const updatedConversations = prev.conversations.map((conv: any) =>
            conv.id === id ? conversation : conv
        );
        return { conversations: updatedConversations };
    }),

    AddConversations: (conversations: any) => set((prev) => {
        return { conversations: [conversations, ...prev.conversations] };
    }),

    selectedConversation: null,
    setSelectedConversation: (selectedConversation: any) => set({ selectedConversation }),

    messages: [],
    setMessages: (messages: any[]) => set({ messages }),
    AddMessages: (messages: any[]) => set((prev) => {
        return { messages: [...prev.messages, messages] };
    }),

    
    removesAllMessages: () => set({ messages: [] }),
    removeEverything: () => set({}, true)
}));

export default useStore;