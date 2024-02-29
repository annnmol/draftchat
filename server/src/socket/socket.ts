"use strict";
import { Server, Socket } from "socket.io";
import { SOCKET_CONNECTION_TYPES } from "../lib/enum";
import { redisPubClient, redisSubClient } from "../lib/redis";


const userSocketMap: any = {}; // {userId: socketId}

// Function to initialize Socket.IO
const initializeSocketIO = (io: Server) => {
  console.log("initializeSocketIO fn");

  return io.on(SOCKET_CONNECTION_TYPES.CONNECT, (socket: Socket) => {
    try {
      const userId = socket?.userId as string;
      const sessionId = socket?.sessionId as string;

      console.log(`🚀 ~ file: socket.ts:19 ~ NEW USER CONNECTED~ socket:${socket.id}`, {userId}, {sessionId}, );
      
      if (userId != "undefined") userSocketMap[userId] = sessionId;

      socket.emit("session", {userId,sessionId});

      // io.emit() is used to send events to all the connected clients
      io.emit("getOnlineUsers", Object.keys(userSocketMap));

      //*** ON EVENT : SOCKET DISCONNECT  ***//
      socket.on("disconnect", () => {
        console.log(`🚀 ~ file: socket.ts:50 ~ socket.on ~ disconnect:`, { userId, sessionId });
        delete userSocketMap?.[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
      });

      // *** DEBUG ALL SOCKET EVENTS  ***//
      socket.onAnyOutgoing((event, ...args) => {
        console.warn(`[${socket?.data?.connection_type}]: outgoing event: [${event}] --->`, args?.[0]);
      });
      socket.onAny((event, ...args) => {
        console.warn(`[${socket?.data?.connection_type}]:incoming event: [${event}] --->`, args?.[0]);
      });


    } catch (error) {
      handleSocketError(socket, io, error);
    }
  });
};


//*** Function to handle connection error ***//
const handleSocketError = (socket: Socket, io: Server, error: any) => {
  console.error("Error in socket initialization", error);

  // Handle connect error
  // io.to(socket.id).emit(
  //   SOCKET_CONNECTION_TYPES.CONNECT_ERROR,
  //   error || "Something went wrong while connecting to the socket."
  // );
};


const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};


export { initializeSocketIO, getReceiverSocketId };
