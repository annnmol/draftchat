"use server";

import ChatHeader from "@/components/shared/chat/chat-header";
import ChatInput from "@/components/shared/chat/chat-input";
import ChatScreen from "@/components/shared/chat/chat-screen";

interface Props {}

export default function ChatWrapper() {
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatHeader />
      <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <ChatScreen />
    <ChatInput />
    </div>
    </div>
  );
}
