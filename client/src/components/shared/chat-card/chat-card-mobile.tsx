import ChatAvatar from "@/components/shared/chat/chat-avatar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface Props {
  conversation: any;
  isSelected: boolean;
  handleClick: (conversation: any) => void;
}

export default function ChatCardMobile({
  conversation,
  isSelected = false,
  handleClick,
}: Props) {
  const oppositeUser = conversation?.participants?.[0];
  return (
    <Link
      to="#"
      onClick={() => handleClick(conversation)}
      className={cn(
        buttonVariants({
          variant: isSelected ? "secondary" : "ghost",
          size: "icon",
        }),
        "h-11 w-11 md:h-16 md:w-16",
        isSelected &&
          "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white bg-slate-200"
      )}
    >
      <ChatAvatar
        src={oppositeUser?.profilePic}
        name={oppositeUser?.fullName}
        className="w-9 h-9"
      />

      <span className="sr-only">{oppositeUser?.fullName}</span>
    </Link>
  );
}
