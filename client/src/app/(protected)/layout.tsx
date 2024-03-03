import { Outlet } from "react-router-dom";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { SocketContextProvider } from "@/context/socket-context";

export default function ProtectedLayout() {
  return (
    <SocketContextProvider>
      <main className="flex flex-col overflow-hidden flex-1 max-h-[100vh] p-2">
        <div className="flex justify-between w-full items-center min-h-[48px]">
          <Header />
        </div>

        <div className="z-10 border rounded-lg w-full flex-grow overflow-hidden text-sm flex">
          <Outlet/>
        </div>
        {/* <div className="flex justify-between max-w-5xl w-full items-start text-xs md:text-sm text-muted-foreground ">
        <Footer />
      </div> */}
      </main>
    </SocketContextProvider>
  );
}
