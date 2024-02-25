"use client";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import ChatAvatar from "@/components/shared/chat/chat-avatar";

interface Props {
  chat: any;
  selectedChat: boolean;
}

export default function ChatCardMobile({ chat, selectedChat = false }: Props) {
  return (
    <Link
      to="#"
      className={cn(
        buttonVariants({
          variant: selectedChat ? "secondary" : "ghost",
          size: "icon",
        }),
        "h-11 w-11 md:h-16 md:w-16",
        selectedChat &&
          "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
      )}
    >
      <ChatAvatar src={chat?.avatar} name={chat?.avatar} />
      <span className="sr-only">{chat?.name}</span>
    </Link>
  );
}
