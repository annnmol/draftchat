"use server";

import SidebarHeader from "./sidebar-header";
import ChatCard from "../chat-card/chat-card";
import ChatCardMobile from "../chat-card/chat-card-mobile";
import { userData } from "@/lib/dummy-data";
import useGetConversations from "@/components/hooks/useGetConversations";
import { useEffect } from "react";
import useStore from "@/zustand";
import { useShallow } from "zustand/react/shallow";
import { LoadingSpinner } from "@/components/loader";

interface SidebarProps {
  isCollapsed: boolean;
}
const links = userData;

export default function Sidebar({ isCollapsed }: SidebarProps) {
  const { getConversations, loading } = useGetConversations();
  const conversations = useStore(useShallow((state) => state.conversations));
  const selectedConversation = useStore(
    useShallow((state) => state.selectedConversation)
  );
  const setSelectedConversation = useStore(
    useShallow((state) => state.setSelectedConversation)
  );

  const handleClick = (item: any) => {
    setSelectedConversation(item);
  };

  useEffect(() => {
    getConversations();
  }, []); // eslint-disable-line

  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <SidebarHeader />
        </div>
      )}
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {loading && <LoadingSpinner />}
        {conversations?.length > 0 &&
          conversations?.map((item: any, index: number) => {
            // if (isCollapsed) {
            //   return (
            //     <ChatCardMobile
            //       key={link?.id ?? index.toString()}
            //       chat={link}
            //       selectedChat={false}
            //     />
            //   );
            // }

            return (
              <ChatCard
                key={item?._id ?? index.toString()}
                conversation={item}
                isSelected={selectedConversation?._id === item?._id}
                handleClick={handleClick}
              />
            );
          })}
      </nav>
    </div>
  );
}
