import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller";

const messageRouter = express.Router();

messageRouter.post("/send/:conversationId", sendMessage);
messageRouter.get("/:conversationId", getMessages);


export default messageRouter;