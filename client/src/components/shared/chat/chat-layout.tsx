"use server";

import { Separator } from "@/components/ui/separator";
import Sidebar from "@/components/shared/sidebar/sidebar";
import ChatWrapper from "@/components/shared/chat/chat-wrapper";

interface Props {}

export default function ChatLayout() {
  return (
    <>
      <Sidebar isCollapsed={false} />
      <Separator orientation="vertical" />
      <ChatWrapper />
    </>
  );
}
