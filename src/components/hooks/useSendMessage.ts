import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useStore from "@/zustand";

import { handleError } from "@/lib/utils";
import { NetworkService } from "@/lib/network";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const setMessages = useStore(useShallow((state) => state.setMessages));

	const sendMessage = async (message: any, id: string) => {
		NetworkService.post(`/api/messages/send/${id}`, { message }).then((res: any) => {
			console.log(`🚀 ~ file: useSendMessage.ts:16 ~ NetworkService.post ~ res:`, res);
			if (res?.error) return handleError(res);
			setMessages(res);
		}).catch((error) => {
			handleError(error);
		}).finally(() => {
			setLoading(false);
		});
	};

	return { sendMessage, loading };
};
export default useSendMessage;
