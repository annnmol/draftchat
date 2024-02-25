"use server";

import SidebarHeader from "./sidebar-header";
import ChatCard from "../chat-card/chat-card";
import ChatCardMobile from "../chat-card/chat-card-mobile";
import { userData } from "@/lib/dummy-data";
import useGetConversations from "@/components/hooks/useGetConversations";
import { useEffect } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

interface SidebarProps {
  isCollapsed: boolean;
}
const links = userData;

export default function Sidebar({ isCollapsed }: SidebarProps) {
  const { getConversations, loading } = useGetConversations();
  // const conversations = useStore<any>((state:any) => state.conversations);

	// console.log(`🚀 ~ file: useGetConversations.ts:12 ~ useGetConversations ~ conversations:`, conversations);


  // useEffect(() => {
  //   getConversations();
  // },[getConversations])

  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <SidebarHeader chatsCount={links?.length ?? 0} />
        </div>
      )}
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links?.map((link, index) => {
          if (isCollapsed) {
            return (
              <ChatCardMobile
                key={link?.id ?? index.toString()}
                chat={link}
                selectedChat={false}
              />
            );
          }

          return (
            <ChatCard
              key={link?.id ?? index.toString()}
              chat={link}
              selectedChat={false}
            />
          );
        })}
      </nav>
    </div>
  );
}
