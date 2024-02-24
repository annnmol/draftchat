import { SocketProvider } from "@/context/socket-context";
import { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      {/* {children} */}
      <SocketProvider>{children}</SocketProvider>
    </>
  );
};

export default Providers;
