import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useStore from "@/zustand";

import { handleError } from "@/lib/utils";
import { NetworkService } from "@/lib/network";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const addMessages = useStore(useShallow((state) => state.addMessages));

	const sendMessage = async (id: string, data: any) => {
		setLoading(true);
		
		NetworkService.post(`/api/messages/send/${id}`, data).then((res: any) => {
			if (res?.error) return handleError(res);
			addMessages(res?.data);
		}).catch((error) => {
			handleError(error);
		}).finally(() => {
			setLoading(false);
		});
	};

	return { sendMessage, loading };
};
export default useSendMessage;
