import express from "express";
import { createConversation, deleteConversation, getConversation, myConversations } from "../controllers/conversation.controller";

const conversationRouter = express.Router();

conversationRouter.get("/me", myConversations);
conversationRouter.post("/create/:receiverEmail", createConversation);
conversationRouter.delete("/delete/:conversationId", deleteConversation);
conversationRouter.get("/get/:conversationId", getConversation);


export default conversationRouter;