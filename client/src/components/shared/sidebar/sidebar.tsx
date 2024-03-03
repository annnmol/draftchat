"use server";

import SidebarHeader from "./sidebar-header";
import ChatCard from "../chat-card/chat-card";
import ChatCardMobile from "../chat-card/chat-card-mobile";
import useGetConversations from "@/components/hooks/useGetConversations";
import { useEffect, useState } from "react";
import useStore from "@/zustand";
import { useShallow } from "zustand/react/shallow";
import { LoadingSpinner } from "@/components/loader";

export default function Sidebar() {
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

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative group flex flex-col min-w-[60px] max-w-[60px]  md:min-w-[250px] md:max-w-[250px] transition-all duration-300 ease-in-out flex-1 border-r">
      <div className="flex justify-between p-2 items-center border-b min-h-[56px] shadow">
        <SidebarHeader />
      </div>

      <nav className="flex flex-col px-2 py-2 gap-2 h-full overflow-y-auto overflow-x-hidden">
        {loading && <LoadingSpinner />}
        {conversations?.length > 0 &&
          conversations?.map((item: any, index: number) => {
            if (isMobile) {
              return (
                <ChatCardMobile
                  key={item?._id ?? index.toString()}
                  conversation={item}
                  isSelected={selectedConversation?._id === item?._id}
                  handleClick={handleClick}
                />
              );
            }

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
