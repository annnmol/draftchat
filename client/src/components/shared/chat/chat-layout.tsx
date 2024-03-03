import Sidebar from "@/components/shared/sidebar/sidebar";
import ChatWrapper from "@/components/shared/chat/chat-wrapper";
import useStore from "@/zustand";
import { useShallow } from "zustand/react/shallow";

// interface Props {}

export default function ChatLayout() {
  const selectedConversation = useStore(
    useShallow((state) => state.selectedConversation)
  );

  return (
    <>
      <Sidebar />
      {selectedConversation?._id ? (
        <ChatWrapper />
      ) : (
        <div className="text-x flex flex-1 justify-center items-center md:text-xl"> select a conversation</div>
      )}
    </>
  );
}
