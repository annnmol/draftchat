import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useStore from "@/zustand";

import { handleError } from "@/lib/utils";
import { NetworkService } from "@/lib/network";
import { toast } from "sonner";

const useCreateConversations = () => {
	const [loading, setLoading] = useState(false);
	const addConversations = useStore(useShallow((state) => state.addConversations));

	const createConversations = (id: string): Promise<any> => {
		return new Promise((resolve, reject) => {
			setLoading(true);
			NetworkService.post(`/api/conversations/create/${id}`,{})
				.then((res: any) => {
					// console.log(`🚀 ~ file: useGetConversations.ts:18 ~ NetworkService.get ~ res:`, res);
					if (res?.error) {
						handleError(res);
						reject(res);
					} else {
						toast.success("New Chat Created", {
							description: `Start chatting with ${res?.data?.fullName} now.`,
							position: "top-center",
							duration: 1000,
						});
						addConversations(res?.data);
						resolve(res);
					}
				})
				.catch((error) => {
					handleError(error);
					reject(error);
				})
				.finally(() => {
					setLoading(false);
				});
		});
	};

	return { loading, createConversations };
};
export default useCreateConversations;
