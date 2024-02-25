// import Conversation from "../models/conversationModel.js";
// import Message from "../models/messageModel.js";
// import { getRecipientSocketId, io } from "../socket/socket.js";
// import { v2 as cloudinary } from "cloudinary";

import { Response } from "express";
import Conversation from "../models/conversation.model";
import Message from "../models/message.model";
import mongoose from "mongoose";

let msg = {
	"conversationId": "60f2a6c3d8b6c3f7f4c6f1e7",
	"receiverId": "60f2a6c3d8b6c3f7f4c6f1e7",
	"text": "Hello",
	"mediaType": "image",
	"mediaUrl": "https://res.cloudinary.com/dkkgmzj9d/image/upload/v1626622711/whatsapp-clone/whatsapp-clone-1626622710918.jpg",
	"seen": false,
}

async function sendMessage(req: any, res: Response) {
	try {
		const { conversationId } = req?.params;
		const { receiverId, text, mediaType, mediaUrl } = req.body;
		const senderId = req?.user?._id;

		const conversationObjectId = new mongoose.Types.ObjectId(conversationId as string);

		let conversation = await Conversation.findById(conversationObjectId);

		if (!conversation) {
			return res.status(404).json({ error: "Conversation not found" });
		}

		// if (img) {
		// 	const uploadedResponse = await cloudinary.uploader.upload(img);
		// 	img = uploadedResponse.secure_url;
		// }

		const newMessage = new Message({
			conversationId: conversation?._id,
			senderId: senderId,
			receiverId: receiverId,
			seen: false,
			text: text,
			mediaUrl: '',
			mediaType: '',
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
			conversation.lastMessage = {
				text: text,
				senderId: senderId,
				seen: false,
			};
		}

		await Promise.all([newMessage.save(),conversation.save()]);

				//TODO: SOCKET UPDATE THE RECIPIENT

		// const recipientSocketId = getRecipientSocketId(receiverId);
		// if (recipientSocketId) {
		// 	io.to(recipientSocketId).emit("newMessage", newMessage);
		// }

		res.status(201).json(newMessage);
	} catch (error: any) {
		res.status(500).json({ error: error?.message });
	}
}

async function getMessages(req: any, res: Response) {
	try {
		const { conversationId } = req?.params;
		const senderId = req?.user?._id;

		const conversationObjectId = new mongoose.Types.ObjectId(conversationId as string);

		const conversationPromise = Conversation.findById(conversationObjectId).populate({
            path: 'messages',
            options: { sort: { 'createdAt': 1 } }
        });

        const updateSeenStatusPromise = Message.updateMany(
            {
                conversationId: conversationObjectId,
                receiverId: senderId,
                seen: false,
            },
            { seen: true }
        );

        // Wait for the promises to resolve here in parallel
        const [conversation, updateSeenStatusResult] = await Promise.all([conversationPromise, updateSeenStatusPromise]);

        if (!conversation) {
            return res.status(404).json([]);
        }

        //update the last message seen status
        await conversation.updateOne({
            lastMessage: {
                ...conversation.lastMessage,
                seen: true,
            },
        });


		//TODO: SOCKET UPDATE THE RECIPIENT


        const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error: any) {
		res.status(500).json({ error: error?.message });
	}
}



export { sendMessage, getMessages };
