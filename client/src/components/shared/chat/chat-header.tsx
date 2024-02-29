"use client";
import { Info, Phone, Video } from "lucide-react";
import { Link } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";
import { userData } from "@/lib/dummy-data";
import { cn, formatDateTime } from "@/lib/utils";
import ChatAvatar from "@/components/shared/chat/chat-avatar";
import useStore from "@/zustand";
import { useShallow } from "zustand/react/shallow";
import ChatHeaderInfo from "./chat-header-info";
import { useSocket } from "@/context/use-socket";

const TopbarIcons = [
  // { icon: Phone },
  // { icon: Video },
  // { icon: Info }
];

// const selectedConversation = userData?.[0];
// const lastActive = "2 mins ago";

interface Props {}

export default function ChatHeader() {
  const selectedConversation = useStore(useShallow((state) => state.selectedConversation));
  const {onlineUsers} = useSocket();
  const oppositeUser = selectedConversation?.participants?.[0];
  // const lastActive = formatDateTime(selectedConversation?.updatedAt).dateTime;
  const lastActive = onlineUsers?.includes(oppositeUser?._id) ? "Online" : "Offline";
  return (
    <>
      <div className="w-full h-20 flex p-4 justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <ChatAvatar
            name={oppositeUser?.fullName}
            src={oppositeUser?.profilePic}
          />
          <div className="flex flex-col">
            <span className="font-medium">{oppositeUser?.fullName}</span>
            <span className="text-xs">{lastActive}</span>
          </div>
        </div>

        <div>
          <ChatHeaderInfo/>
          {/* {TopbarIcons.map((icon, index) => (
            <Link
              key={index}
              to="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
              )}
            >
              <icon.icon size={20} className="text-muted-foreground" />
            </Link>
          ))} */}
        </div>
      </div>
    </>
  );
}
