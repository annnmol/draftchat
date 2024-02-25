"use strict";
import { Server, Socket } from "socket.io";
import { SOCKET_CONNECTION_TYPES } from "../lib/enum";
import { redisPubClient, redisSubClient } from "../lib/redis";


const userSocketMap: any = {}; // {userId: socketId}

// Function to initialize Socket.IO
const initializeSocketIO = (io: Server) => {
  console.log("initializeSocketIO fn");


  // redisSubClient.subscribe(SOCKET_CONNECTION_TYPES.AGENT_CHAT);
  // redisSubClient.on("message", (channel, message) => {
  //   console.log(`Received ${message} from ${channel}`);
  //   if (channel === SOCKET_CONNECTION_TYPES.AGENT_CHAT) {

  //     // io.emit(SOCKET_CONNECTION_TYPES.AGENT_CHAT, message);
  //   }
  // });

  return io.on(SOCKET_CONNECTION_TYPES.CONNECT, (socket: Socket) => {
    try {
      console.warn(`${socket.data.connection_type} connected:`, socket?.id,);
      startSocketListeners(socket, io);


    } catch (error) {
      handleSocketError(socket, io, error);
    }
  });
};

const startSocketListeners = (socket: Socket, io: Server) => {
  // logging.info("socket variables data", socket.data);
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId as string;

	console.log(`🚀 ~ file: socket.ts:41 ~ startSocketListeners ~ userId:`, userId);

  if (userId != "undefined") userSocketMap[userId] = socket.id;
  
  // io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // //*** ON EVENT : Bot HISTORY REQUEST  ***//
  // socket.on(
  //   SOCKET_CONNECTION_TYPES.AGENT_CHAT,
  //   async (data: any) => {
  //     // publish this message to redis
  //     await redisPubClient.publish(SOCKET_CONNECTION_TYPES.AGENT_CHAT, JSON.stringify({ data }));
  //     io.emit(SOCKET_CONNECTION_TYPES.AGENT_CHAT, JSON.stringify({ data }));
  //   }
  // );


  //*** ON EVENT : SOCKET DISCONNECT  ***//
  socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
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


const getReceiverSocketId = (receiverId:string) => {
	return userSocketMap[receiverId];
};


export { initializeSocketIO, getReceiverSocketId };
