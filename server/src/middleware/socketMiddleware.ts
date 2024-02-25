import { Socket } from "socket.io";

const socketIOMiddleware = async (socket: Socket, next: Function) => {
  const socketHeaders = socket.handshake.headers;

  console.log(`🚀 ~ file: socketMiddleware.ts:47 ~ socketIOMiddleware ~ socketIOMiddleware:`, socketHeaders);
  next();
};



export default socketIOMiddleware;
