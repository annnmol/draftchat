import { useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";


import useStore from "@/zustand";
import { useSocket } from "@/context/useSocket";

const notificationSound = "/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocket();
	const setMessages = useStore(useShallow((state) => state.setMessages));

	const onNewMessage = useCallback((data: string) => {
		const message = JSON.parse(data);
		const newMessage: any = message?.data;
		newMessage.shouldShake = true;
		const sound = new Audio(notificationSound);
		sound.volume = 0.4;
		sound.play();
		setMessages(newMessage);
	}, [setMessages]);

	useEffect(() => {
		// if (!socket) return;

		socket?.on("chat", onNewMessage);

		return () => {
			socket && socket?.off("chat", onNewMessage);
			// return undefined; // Explicitly return undefined
		};
	}, [socket, onNewMessage]);

};

export default useListenMessages;
