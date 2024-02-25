import express from "express";
import { createConversation, deleteConversation, getConversation, getConversations } from "../controllers/conversation.controller";

const conversationRouter = express.Router();

conversationRouter.get("/me", getConversations);
conversationRouter.get("/:conversationId", getConversation);
conversationRouter.post("/create/:receiverId", createConversation);
conversationRouter.delete("/delete/:conversationId", deleteConversation);


export default conversationRouter;