"use client";

// import { signIn } from "next-auth/react";
// import { useSearchParams } from "next/navigation";
import { DraftingCompass, Github } from "lucide-react";

import { Button } from "@/components/ui/button";

// import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";

export const SocialButtons = () => {
  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    // signIn(provider, {
    //   callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    // });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <DraftingCompass className="h-5 w-5" />
        <span className="ml-2">Google</span>

      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <Github className="h-5 w-5" />
        <span className="ml-2">Github</span>
      </Button>
    </div>
  );
};
