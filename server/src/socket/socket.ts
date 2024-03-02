"use strict";
import { Server, Socket } from "socket.io";
import { SOCKET_CONNECTION_TYPES } from "../lib/enum";
import { redisPubClient, redisSessionStore } from "../lib/redis";


const userSocketMap: any = {}; // {userId: socketId}

// Function to initialize Socket.IO
const initializeSocketIO = async (io: Server) => {
  // let data = await redisSessionStore.findAllSessions()
  // console.log("initializeSocketIO fn",data );
  return io.on(SOCKET_CONNECTION_TYPES.CONNECT, async (socket: Socket) => {
    try {
      const username = socket?.username as string;
      const sessionId = socket?.sessionId as string;
      if (!username || !sessionId) return new Error("invalid session or username");
      userSocketMap[username] = sessionId;
      
      redisSessionStore.saveSession(socket.sessionId as string, {
        username: socket.username,
        connected: true,
      });

      // emit session details
      socket.emit("session", {
        sessionId: socket.sessionId as string,
        username: socket.username as string,
      });

      // join the "username" room
      socket.join(socket.username as string);


      //broadcast to users only whom he is chatting
      socket.broadcast.emit("new session", {
        username: socket.username,
        sessionId: socket.sessionId,
        connected: true,
      });

      // socket.emit("session", {userId,sessionId});

      // io.emit() is used to send events to all the connected clients
      io.emit("getOnlineUsers", Object.keys(userSocketMap));



      // forward the private message to the right recipient (and to other tabs of the sender)
      socket.on("private message", async (data: any, callback: Function) => {
        // const message = {
        //   content,
        //   from: socket.userID,
        //   to,
        // };
        // socket.to(to).to(socket.userID).emit("private message", message);
        // messageStore.saveMessage(message);

        // callback(null, "emit is emiited"); // Send acknowledgement with result
        // callback(new Error("No session ID")); // Send acknowledgement with error

      });


      //*** ON EVENT : SOCKET DISCONNECT  ***//
      socket.on("disconnect", async (data:any) => {
        console.log(`🚀 ~ file: socket.ts:50 ~ socket.on ~ disconnect:`, { username, sessionId }, data);
        delete userSocketMap?.[username];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));


        // check if the user has any other active connections
        const matchingSockets = await io.in(socket.username as string).allSockets();

        console.log(`🚀 ~ file: socket.ts:79 ~ socket.on ~ matchingSockets:`, matchingSockets);

        const isDisconnected = matchingSockets.size === 0;

        console.log(`🚀 ~ file: socket.ts:83 ~ socket.on ~ isDisconnected:`, isDisconnected);

        if (isDisconnected) {
          // notify other users
          // socket.broadcast.emit("user disconnected", socket.username);
          // update the connection status of the session
        //  await redisSessionStore.saveSession(socket.sessionId as string, {
        //     username: socket.username,
        //     connected: false,
        //  });
         await redisSessionStore.saveSession(socket.sessionId as string, {
          username: socket.username,
          connected: false,
        });
  


          // //broadcast to users only whom he is chatting
          // socket.broadcast.emit("new session", {
          //   username: socket.username,
          //   sessionId: socket.sessionId,
          //   connected: true,
          // });
        }
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
}


const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};


export { initializeSocketIO, getReceiverSocketId };
