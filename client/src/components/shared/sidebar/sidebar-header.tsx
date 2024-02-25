import { MoreHorizontal, SquarePen } from "lucide-react";
import { Link } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";


interface Props {
  chatsCount: number;
}

export default function SidebarHeader({ chatsCount = 0 }: Props) {
  return (
    <>
      <div className="flex gap-2 items-center text-2xl">
        <p className="font-medium">Chats</p>
        {chatsCount > 0 && (
          <span className="text-zinc-300">({chatsCount})</span>
        )}
      </div>

      <div>
        <Link
          to="#"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-9 w-9"
          )}
        >
          <MoreHorizontal size={20} />
        </Link>

        <Link
          to="#"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-9 w-9"
          )}
        >
          <SquarePen size={20} />
        </Link>
      </div>
    </>
  );
}
