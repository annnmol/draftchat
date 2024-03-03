"use client";

import {
  FileImage,
  Loader2,
  Mic,
  Paperclip,
  PlusCircle,
  SendHorizontal,
  Smile,
  ThumbsUp,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
// import { AnimatePresence, motion } from "framer-motion";
import { loggedInUserData, Message } from "@/lib/dummy-data";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EmojiPicker } from "@/components/ui/emoji-picker";
import { Link } from "react-router-dom";
import useSendMessage from "@/components/hooks/useSendMessage";
import useStore from "@/zustand";
import { useShallow } from "zustand/react/shallow";
import FilePicker from "@/components/ui/file-picker";

interface Props {}

const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

const isMobile = false;

export default function ChatInput() {
  const selectedConversation = useStore(
    useShallow((state) => state.selectedConversation)
  );
  const { loading, sendMessage } = useSendMessage();

  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim() && selectedConversation?._id) {
      const newMessage = {
        text: message,
      };

      sendMessage(selectedConversation?._id, newMessage).finally(() => {
      setMessage("");
        if (inputRef.current) {
          inputRef.current.focus();
        }
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };


  return (

      <div className="p-2 flex justify-between w-full items-center gap-2 min-h-[64px] max-h-[64px]">
        <div className="flex">
          <FilePicker />
          {/* <Link
            to="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
            )}
          >
            <Paperclip size={20} className="text-muted-foreground" />
          </Link> */}
        </div>
        <div key="input" className="w-full relative">
          <Textarea
            autoComplete="off"
            value={message}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            name="message"
            placeholder="Aa"
            className=" w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background min-h-[48px] max-h-[100px] py-2.5 pr-7 pl-5"
            disabled={loading}
          />
          <div className="absolute right-2 bottom-[0.5rem]  ">
            <EmojiPicker
              onChange={(value) => {
                setMessage(message + value);
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
            />
          </div>
        </div>

        <Button
          disabled={loading}
          onClick={handleSendMessage}
          variant="ghost"
          size="icon"
        >
          {loading ? (
            <Loader2 size={20} className={"text-primary/60 animate-spin"} />
          ) : (
            <SendHorizontal size={20} className="text-muted-foreground" />
          )}
        </Button>
      </div>

  );
}
