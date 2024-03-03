import { Outlet } from "react-router-dom";
import "@/global.css";
import Providers from "@/lib/providers";

export default function RootLayout() {
  return (
      <main className="relative h-full font-sans antialiased flex flex-col min-h-screen mx-auto w-full overflow-hidden">
        <Providers>
          <Outlet />
        </Providers>
      </main>
  );
}
