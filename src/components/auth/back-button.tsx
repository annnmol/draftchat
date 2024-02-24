import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <span className="w-full border-t text-muted-foreground" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>

      <Button variant="secondary" asChild>
        <Link to={href}>{label}</Link>
      </Button>
    </div>
  );
};
