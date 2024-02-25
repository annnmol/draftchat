"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

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
      <span className="sr-only">{chat?.name}</span>
    </Link>
  );
}
