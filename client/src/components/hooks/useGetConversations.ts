import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useStore from "@/zustand";

import { handleError } from "@/lib/utils";
import { NetworkService } from "@/lib/network";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const setConversations = useStore(useShallow((state) => state.setConversations));
	const getConversations = async () => {
		setLoading(true);
		NetworkService.get(`/api/conversations/me`).then((res: any) => {
			// console.log(`🚀 ~ file: useGetConversations.ts:18 ~ NetworkService.get ~ res:`, res);
			if (res?.error) return handleError(res);
			setConversations(res?.data);
		}).catch((error) => {
			handleError(error);
		}).finally(() => {
			setLoading(false);
		});
	};


	return { loading, getConversations };
};
export default useGetConversations;
