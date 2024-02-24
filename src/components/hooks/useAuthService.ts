import { toast } from "sonner";
import { useState } from "react";
import { handleError } from "@/lib/utils";
import { useAuth } from "@/context/useAuth";
import { NetworkService } from "@/lib/network";
import { API_ENDPOINTS } from "@/lib/endpoints";

const useAuthService = () => {
    const [loading, setLoading] = useState(false);
    const { handleAuthChange } = useAuth();

    const loginFn = async (req: IData) => {
        setLoading(true);
        NetworkService.post(API_ENDPOINTS.LOGIN, req).then((res: any) => {
            console.log(`🚀 ~ file: useAuthService.ts:24 ~ loginFn ~ data:`, res);
            if (res?.error) return handleError(res?.error);
            // set cookies
            handleAuthChange(res);

            toast.success("Logged In", {
                description: res?.email ?? "",
                position: "top-center",
                duration: 3000,
            });

        }).catch((error) => {
            handleError(error);
        }).finally(() => {
            setLoading(false);
        });
    };


    const signupFn = async (req: IData) => {
        setLoading(true);
        NetworkService.post(API_ENDPOINTS.SIGNUP, req).then((res: any) => {
            console.log(`🚀 ~ file: useAuthService.ts:24 ~ signfn ~ data:`, res);
            if (res?.error) return handleError(res?.error);
            // set cookies
            handleAuthChange(res);

            toast.success("New Account created", {
                description: res?.email ?? "",
                position: "top-center",
                duration: 3000,
            });

        }).catch((error) => {
            handleError(error);
        }).finally(() => {
            setLoading(false);
        });
    };


    const logoutFn = async () => {
        setLoading(true);
        NetworkService.post(API_ENDPOINTS.LOGOUT, {}).then((res: any) => {
            console.log(`🚀 ~ file: useAuthService.ts:24 ~ logoutFn ~ data:`, res);
            if (res?.error) return handleError(res?.error);
            // set cookies
            handleAuthChange(res);

            toast.success("Logged out", {
                description: "",
                position: "top-center",
                duration: 3000,
            });

        }).catch((error) => {
            handleError(error);
        }).finally(() => {
            setLoading(false);
        });
    };

    return { loading, loginFn, signupFn, logoutFn };
};
export default useAuthService;