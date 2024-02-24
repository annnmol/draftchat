'use client';

import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-primary">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          💬 NextChat
        </h1>
        <p className="text-white text-lg">
          A Next.js 14 Chat App with Authentication
        </p>
        <div>
          <LoginButton asChild mode="modal">
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
