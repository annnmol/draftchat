"use client";

import { SERVER_BASE_URL } from "@/lib/network";
// import { SOCKET_CONNECTION_TYPES } from "@/lib/enum";
// import useStore from "@/zustand";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./auth-context";

declare module "socket.io-client" {
  export interface Socket {
    sessionId?: string;
    userId?: string;
  }
}

const notificationSound = "/sounds/notification.mp3";

const SOCKET_BASE_URL = SERVER_BASE_URL;
const sessionID = localStorage.getItem("sessionID") as string ?? '';

interface SocketProviderProps {
  children?: React.ReactNode;
}

interface ISocketContext {
  emitSocketEvent: (eventName: string, data: IData) => any;
  onlineUsers: any[];
  socket: Socket | undefined;
}

export const SocketContext = React.createContext<ISocketContext>({
  emitSocketEvent: () => {},
  onlineUsers: [],
  socket: undefined,
});

export const SocketContextProvider: React.FC<SocketProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | undefined>();
  const { authUser } = useAuth();
  // const { setMessages } = useStore();

  // const [messages, setMessages] = useState<IMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const emitSocketEvent: ISocketContext["emitSocketEvent"] = useCallback(
    (eventName: string, data: IData) => {
      if (!socket) return console.error("Socket not initialized");

      socket?.emit(eventName, data);
    },
    [socket]
  );

  // const onOnlineUser = useCallback((data: any) => {
  //   setOnlineUsers(data);
  // }, []);
  
  useEffect(() => {
    if (!authUser?._id) return;
    const _socket: Socket = io(SOCKET_BASE_URL, {
      
      query: {
        userId: authUser?._id,
      },
      auth: {
        userId: authUser?._id,
        sessionId: sessionID,
      },
      autoConnect: true,
    });

    const onOnlineUser = (data: any) => {
      setOnlineUsers(data);
    };


    _socket.on("connect", () => {
     setSocket(_socket);
      console.warn(`:incoming event: [connect] --->`, _socket);
    });

    _socket.on("connect_error", (err) => {
      if (err.message === "invalid user id") {
        console.warn(`:incoming event: [connect_error] --->`, err);
      }
    });

    _socket.on("session", (data: any) => {
       // attach the session ID to the next reconnection attempts
      _socket.auth = { sessionID };
      // store it in the localStorage
      localStorage.setItem("sessionID", data?.sessionId as string);
      // save the ID of the user
      _socket.userId = data?.userId as string;
      setSocket(_socket);
     });

    //gettting the online users
    _socket.on("getOnlineUsers", onOnlineUser);


    //** SOCKET DEBUGGING **//
    _socket.onAnyOutgoing((event, ...args) => {
      console.warn(`:outgoing event: [${event}] --->`, args?.[0]);
    });
    _socket.onAny((event, ...args) => {
      console.warn(`:incoming event: [${event}] --->`, args?.[0]);
    });

    return () => {
      _socket.off("getOnlineUsers", onOnlineUser);
      _socket.disconnect();
      setSocket(undefined);
    };
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ emitSocketEvent, socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

