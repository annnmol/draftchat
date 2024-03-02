import express from 'express';
import http from "node:http";
import cors from 'cors';
import {config} from 'dotenv';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import cookieParser from "cookie-parser";
//user defined imports
import { errorHandlingLogging, healthCheckLogging, incomingRequestLogging } from './lib/utils';
import socketIOMiddleware from './socket/socket-middleware';
import conversationRouter from "./routes/conversation.routes";
import { initializeSocketIO } from './socket/socket';
import { redisPubClient, redisSubClient } from './lib/redis';
import connectToMongoDB from './lib/mongoDB';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import middleware from './middleware/middleware';
import messageRouter from './routes/message.routes';
const { instrument } = require("@socket.io/admin-ui");

config();

const PORT = Number(process.env.PORT ?? 3005);

/** EXPRESS app initialize */
const app = express();

/** http Server Handling */
const httpServer = http.createServer(app);

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
}));
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(bodyParser.json()); //
app.use(cookieParser()); // to parse the incoming requests with cookies

//* intialize socket socket server *//
const io = new Server(httpServer, {
    pingTimeout: 60000,
    cors: {
      origin: "*",
      credentials: true
    },
  // Attach the Socket.IO server to the Redis adapter
    adapter: createAdapter(redisPubClient, redisSubClient)
  });

//* using set method to mount the `io` instance on the app to avoid usage of `global` variable
app.set("io", io);

// Apply Socket.IO middleware
io.use((socket, next) => {
    socketIOMiddleware(socket, next);
});

//ATTACH SOCKET ADMIN UI
instrument(io, {
    auth: {
      type: "basic",
      username: process.env.SOCKET_ADMIN_USERNAME,
      password: process.env.SOCKET_ADMIN_PASSWORD
    },
    mode: "development",
  });
  
  // Serve the Socket.IO Admin UI on the /admin-ui/socket endpoint
 app.use("/admin-ui/socket", express.static("./node_modules/@socket.io/admin-ui/ui/dist"));

/** Log the incoming request */
app.use(incomingRequestLogging);

//* Redis Adapter for Socket.IO *//
io.adapter(createAdapter(redisPubClient, redisSubClient));

// Health check endpoint
app.get("/api/health-check", healthCheckLogging);

// routes
app.use("/api/auth", authRouter);

//protected routes
app.use(middleware)
app.use("/api/users", userRouter);
app.use("/api/conversations",conversationRouter);
app.use("/api/messages",messageRouter);

/** Route Error handling */
app.use(errorHandlingLogging);


//app start
httpServer.listen(PORT, () => {
    connectToMongoDB();
    console.info(`Server is running at PORT: ${PORT}`);
    // Start the server and initialize Socket.IO
    initializeSocketIO(io);
});

// export default app;
export { io, httpServer, app}
