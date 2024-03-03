import { cn, formatDateTime } from "@/lib/utils";
import { memo, useEffect, useRef, useState } from "react";
import ChatAvatar from "@/components/shared/chat/chat-avatar";
import useStore from "@/zustand";
import { useShallow } from "zustand/react/shallow";
import useGetMessages from "@/components/hooks/useGetMessages";
import { useAuth } from "@/context/auth-context";
import ChatSkeleton from "./chat-skeleton";
import useListenMessages from "@/components/hooks/useListenMessages";
import { Download, FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

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
  }, [selectedConversation]); // eslint-disable-line

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
                      <div className="bg-accent rounded-md max-w-xs flex flex-col gap-1 leading-1.5 px-3 py-2 dark:bg-gray-700">
                        {message?.mediaUrl?.length > 0 ? (
                          <>
                            {message?.mediaType === "image" && (
                              <RenderImage
                                src={message?.mediaUrl}
                                setImgLoaded={setImgLoaded}
                              />
                            )}

                            {message?.mediaType === "audio" && (
                              <RenderAudio
                                src={message?.mediaUrl}
                                setImgLoaded={setImgLoaded}
                              />
                            )}

                            {message?.mediaType === "video" && (
                              <RenderVideo
                                src={message?.mediaUrl}
                                setImgLoaded={setImgLoaded}
                              />
                            )}

                            {message?.mediaType === "document" && (
                              <RenderDocument src={message?.mediaUrl} />
                            )}
                          </>
                        ) : null}
                        <RenderText text={message.text as string} />
                        <RenderTime time={message.createdAt} />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}

interface RenderTextProps {
  text: string;
}
const RenderText = memo(({ text }: RenderTextProps) => {
  return (
    <p className="text-sm font-normal text-gray-900 dark:text-white">{text}</p>
  );
});
interface RenderTimeProps {
  time: any;
}

const RenderTime = memo(({ time }: RenderTimeProps) => {
  time = formatDateTime(time).timeOnly;
  if (time === "Invalid date" || !time) return null;
  return (
    <span className="text-[12px] font-normal text-gray-500 dark:text-gray-400">
      {time}
    </span>
  );
});

interface RenderImageProps {
  src: any;
  setImgLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const RenderImage = memo(({ src, setImgLoaded }: RenderImageProps) => {
  if (!src) return null;
  return (
    <img
      src={(src as string) ?? undefined}
      onLoad={() => setImgLoaded((prev) => !prev)}
      alt="Message_image"
      className="rounded-lg w-full max-h-[300px] object-cover"
      onError={(e: any) => (e.target.src = IMAGE_NOT_FOUND)}
      onClick={() => window.open(src, "_blank")}
    />
  );
});

interface RenderVideoProps {
  src: any;
  setImgLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const RenderVideo = memo(({ src, setImgLoaded }: RenderVideoProps) => {
  if (!src) return null;
  return (
    <video
      src={(src as string) ?? undefined}
      onLoad={() => setImgLoaded((prev) => !prev)}
      className="rounded-lg w-full max-h-[200px] min-h-[200px] object-cover"
      controls
      onLoadedData={() => setImgLoaded((prev) => !prev)}
    />
  );
});

interface RenderAudioProps {
  src: any;
  setImgLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const RenderAudio = memo(({ src, setImgLoaded }: RenderAudioProps) => {
  if (!src) return null;
  return (
    <audio
      src={(src as string) ?? undefined}
      onLoad={() => setImgLoaded((prev) => !prev)}
      className="rounded-lg w-full min-w-[200px] max-h-[300px] object-cover"
      controls
    />
  );
});

interface RenderDocumentProps {
  src: any;
}

const RenderDocument = memo(({ src }: RenderDocumentProps) => {
  if (!src) return null;
  return (
    <div className="flex gap-2 items-center bg-gray-50 dark:bg-gray-600 rounded-xl p-2">
      <FileText size={20} />
      <span className="text-sm font-medium text-gray-900 dark:text-white">
        Download File
      </span>
      <div className="inline-flex self-center items-center">
        <a
          href={src}
          download={src}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "lg",
            }),
            "px-3 py-2"
          )}
        >
          <Download size={18} />
        </a>
      </div>
    </div>
  );
});
