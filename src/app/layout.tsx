import "@/global.css";
import { Toaster } from "sonner";
import Providers from "@/lib/providers";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <main className="relative h-full font-sans antialiased flex flex-col min-h-screen mx-auto w-full overflow-x-hidden">
        <Providers>
          <Outlet />
        </Providers>
      </main>
      <Toaster position="top-center" richColors />
    </>
  );
}
