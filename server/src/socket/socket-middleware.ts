import { Socket } from "socket.io";
import { socketSessionStore } from "../socket/socket-session-store";
import { nanoid } from "nanoid";

declare module "socket.io" {
  export interface Socket {
    sessionId?: string;
    userId?: string;
  }
}

const socketIOMiddleware = async (socket: Socket, next: Function) => {

  const userId = socket.handshake.auth?.userId as string;
  const sessionId = socket.handshake.auth?.userId as string;

  if (!userId) {
    return next(new Error("invalid username"));
  }

  console.log(`🚀 ~ file: socketMiddleware.ts:47 ~ socketIOMiddleware ~ socketIOMiddleware:`, socket.handshake.auth, socket.id);


  if (sessionId) {
    // find existing session
    const session = socketSessionStore.findSession(sessionId);
    if (session) {
      socket.sessionId = sessionId;
      socket.userId = session.userID;
      return next();
    }
  }

  // create new session
  socket.sessionId = socket.id;
  socket.userId = userId;
  next();


  // next();
};



export default socketIOMiddleware;
