import { GITHUB_URL } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { Github, LogOut } from "lucide-react";
import useAuthService from "../hooks/useAuthService";
import { Link } from "react-router-dom";

interface Props {}

export default function Header() {
  const { loading, logoutFn } = useAuthService();

  return (
    <>
      <Link to="#" className="text-4xl font-bold text-gradient">
      💬 DraftChat
      </Link>
      <Link
        to={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "h-10 w-10"
        )}
      >
        <Github className="w-7 h-7 text-muted-foreground" />
      </Link>

      <Button onClick={() => logoutFn()} variant="ghost" disabled={loading}>
        <LogOut className="w-7 h-7 text-muted-foreground" />
      </Button>
    </>
  );
}
