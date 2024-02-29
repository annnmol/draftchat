import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import ChatAvatar from "@/components/shared/chat/chat-avatar";
import useStore from "@/zustand";
import { useShallow } from "zustand/react/shallow";
import useGetMessages from "@/components/hooks/useGetMessages";
import { useAuth } from "@/context/auth-context";
import ChatSkeleton from "./chat-skeleton";
import useListenMessages from "@/components/hooks/useListenMessages";

const IMAGE_NOT_FOUND = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
const fake_image = "https://images.unsplash.com/photo-1593466144596-8abd50ad2c52?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

interface Props {}

// const messages = userData?.[0]?.messages;
// const selectedUser = userData?.[0];

export default function ChatScreen() {
  const selectedConversation = useStore(
    useShallow((state) => state.selectedConversation)
  );
  const messages = useStore(useShallow((state) => state.messages));

  const { authUser } = useAuth();
  const { getMessages, loading } = useGetMessages();
  useListenMessages()
  

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
  }, [messages, imgLoaded]);

  return (
    <>
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
      >
        {loading && <ChatSkeleton />}
        {Object.entries(messages)?.map(([date, dateWiseMessages]: any) => {

          // console.log(`🚀 ~ file: chat-screen.tsx:50 ~ {Object.entries ~ date:`, date);

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

                  return (
                    <div
                      key={index}
                      className={cn(
                        "flex flex-col gap-2 p-4 whitespace-pre-wrap min-h-[72px]",
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
                          { message?.mediaType === "image" && message?.mediaUrl?.length > 0 ? (
                            <img
                              src={(message?.mediaUrl as string) ?? undefined}
                              // hidden
                              onLoad={() => setImgLoaded(true)}
                              alt="Message image"
                              className="rounded-md"
                              onError={(e:any) => 
                              e.target.src = IMAGE_NOT_FOUND
                              }
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
