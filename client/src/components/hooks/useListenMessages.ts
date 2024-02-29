import { useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";


import useStore from "@/zustand";
import { useSocket } from "@/context/use-socket";
import { useAuth } from "@/context/auth-context";

const notificationSound = "/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocket();
	const { authUser } = useAuth();
	const addMessages = useStore(useShallow((state) => state.addMessages));
	// const addMessages = useStore((state) => state.addMessages);
	// const {addMessages, messages} = useStore();
	const selectedConversation = useStore(useShallow((state) => state.selectedConversation));

	useEffect(() => {
		if (!socket) return;

		const onNewMessage = (data: any) => {
			if (data?.conversationId !== selectedConversation._id) {
				console.error("conversationId not matched")
				return;
			}
			console.log(`🚀 ~ file: useListenMessages.ts:16 ~ onNewMessage ~ data:`, data);
			addMessages(data);
			const sound = new Audio(notificationSound);
			sound.volume = 0.9;
			sound.play();
		};
		socket?.on("newMessage", onNewMessage);

		return () => {
			socket && socket?.off("newMessage", onNewMessage);
			// return undefined; // Explicitly return undefined
		};
	}, [socket, selectedConversation, addMessages]);




	// useEffect(() => {
	// 	const lastMessageIsFromOtherUser = messages.length && messages[messages.length - 1].sender !== currentUser._id;
	// 	if (lastMessageIsFromOtherUser) {
	// 		socket.emit("markMessagesAsSeen", {
	// 			conversationId: selectedConversation._id,
	// 			userId: selectedConversation.userId,
	// 		});
	// 	}

	// 	socket.on("messagesSeen", ({ conversationId }) => {
	// 		if (selectedConversation._id === conversationId) {
	// 			setMessages((prev) => {
	// 				const updatedMessages = prev.map((message) => {
	// 					if (!message.seen) {
	// 						return {
	// 							...message,
	// 							seen: true,
	// 						};
	// 					}
	// 					return message;
	// 				});
	// 				return updatedMessages;
	// 			});
	// 		}
	// 	});
	// }, [socket, currentUser._id, messages, selectedConversation]);


};

export default useListenMessages;
