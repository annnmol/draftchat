
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useStore from "@/zustand";

import { handleError } from "@/lib/utils";
import { NetworkService } from "@/lib/network";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const setMessages = useStore(useShallow((state) => state.setMessages));

	const getMessages = async (id: string) => {
		setLoading(true);
		NetworkService.get(`/api/messages/${id}`).then((res: any) => {
			// console.log(`🚀 ~ file: useGetMessages.ts:18 ~ NetworkService.get ~ res:`, res);
			if (res?.error) return handleError(res);
			setMessages(res?.data);
		}).catch((error) => {
			handleError(error);
		}).finally(() => {
			setLoading(false);
		});
	};

	return { getMessages, loading };
};
export default useGetMessages;
