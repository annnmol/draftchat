import ChatAvatar from "@/components/shared/chat/chat-avatar";
import { useSocket } from "@/context/use-socket";
import useStore from "@/zustand";
import { useShallow } from "zustand/react/shallow";
import ChatHeaderInfo from "./chat-header-info";



// interface Props {}

export default function ChatHeader() {
  const selectedConversation = useStore(useShallow((state) => state.selectedConversation));
  const {onlineUsers} = useSocket();
  const oppositeUser = selectedConversation?.participants?.[0];
  // const lastActive = formatDateTime(selectedConversation?.updatedAt).dateTime;
  const lastActive = onlineUsers?.includes(oppositeUser?._id) ? "Online" : "Offline";
  return (
      <div className="w-full min-h-[56px] max-h-[56px] flex p-4 justify-between items-center border-b shadow">
        <div className="flex items-center gap-2">
          <ChatAvatar
            name={oppositeUser?.fullName}
            src={oppositeUser?.profilePic}
          />
          <div className="flex flex-col">
            <span className="font-medium">{oppositeUser?.fullName}</span>
            <span className="text-xs">{lastActive}</span>
          </div>
        </div>

        <div>
          <ChatHeaderInfo/>
        </div>
      </div>
  );
}
