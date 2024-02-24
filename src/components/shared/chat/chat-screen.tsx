"use client";

import { userData } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import ChatAvatar from "@/components/shared/chat/chat-avatar";

interface Props {}

const messages = userData?.[0]?.messages;
const selectedUser = userData?.[0];

export default function ChatScreen() {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
      >
        {/* <AnimatePresence> */}
        {messages?.map((message, index) => (
          <div
            key={index}
            // layout
            // initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
            // animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            // exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
            // transition={{
            //   opacity: { duration: 0.1 },
            //   layout: {
            //     type: "spring",
            //     bounce: 0.3,
            //     duration: messages.indexOf(message) * 0.05 + 0.2,
            //   },
            // }}
            // style={{
            //   originX: 0.5,
            //   originY: 0.5,
            // }}
            className={cn(
              "flex flex-col gap-2 p-4 whitespace-pre-wrap",
              message.name !== selectedUser.name ? "items-end" : "items-start"
            )}
          >
            <div className="flex gap-3 items-center">
              {message.name === selectedUser.name && (
                <ChatAvatar src={message.avatar} name={message.name} />
              )}
              <span className=" bg-accent p-3 rounded-md max-w-xs">
                {message.message}
              </span>
              {message.name !== selectedUser.name && (
                <ChatAvatar src={message.avatar} name={message.name} />
              )}
            </div>
          </div>
        ))}
        {/* </AnimatePresence> */}
      </div>
    </>
  );
}
