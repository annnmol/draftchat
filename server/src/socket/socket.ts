"use strict";
import { Server, Socket } from "socket.io";
import { SOCKET_CONNECTION_TYPES } from "../lib/enum";
import { redisPubClient, redisSubClient } from "../lib/redis";


// Function to initialize Socket.IO
const initializeSocketIO = (io: Server) => {
  console.log("initializeSocketIO fn");


  redisSubClient.subscribe(SOCKET_CONNECTION_TYPES.AGENT_CHAT);
  redisSubClient.on("message", (channel, message) => {
    console.log(`Received ${message} from ${channel}`);
    if (channel === SOCKET_CONNECTION_TYPES.AGENT_CHAT) {

      // io.emit(SOCKET_CONNECTION_TYPES.AGENT_CHAT, message);
    }
  });

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


  //*** ON EVENT : Bot HISTORY REQUEST  ***//
  socket.on(
    SOCKET_CONNECTION_TYPES.AGENT_CHAT,
    async (data: any) => {

      // publish this message to redis
      await redisPubClient.publish(SOCKET_CONNECTION_TYPES.AGENT_CHAT, JSON.stringify({ data }));
      io.emit(SOCKET_CONNECTION_TYPES.AGENT_CHAT, JSON.stringify({ data }));
    }
  );



  //*** reconnect socket ***//
  socket.on(SOCKET_CONNECTION_TYPES.RECONNECT, (data: any) => {
    console.warn(`${socket.data.connection_type} reconnected:`, socket?.id, "reason:", data);
  });

  //*** disconnect socket ***//
  socket.on(SOCKET_CONNECTION_TYPES.DISCONNECT, (data: any) => {
    console.warn(`${socket.data.connection_type} disconnected:`, socket?.id, "reason:", data);
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
  io.to(socket.id).emit(
    SOCKET_CONNECTION_TYPES.CONNECT_ERROR,
    error || "Something went wrong while connecting to the socket."
  );
};


export { initializeSocketIO };
