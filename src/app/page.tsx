"use client";

import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { authUser } = useAuth();

  const navigate = useNavigate();

  const handleContinueBtn = () => {
    navigate("/chat");
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-primary">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          💬 DraftChat
        </h1>
        <p className="text-white text-lg">
          A Next.js 14 Chat App with Authentication
        </p>
        <div>
          {authUser?._id ? (
            <Button onClick={handleContinueBtn} variant="secondary" size="lg">
              Continue
            </Button>
          ) : (
            <LoginButton asChild mode="modal">
              <Button variant="secondary" size="lg">
                Sign in
              </Button>
            </LoginButton>
          )}
        </div>
      </div>
    </main>
  );
}
