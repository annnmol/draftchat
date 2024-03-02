import { Socket } from "socket.io";
import { redisSessionStore } from "../lib/redis"

declare module "socket.io" {
  export interface Socket {
    sessionId?: string;
    username?: string;
  }
}

const socketIOMiddleware = async (socket: Socket, next: Function) => {

  const username = socket.handshake.auth?.username as string;
  const sessionId = socket.handshake.auth?.sessionId as string;

  if (!username) {
    return next(new Error("invalid username"));
  }

  console.log(`🚀 ~ file: socketMiddleware.ts:47 ~ socketIOMiddleware ~ socketIOMiddleware:`, socket.handshake.auth, socket.id);

  if (sessionId) {
    // find existing session
    const session = await redisSessionStore.findSession(sessionId);
    console.log(`🚀 ~ file: socket-middleware.ts:35 ~ PREVIOUS SESSION Found:`, session);
    if (session) {
      socket.sessionId = sessionId;
      socket.username = session?.username as string;
      return next();
    }
  }

  // create new session
  socket.sessionId = socket.id;
  socket.username = username;
  next();
};



export default socketIOMiddleware;
