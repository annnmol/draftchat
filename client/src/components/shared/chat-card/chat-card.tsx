"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

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
      <Avatar className="flex justify-center items-center">
        <AvatarImage
          src={chat?.avatar}
          alt={chat?.avatar}
          width={6}
          height={6}
          className="w-10 h-10 "
        />
        <AvatarFallback>{chat?.name?.slice(0, 2)}</AvatarFallback>
      </Avatar>
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
