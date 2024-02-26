"use server";

import { Separator } from "@/components/ui/separator";
import Sidebar from "@/components/shared/sidebar/sidebar";
import ChatWrapper from "@/components/shared/chat/chat-wrapper";
import useStore from "@/zustand";
import { useShallow } from "zustand/react/shallow";

interface Props {}

export default function ChatLayout() {
  const selectedConversation = useStore(
    useShallow((state) => state.selectedConversation)
  );

  return (
    <>
      <Sidebar isCollapsed={false} />
      <Separator orientation="vertical" />
      {selectedConversation?._id ? (
        <ChatWrapper />
      ) : (
        <p> select a conversation</p>
      )}
    </>
  );
}
