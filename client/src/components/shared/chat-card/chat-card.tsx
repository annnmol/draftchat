"use client";

import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import ChatAvatar from "@/components/shared/chat/chat-avatar";

interface Props {
  chat: any;
  selectedChat: boolean;
}

export default function ChatCard({ chat, selectedChat = false }: Props) {
  return (
    <Link
      to="#"
      className={cn(
        buttonVariants({
          variant: selectedChat ? "secondary" : "ghost",
          size: "lg",
        }),
        selectedChat &&
          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink",
        "justify-start gap-4"
      )}
    >
            <ChatAvatar src={chat?.avatar} name={chat?.avatar} />

      <div className="flex flex-col max-w-28">
        <span>{chat?.name}</span>
        {chat?.messages?.length > 0 && (
          <span className="text-zinc-300 text-xs truncate ">
            {chat?.messages?.[chat?.messages?.length - 1]?.name.split(" ")[0]}:{" "}
            {chat?.messages?.[chat?.messages?.length - 1]?.message}
          </span>
        )}
      </div>
    </Link>
  );
}
