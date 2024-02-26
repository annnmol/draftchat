import { create } from 'zustand'

export interface IMessage {
    [key: string]: any[];
}

export type StoreState = {
    conversations: any;
    setConversations: (conversations: any[]) => void;
    updateConversations: (conversations: any) => void;
    addConversations: (conversations: any) => void;

    selectedConversation: any;
    setSelectedConversation: (selectedConversation: any) => void;
    messages: any;
    setMessages: (messages: any) => void;
    addMessages: (messages: any) => void;
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

    addConversations: (conversations: any) => set((prev) => {
        return { conversations: [conversations, ...prev.conversations] };
    }),

    selectedConversation: null,
    setSelectedConversation: (selectedConversation: any) => set({ selectedConversation }),

    messages: {},
    setMessages: (messages: any) => set({ messages }),
    addMessages: (newMessage: any) => set((prev) => {
        const { messages } = prev;
        const today = new Date().toISOString().split('T')[0];
        
        const updatedMessages = {
            ...messages,
            [today]: [...(messages?.[today] || []), newMessage],
        };

        return { messages: updatedMessages };
    }),


    removesAllMessages: () => set({ messages: [] }),
    removeEverything: () => set({}, true)
}));

export default useStore;