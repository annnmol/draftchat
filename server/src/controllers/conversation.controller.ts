import { Response } from "express";
import mongoose from "mongoose";
import Conversation from "../models/conversation.model";

async function getConversations(req: any, res: Response) {
	try {
		const userId = req?.user?._id;

		const userObjectId = new mongoose.Types.ObjectId(userId as string);

		const conversations = await Conversation.find({ participants: userObjectId }).populate({
			path: "participants",
			select: "fullName email username profilePic _id",
		}).populate({
			path: "lastMessage",
			select: "text senderId seen mediaType updatedAt",
		}).select("-messages");

		// remove the current user from the participants array
		conversations.forEach((conversation) => {
			conversation.participants = conversation.participants.filter(
				(participant) => participant?._id?.toString() !== userId?.toString()
			);
		});

		res.status(200).json({data: conversations});
	} catch (error: any) {
		res.status(500).json({ error: error?.message });
	}
}

async function createConversation(req: any, res: Response) {
	try {
		const { receiverId } = req?.params;
		const senderId = req?.user?._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			// create a new conversation
			conversation = new Conversation({
				participants: [senderId, receiverId],
				messages: [],
				lastMessage: undefined,
			});
			await conversation.save();
		}

		conversation = await conversation.populate({
			path: "participants",
			select: "fullName email username profilePic _id",
		});

		// remove the current user from the participants array
		conversation.participants = conversation.participants.filter(
			(participant) => participant?._id?.toString() !== senderId?.toString()
		);

		//TODO: SOCKET UPDATE THE RECIPIENT

		res.status(201).json({data: conversation});
	} catch (error: any) {
		res.status(500).json({ error: error?.message });
	}
}

async function getConversation(req: any, res: Response) {
	try {
		const { conversationId } = req?.params;
		const senderId = req?.user?._id;

		const conversationObjectId = new mongoose.Types.ObjectId(conversationId as string);

		let conversation = await Conversation.findById(conversationObjectId).populate({
			path: "participants",
			select: "fullName email username profilePic _id",
		}).populate({
			path: "lastMessage",
			select: "text senderId seen mediaType updatedAt",
		}).select("-messages");

		if (!conversation) {
			return res.status(404).json({ error: "Conversation not found" });
		}

		// remove the current user from the participants array
		conversation.participants = conversation.participants.filter(
			(participant) => participant?._id?.toString() !== senderId?.toString()
		);

		res.status(200).json({data: conversation});
	} catch (error: any) {
		res.status(500).json({ error: error?.message });
	}
}


async function deleteConversation(req: any, res: Response) {
	try {
		const { conversationId } = req?.params;

		const conversationObjectId = new mongoose.Types.ObjectId(conversationId as string);

		let conversation = await Conversation.findOneAndDelete({ _id: conversationObjectId });

		if (!conversation) {
			return res.status(404).json({ error: "Conversation not found" });
		}

		//TODO: SOCKET UPDATE THE RECIPIENT

		res.status(200).json({data: conversation});
	} catch (error: any) {
		res.status(500).json({ error: error?.message });
	}
}

export { createConversation, deleteConversation, getConversation, getConversations };

