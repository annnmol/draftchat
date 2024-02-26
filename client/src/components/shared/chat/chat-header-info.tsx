import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useStore from "@/zustand";
import { Info, Phone, Video } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import ChatAvatar from "./chat-avatar";
import { formatDateTime } from "@/lib/utils";

const ChatHeaderInfo = () => {
  const selectedConversation = useStore(
    useShallow((state) => state.selectedConversation)
  );
  const oppositeUser = selectedConversation?.participants?.[0];
  const updatedAt = formatDateTime(selectedConversation?.updatedAt).dateTime;
  const createdAt = formatDateTime(selectedConversation?.createdAt).dateTime;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Info size={20} className="text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>View profile</SheetTitle>
          <SheetDescription>
            Information of the person you're chatting with.
            {/* Make changes to your profile here. Click save when you're done. */}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex align-middle justify-center">
            <ChatAvatar
              name={oppositeUser?.fullName}
              src={oppositeUser?.profilePic}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Full name
            </Label>
            <Input
              id="name"
              disabled
              value={oppositeUser?.fullName}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              disabled
              value={oppositeUser?.username}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Email
            </Label>
            <Input
              id="username"
              disabled
              value={oppositeUser?.email}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right col-span-2">
              Conversation Since:
            </Label>
            <p className="text-muted-foreground text-[14px] w-full col-span-2">
              {createdAt}
            </p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right col-span-2">
              Last Activity:
            </Label>
            <p className="text-muted-foreground text-[14px] w-full col-span-2">
              {updatedAt}
            </p>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" className="w-full mt-8" variant={"ghost"} >Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ChatHeaderInfo;
