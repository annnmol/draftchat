import { MoreHorizontal, SquarePen } from "lucide-react";
import { Link } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CreateConversation from "./create-conversation";

export default function SidebarHeader() {
  return (
    <>
      <div className="flex gap-2 items-center text-2xl">
        <p className="font-medium">Chats</p>
      </div>

      <div>
        <Link
          to="#"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-9 w-9"
          )}
        >
          <CreateConversation />
        </Link>
      </div>
    </>
  );
}
