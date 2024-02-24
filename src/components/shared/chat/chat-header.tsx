"use client";
import { Info, Phone, Video } from "lucide-react";
import { Link } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";
import { userData } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";
import ChatAvatar from "@/components/shared/chat/chat-avatar";

const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];

const selectedConversation = userData?.[0];
const lastActive = "2 mins ago";

interface Props {}

export default function ChatHeader() {
  return (
    <>
      <div className="w-full h-20 flex p-4 justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <ChatAvatar
            name={selectedConversation?.name}
            src={selectedConversation?.avatar}
          />
          <div className="flex flex-col">
            <span className="font-medium">{selectedConversation?.name}</span>
            <span className="text-xs">{lastActive}</span>
          </div>
        </div>

        <div>
          {TopbarIcons.map((icon, index) => (
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
          ))}
        </div>
      </div>
    </>
  );
}
