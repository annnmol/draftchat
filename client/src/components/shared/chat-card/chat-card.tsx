"use client";

import { Link } from "react-router-dom";
import { cn, formatDateTime } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import ChatAvatar from "@/components/shared/chat/chat-avatar";
import { CheckCheck } from "lucide-react";
import { useAuth } from "@/context/auth-context";

interface Props {
  conversation: any;
  isSelected: boolean;
  handleClick: (conversation: any) => void;
}

export default function ChatCard({
  conversation,
  isSelected = false,
  handleClick,
}: Props) {
  const { authUser } = useAuth();
  const oppositeUser = conversation?.participants?.[0];
  const lastMessage = conversation?.lastMessage;
  const updatedAt = formatDateTime(conversation?.updatedAt).timeOnly;
  return (
    <Link
      to="#"
      onClick={() => handleClick(conversation)}
      className={cn(
        buttonVariants({
          variant: isSelected ? "secondary" : "ghost",
          size: "lg",
        }),
        "flex gap-2 p-2 h-[56px] w-full rounded-lg ",
        isSelected &&
          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink",
      )}
    >
      <ChatAvatar
        src={oppositeUser?.profilePic}
        name={oppositeUser?.fullName}
        className="w-9 h-9"
      />

      <div className="flex flex-col justify-center gap-[2px] w-full h-full">
        <div className="flex justify-between w-full align-start">
          <span className="w-full leading-4">{oppositeUser?.fullName}</span>
          <span className="text-zinc-300 text-xs">{updatedAt}</span>
        </div>

        <div className="flex justify-between w-full">
          <span className="flex items-center text-zinc-300 text-xs truncate w-full">
            {lastMessage?.senderId === authUser?._id ? (
              <CheckCheck
                width={16}
                className={lastMessage?.seen && "text-[blue]"}
              />
            ) : null}
            {lastMessage?.text}
          </span>
          {conversation?.unreadMessages > 0 && (
            <span className=" text-xs text-[green]">
              {conversation?.unreadMessages}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
