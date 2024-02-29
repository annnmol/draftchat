// FilePicker.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Paperclip } from "lucide-react";
import useStore from "@/zustand";
import { useShallow } from "zustand/react/shallow";
import useSendMessage from "../hooks/useSendMessage";

function FilePicker() {
  const selectedConversation = useStore(
    useShallow((state) => state.selectedConversation)
  );

  const { loading, sendMessage } = useSendMessage();

  const [mediaUrl, setMediaUrl] = useState<any>(undefined);
  const [mediaType, setMediaType] = useState<
    "image" | "video" | "document" | "audio" | undefined
  >(undefined);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0] ?? null;

    if (file) {
      const maxFileSizeMB = 5;
      const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;

      if (file?.size > maxFileSizeBytes) {
        console.error(`File size exceeds the limit of ${maxFileSizeMB}MB.`);
        setMediaUrl(null);
        setMediaType(undefined);
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        // Detect media type based on file type
        const mimeType = file?.type;

        if (mimeType?.startsWith("image/")) {
          setMediaType("image");
          setMediaUrl(reader?.result);
        } else if (mimeType?.startsWith("video/")) {
          setMediaType("video");
          setMediaUrl(reader?.result);
        } else if (mimeType?.startsWith("audio/")) {
          setMediaUrl(reader?.result);

          setMediaType("audio");
        } else if (mimeType?.startsWith("application/pdf")) {
          setMediaUrl(reader?.result);

          setMediaType("document");
        } else {
          console.error(
            "Invalid file type. Please select an image, video, audio, or document file."
          );
          return setMediaType(undefined);
        }
      };

      reader.readAsDataURL(file);
    } else {
      console.error("No file selected.");
      setMediaUrl(undefined);
      setMediaType(undefined);
    }
  };
  const handleSubmit = () => {
    if (mediaUrl?.trim() && mediaType?.trim && selectedConversation?._id) {
      const newMessage = {
        mediaUrl,
        mediaType,
        text: "",
      };
      sendMessage(selectedConversation?._id, newMessage);
    }

    setMediaUrl(null);
    setMediaType(undefined);
  };

  const handleCancel = () => {
    setMediaUrl(null);
    setMediaType(undefined);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Paperclip size={20} className="text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>
            Select the image from your system. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Choose File</Label>
            <Input id="picture" type="file" onChange={handleFileChange} />
          </div>
        </div>
        <DialogFooter>
          {/* <DialogClose asChild>
            <Button type="button" variant="ghost" onClick={handleCancel} className="w-full">
              Close
            </Button>
          </DialogClose> */}
          <DialogClose asChild>
            <Button
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
              className="w-full"
            >
              {loading ? (
                <Loader2 size={20} className={"text-primary/60 animate-spin"} />
              ) : null}{" "}
              Send Message
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FilePicker;
