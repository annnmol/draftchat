import mongoose, { Document, Types } from "mongoose";

interface IConversation extends Document<Types.ObjectId> {
	participants: Types.ObjectId[];
	lastMessage?: {
		text: string;
		senderId: Types.ObjectId;
		seen: boolean;
		
	};
	messages: Types.ObjectId[];
}

const conversationSchema = new mongoose.Schema<IConversation>(
	{
		participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message",
				default: [],
			},
		],
		lastMessage: {
			text: String,
			senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
			seen: {
				type: Boolean,
				default: false,
			},
		},
	},
	{ timestamps: true }
);

const Conversation = mongoose.model<IConversation>("Conversation", conversationSchema);

export default Conversation;
