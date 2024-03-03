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
import useSendMessage from "@/components/hooks/useSendMessage";
import {NetworkService } from "@/lib/network";
import { toast } from "sonner";

function FilePicker() {
  const selectedConversation = useStore(
    useShallow((state) => state.selectedConversation)
  );

  const { loading, sendMessage } = useSendMessage();

  const [file, setFile] = useState<any>(undefined);
  const [mediaType, setMediaType] = useState<
    "image" | "video" | "document" | "audio" | undefined
  >(undefined);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e?.target?.files?.[0] ?? null;

    if (newFile) {
      const maxFileSizeMB = 10;
      const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;

      if (newFile?.size > maxFileSizeBytes) {
        console.error(`File size exceeds the limit of ${maxFileSizeMB}MB.`);
        setFile(null);
        setMediaType(undefined);
        setFile(undefined);
        toast.error("File Error", {
          description: `File size exceeds the limit of ${maxFileSizeMB}MB.`,
          position: "top-center",
          duration: 1000,
      });
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        // Detect media type based on file type
        const mimeType = newFile?.type;

        if (mimeType?.startsWith("image/")) {
          setMediaType("image");
          // setMediaUrl(reader?.result);
          setFile(newFile);
        } else if (mimeType?.startsWith("video/")) {
          setMediaType("video");
          // setMediaUrl(reader?.result);
          setFile(newFile);
        } else if (mimeType?.startsWith("audio/")) {
          // setMediaUrl(reader?.result);
          setFile(newFile);

          setMediaType("audio");
        } else if (mimeType?.startsWith("application/pdf")) {
          // setMediaUrl(reader?.result);
          setFile(newFile);

          setMediaType("document");
        } else {
          console.error(
            "Invalid file type. Please select an image, video, audio, or document file."
          );
          return setMediaType(undefined);
        }
      };

      reader.readAsDataURL(newFile);
    } else {
      console.error("No file selected.");
      // setMediaUrl(undefined);
      setFile(undefined);
      setMediaType(undefined);
    }
  };
  const handleSubmit = () => {
    if (file && mediaType?.trim && selectedConversation?._id) {
      const newMessage: any = {
        mediaType: mediaType,
        text: file?.name,
      };
      NetworkService.upload(
        "anmol-apps",
        `draftchat/${selectedConversation?._id}/${file?.name}`,
        file
      )
        .then((res) => {
          newMessage.mediaUrl = res;
          sendMessage(selectedConversation?._id, newMessage);
          toast.success("File sent", {
            description: ``,
            position: "top-center",
            duration: 1000,
        });
        })
        .catch((err) => {
          console.error("Error uploading file", err);
          toast.error("Error uploading file", {
            description: `Please try again.`,
            position: "top-center",
            duration: 1000,
        });
        })
        .finally(() => {
          handleCancel();
        });
    }

    setFile(null);
    setMediaType(undefined);
  };

  const handleCancel = () => {
    setFile(null);
    setMediaType(undefined);
    //note must add this custom line to shadcn the DialogContent --- dialog primivate.close
    document.getElementById('closeDialog')?.click();
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
          <DialogTitle>Upload Media</DialogTitle>
          <DialogDescription>
            Select the file from your system. Click save when you're done.
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
