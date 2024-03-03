import ChatHeader from "@/components/shared/chat/chat-header";
import ChatInput from "@/components/shared/chat/chat-input";
import ChatScreen from "@/components/shared/chat/chat-screen";

// interface Props {}

export default function ChatWrapper() {
  return (
    <div className="flex flex-col w-full flex-1 relative group transition-all duration-300 ease-in-out border-r">
      <ChatHeader />
      <ChatScreen />
      <ChatInput />
    </div>
  );
}
