import mongoose, { Document, Types } from "mongoose";

interface IConversation extends Document<Types.ObjectId> {
	participants: Types.ObjectId[];
	messages: Types.ObjectId[];
	lastMessage?: Types.ObjectId | undefined;
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
			type: mongoose.Schema.Types.ObjectId,
			ref: "Message",
			default: undefined,
		},
	},
	{ timestamps: true }
);
// Add indexes
conversationSchema.index({ participants: 1 });
conversationSchema.index({ _id: 1 });

const Conversation = mongoose.model<IConversation>("Conversation", conversationSchema);

export default Conversation;
