import mongoose, { Document, Types } from "mongoose";

interface IMessage extends Document<Types.ObjectId> {
	conversationId: Types.ObjectId;
	senderId: Types.ObjectId;
	receiverId: Types.ObjectId;
	seen: boolean;
	text: string;
	mediaUrl?: string;
	mediaType?: string;
}

const messageSchema = new mongoose.Schema<IMessage>(
	{
		conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
		senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		seen: { type: Boolean, default: false },
		text: { type: String, default: "" },
		mediaUrl: { type: String, default: "" },
		mediaType: { type: String, default: "" },
	},
	{ timestamps: true }
);

// Add indexes
messageSchema.index({ conversationId: 1 });
messageSchema.index({ _id: 1 })

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;
