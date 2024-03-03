import { GITHUB_URL } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { Github, LogOut } from "lucide-react";
import useAuthService from "../hooks/useAuthService";
import { Link } from "react-router-dom";
import ChatAvatar from "./chat/chat-avatar";
import { useAuth } from "@/context/auth-context";

interface Props {}

export default function Header() {
  const { loading, logoutFn } = useAuthService();
  const { authUser } = useAuth();
  return (
    <>
      <Link to="#" className="text-2xl font-bold text-gradient">
        💬 DraftChat
      </Link>
      <div className="flex align-middle justify-end gap-2">
        <Link
          to={"#"}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" })
            // "h-10 w-10"
          )}
        >
          <ChatAvatar
            src={authUser?.profilePic}
            name={authUser?.fullName}
            className="w-8 h-8"
          />
        </Link>
        <Button onClick={() => logoutFn()} variant="ghost" disabled={loading}>
          <LogOut className="w-6 h-6 text-muted-foreground" />
        </Button>
      </div>
    </>
  );
}
