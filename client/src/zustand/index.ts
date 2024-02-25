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
    setConversations: (conversations: any) => void;
    selectedConversation: any;
    setSelectedConversation: (selectedConversation: any) => void;
    messages: IMessage[];
    setMessages: (messages: IMessage) => void;
    setAllMessages: (messages: IMessage[]) => void;
    removesAllMessages: () => void;
    removeEverything: () => void,
};

const useStore = create<StoreState>((set) => ({
    conversations: [],
    setConversations: (conversations: any) => set((prev) => {
        if (Array.isArray(conversations) && conversations.length > 0) {
            return (
                {
                    conversations: conversations
                }
            )
        }
        return (
            {
                conversations: [...prev.conversations, conversations]
            }
        )
    }
    ),
    selectedConversation: null,
    setSelectedConversation: (selectedConversation: any) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages: IMessage) => set((prev) => ({
        messages: [...prev.messages, messages],
    })),
    setAllMessages: (messages: IMessage[]) => set((prev) => ({
        messages: messages,
    })),
    removesAllMessages: () => set({ messages: [] }),
    removeEverything: () => set({}, true)
}));

export default useStore;