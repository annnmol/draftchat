import { Socket } from "socket.io";

const socketIOMiddleware = async (socket: Socket, next: Function) => {
  const socketHeaders = socket.handshake.headers;
  // console.log("socketHeaders", socketHeaders);

  const connection_type: "user" | "agent" = socketHeaders?.["connection_type"] == "agent" ? "agent": "user";

  socket.data.connection_type = connection_type;

  console.log(`🚀 ~ file: socketMiddleware.ts:47 ~ socketIOMiddleware ~ socketIOMiddleware:`, connection_type);
  next();
};



export default socketIOMiddleware;
