import { Response } from "express";
import Conversation from "../models/conversation.model";
import Message from "../models/message.model";
import mongoose from "mongoose";

async function sendMessage(req: any, res: Response) {
	try {
		const { conversationId } = req?.params;

		const { text, mediaType, mediaUrl } = req.body;

		console.log(`🚀 ~ file: message.controller.ts:12 ~ sendMessage ~ text:`, text);


		if (!text && !mediaUrl) {
			return res.status(400).json({ error: "message cannot be empty." });
		}

		console.log(`🚀 ~ file: message.controller.ts:12 ~ sendMessage ~ text:`, text);

		const senderId = req?.user?._id;

		const conversationObjectId = new mongoose.Types.ObjectId(conversationId as string);

		let conversation = await Conversation.findById(conversationObjectId);
		
		if (!conversation) {
			return res.status(404).json({ error: "Conversation not found" });
		}

		const newMessage = new Message({
			conversationId: conversation?._id,
			senderId: senderId,
			seen: false,
			text: text,
			mediaUrl: mediaUrl ?? "",
			mediaType: mediaType ?? "",
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
			conversation.lastMessage = newMessage._id;
		}

		await Promise.all([newMessage.save(), conversation.save()]);
		
		// remove the current user from the participants array
		conversation.participants = conversation.participants.filter(
			(participant) => participant?._id?.toString() !== senderId?.toString()
		);

		const finalMessgae =  await newMessage.populate({
			path: 'senderId',
			select: 'fullName email username profilePic _id'
		})

		//TODO: SOCKET UPDATE THE RECIPIENT

		// const recipientSocketId = getRecipientSocketId(receiverId);
		// if (recipientSocketId) {
		// 	io.to(recipientSocketId).emit("newMessage", newMessage);
		// }
		

		res.status(201).json({data: finalMessgae});
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
			options: { sort: { 'createdAt': 1 } },
			populate: {
				path: 'senderId',
				select: 'fullName email username profilePic _id'
			}
        });

        const updateSeenStatusPromise = Message.updateMany(
            {
                conversationId: conversationObjectId,
				senderId: { $ne: senderId },
                seen: false,
            },
            { seen: true }
        );

        // Wait for the promises to resolve here in parallel
        const [conversation, updateSeenStatusResult] = await Promise.all([conversationPromise, updateSeenStatusPromise]);

        if (!conversation) {
            return res.status(404).json([]);
        }

		//TODO: SOCKET UPDATE THE RECIPIENT
		
		const messages = conversation.messages;
		// Group messages by date
		const messagesByDate = conversation.messages.reduce((groups:any, message:any) => {
			const date = message?.createdAt?.toISOString().split('T')[0];
			if (!groups[date]) {
				groups[date] = [];
			}
			groups[date].push(message);
			return groups;
		}, {});

		res.status(200).json({data:messagesByDate});
	
	} catch (error: any) {
		res.status(500).json({ error: error?.message });
	}
}



export { sendMessage, getMessages };
