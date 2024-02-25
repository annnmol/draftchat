"use client";

import {
  FileImage,
  Mic,
  Paperclip,
  PlusCircle,
  SendHorizontal,
  Smile,
  ThumbsUp,
} from "lucide-react";
import React, { useRef, useState } from "react";
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

interface Props {}

const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

const isMobile = false;

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleThumbsUp = () => {
    const newMessage: Message = {
      id: message.length + 1,
      name: loggedInUserData.name,
      avatar: loggedInUserData.avatar,
      message: "👍",
    };
    // sendMessage(newMessage);
    setMessage("");
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: message.length + 1,
        name: loggedInUserData.name,
        avatar: loggedInUserData.avatar,
        message: message.trim(),
      };
      // sendMessage(newMessage);
      setMessage("");

      if (inputRef.current) {
        inputRef.current.focus();
      }
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

//   const handleSendMessage = () => {
//     // Access the current property of the inputRef to get the input element
//     const inputValue = inputRef.current?.value ?? "";

//     if (!inputValue.trim()) return;

//     let data = {
//       id: nanoid(),
//       session_id: "1",
//       type: "text",
//       value: inputValue,
//       mediaUrl: "aa",
//       senderId: "123",
//       seen: false,
//     };
//     emitSocketEvent(SOCKET_CONNECTION_TYPES.AGENT_CHAT, data);

//     // Set the input value to an empty string to clear it
//     if (inputRef.current) {
//       inputRef.current.value = "";
//       inputRef.current?.focus();
//     }
//   };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    handleSendMessage();
  };

  return (
    <>
      <div className="p-2 flex justify-between w-full items-center gap-2">
        <div className="flex">
          <Popover>
            <PopoverTrigger asChild>
              <Link
                to="#"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-9 w-9",
                  "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                )}
              >
                <PlusCircle size={20} className="text-muted-foreground" />
              </Link>
            </PopoverTrigger>
            <PopoverContent side="top" className="w-full p-2">
              {message.trim() || isMobile ? (
                <div className="flex gap-2">
                  <Link
                    to="#"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "h-9 w-9",
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <Mic size={20} className="text-muted-foreground" />
                  </Link>
                  {BottombarIcons.map((icon, index) => (
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
              ) : (
                <Link
                  to="#"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "h-9 w-9",
                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  <Mic size={20} className="text-muted-foreground" />
                </Link>
              )}
            </PopoverContent>
          </Popover>
          {!message.trim() && !isMobile && (
            <div className="flex">
              {BottombarIcons.map((icon, index) => (
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
          )}
        </div>

        {/* <AnimatePresence initial={false}> */}
        <div
          key="input"
          className="w-full relative"
          // layout
          // initial={{ opacity: 0, scale: 1 }}
          // animate={{ opacity: 1, scale: 1 }}
          // exit={{ opacity: 0, scale: 1 }}
          // transition={{
          //   opacity: { duration: 0.05 },
          //   layout: {
          //     type: "spring",
          //     bounce: 0.15,
          //   },
          // }}
        >
          <Textarea
            autoComplete="off"
            value={message}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            name="message"
            placeholder="Aa"
            className=" w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background"
          ></Textarea>
          <div className="absolute right-2 bottom-0.5  ">
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

        <Button onClick={handleSendMessage} variant="ghost" size="icon">

          <SendHorizontal size={20} className="text-muted-foreground" />
          </Button>
        {message.trim() ? (
          <Link
            to="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            )}
            onClick={handleSendMessage}
          >
            <SendHorizontal size={20} className="text-muted-foreground" />
          </Link>
        ) : (
          <Link
            to="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            )}
              onClick={handleThumbsUp}
              // disabled={true}
          >
            <ThumbsUp size={20} className="text-muted-foreground" />
          </Link>
        )}
        {/* </AnimatePresence> */}
      </div>
    </>
  );
}
