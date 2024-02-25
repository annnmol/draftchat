"use client";

import { SERVER_BASE_URL } from "@/lib/network";
// import { SOCKET_CONNECTION_TYPES } from "@/lib/enum";
// import useStore from "@/zustand";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const notificationSound = "/sounds/notification.mp3";

const SOCKET_BASE_URL = SERVER_BASE_URL;

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

export const SocketContextProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | undefined>();
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

  // useEffect(() => {
  //   const _socket: Socket = io(SOCKET_BASE_URL, {
  //     query: {
  //       userId: "123",
  //     },
  //   });

  //   setSocket(_socket);


  //   const onOnlineUser = (data: any) => {
  //     console.log(`🚀 ~ file: socket-context.tsx:84 ~ onOnlineUser ~ data:`, data);
  //     // setOnlineUsers(data);
  //   };

  //   _socket.on("getOnlineUsers", onOnlineUser);

  //   //** SOCKET DEBUGGING **//
  //   _socket.onAnyOutgoing((event, ...args) => {
  //     console.warn(`:outgoing event: [${event}] --->`, args?.[0]);
  //   });
  //   _socket.onAny((event, ...args) => {
  //     console.warn(`:incoming event: [${event}] --->`, args?.[0]);
  //   });

  //   return () => {
  //     _socket.off("getOnlineUsers", onOnlineUser);
  //     _socket.disconnect();
  //     setSocket(undefined);
  //   };
  // }, []);

  return (
    <SocketContext.Provider value={{ emitSocketEvent, socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};


export const useSocket = () => {
  const state = useContext(SocketContext);
  return state ?? undefined;
};
