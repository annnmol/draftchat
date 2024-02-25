import { AuthContextProvider } from "@/context/auth-context";
import { SocketContextProvider } from "@/context/socket-context";
import { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <AuthContextProvider>
        <SocketContextProvider>{children}</SocketContextProvider>
      </AuthContextProvider>
    </>
  );
};

export default Providers;
