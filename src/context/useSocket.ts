import { useContext } from "react";
import { SocketContext } from "./socket-context";

export const useSocket = () => {
    const state = useContext(SocketContext);
    return state ?? undefined;
};
