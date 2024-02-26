import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import ChatAvatar from "@/components/shared/chat/chat-avatar";
import useStore from "@/zustand";
import { useShallow } from "zustand/react/shallow";
import useGetMessages from "@/components/hooks/useGetMessages";
import { useAuth } from "@/context/auth-context";
import ChatSkeleton from "./chat-skeleton";

interface Props {}

// const messages = userData?.[0]?.messages;
// const selectedUser = userData?.[0];

export default function ChatScreen() {
  const selectedConversation = useStore(
    useShallow((state) => state.selectedConversation)
  );
  const messages = useStore(useShallow((state) => state.messages));

  const { getMessages, loading } = useGetMessages();
  const { authUser } = useAuth();

  useEffect(() => {
    if (selectedConversation?._id) {
      getMessages(selectedConversation?._id);
    }
  }, [selectedConversation]);

  //to rerender component after image loaded
  const [imgLoaded, setImgLoaded] = useState(false);
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
        {loading && <ChatSkeleton />}
        {Object.entries(messages)?.map(([date, dateWiseMessages]: any) => {
          return (
            <div key={date} className="w-full h-full  ">
              <div className="w-full flex justify-center align-middle relative">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center"
                >
                  <span className="w-full border-t text-muted-foreground" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className=" bg-accent py-1 px-3 rounded-md max-w-xs text-[12px]">
                    {date}
                  </span>
                </div>
              </div>
              {dateWiseMessages?.length > 0 &&
                dateWiseMessages?.map((message: any, index: number) => {
                  const isUserMessage =
                    message?.senderId?._id === authUser?._id ?? false;
                  const isImageMessage =
                    message?.mediaType === "image" ? true : false;
                  return (
                    <div
                      key={index}
                      className={cn(
                        "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                        isUserMessage ? "items-end" : "items-start"
                      )}
                    >
                      <div
                        className={cn(
                          "flex gap-3 items-end",
                          isUserMessage ? "flex-row-reverse" : "flex-row"
                        )}
                      >
                        <ChatAvatar
                          src={message?.senderId?.profilePic}
                          name={message?.senderId?.fullName}
                        />
                        <span className=" bg-accent p-2 rounded-md max-w-xs flex flex-col gap-2">
                          {isImageMessage ? (
                            <img
                              src={(message?.mediaUrl as string) ?? undefined}
                              // hidden
                              onLoad={() => setImgLoaded(true)}
                              alt="Message image"
                              className="rounded-md"
                            />
                          ) : null}

                          {message.text}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </>
  );
}
