import { useContext } from "react";
import { AuthContext } from "./auth-context";

export const useAuth = () => {
    const state = useContext(AuthContext);
    return state ?? undefined;
};
