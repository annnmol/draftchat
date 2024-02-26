"use client";

import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import ChatAvatar from "@/components/shared/chat/chat-avatar";
import { CheckCheck } from "lucide-react";
import { useAuth } from "@/context/auth-context";

interface Props {
  conversation: any;
  isSelected: boolean;
  handleClick:(conversation:any)=>void
}

export default function ChatCard({ conversation, isSelected = false,handleClick }: Props) {
  const { authUser } = useAuth();
  const oppositeUser = conversation?.participants?.[0];
  const lastMessage = conversation?.lastMessage;
  return (
    <Link
      to="#"
      onClick={() => handleClick(conversation)}
      className={cn(
        buttonVariants({
          variant: isSelected ? "secondary" : "ghost",
          size: "lg",
        }),
        isSelected &&
          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink",
        "justify-start gap-4"
      )}
    >
      <ChatAvatar
        src={oppositeUser?.profilePic}
        name={oppositeUser?.fullName}
      />

      <div className="flex flex-col max-w-28">
        <span>{oppositeUser?.fullName}</span>
        {lastMessage?.text && (
          <span className="text-zinc-300 text-xs truncate ">
            {lastMessage?.senderId === authUser?._id ? (
              <CheckCheck
                width={16}
                className={lastMessage?.seen && "text-[blue]"}
              />
            ) : null}
            {lastMessage?.text}
          </span>
        )}
      </div>
    </Link>
  );
}
