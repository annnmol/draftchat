import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import ChatAvatar from "@/components/shared/chat/chat-avatar";
import useStore from "@/zustand";
import { useShallow } from "zustand/react/shallow";
import useGetMessages from "@/components/hooks/useGetMessages";
import { useAuth } from "@/context/auth-context";
import ChatSkeleton from "./chat-skeleton";
import useListenMessages from "@/components/hooks/useListenMessages";

const IMAGE_NOT_FOUND =
  "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
const fake_image =
  "https://images.unsplash.com/photo-1593466144596-8abd50ad2c52?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function ChatScreen() {
  const selectedConversation = useStore(
    useShallow((state) => state.selectedConversation)
  );
  const messages = useStore(useShallow((state) => state.messages));
  const removesAllMessages = useStore(
    useShallow((state) => state.removesAllMessages)
  );

  const { authUser } = useAuth();
  const { getMessages, loading } = useGetMessages();
  useListenMessages();

  useEffect(() => {
    if (selectedConversation?._id) {
      getMessages(selectedConversation?._id);
    }

    return () => {
      removesAllMessages();
    };
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
    <div
      ref={messagesContainerRef}
      className="flex flex-col w-full h-full my-2 overflow-x-hidden overflow-y-auto"
    >
      {loading && <ChatSkeleton />}
      {Object.entries(messages)?.map(([date, dateWiseMessages]: any) => {
        return (
          <div key={date} className="flex flex-col gap-1">
            <div className="w-full flex justify-center align-middle relative my-1">
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
                      "flex whitespace-pre-wrap min-h-[40px] px-2 py-1 overflow-hidden",
                      isUserMessage ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "flex gap-3 items-end max-w-[60%] h-[200px !important]",
                        isUserMessage ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      <ChatAvatar
                        src={message?.senderId?.profilePic}
                        name={message?.senderId?.fullName}
                        className="w-8 h-8"
                      />
                      <div className="bg-accent p-2 rounded-md max-w-xs flex flex-col gap-2">
                        {message?.mediaUrl?.length > 0 ? (
                          <>
                            {message?.mediaType === "image" && (
                              <img
                                src={(message?.mediaUrl as string) ?? undefined}
                                onLoad={() => setImgLoaded((prev) => !prev)}
                                alt="Message_image"
                                className="rounded-md w-full max-h-[300px] object-cover"
                                onError={(e: any) =>
                                  (e.target.src = IMAGE_NOT_FOUND)
                                }
                              />
                            )}

                            {message?.mediaType === "audio" && (
                              <audio
                                src={(message?.mediaUrl as string) ?? undefined}
                                onLoad={() => setImgLoaded((prev) => !prev)}
                                className="rounded-md w-full min-w-[200px] max-h-[300px] object-cover"
                                controls
                              />
                            )}

                            {message?.mediaType === "video" && (
                              <video
                                src={(message?.mediaUrl as string) ?? undefined}
                                onLoad={() => setImgLoaded((prev) => !prev)}
                                className="rounded-md w-full max-h-[200px] min-h-[200px] object-cover"
                                controls
                                onLoadedData={() =>
                                  setImgLoaded((prev) => !prev)
                                }
                              />
                            )}
                          </>
                        ) : null}

                        {message.text}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        );
      })}
{/* 
      <div className="flex items-start gap-2.5">

        <div className="flex flex-col gap-1 w-full max-w-[320px]">

          <div className="flex flex-col gap-1 leading-1.5 px-3 py-2 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
            <p className="text-sm font-normal text-gray-900 dark:text-white">
              {" "}
              That's awesome. I think our users will really appreciate the
              improvements.
            </p>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Delivered  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              11:46
            </span>
            </span>
          </div>
        </div>
      </div> */}
    </div>
  );
}
