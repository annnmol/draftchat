import {
  PropsWithChildren,
  createContext,
  useState,
} from "react";

export const AUTH_USER_KEY = "auth-user";
export const AUTH_TOKEN_KEY = "auth-token";

interface IAuthUserContext {
  authUser: any | undefined;
  handleAuthChange: (data: any) => void;
}

export const AuthContext = createContext({
  authUser: undefined,
  handleAuthChange: (data: any) => undefined,
} as IAuthUserContext);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const getItem = localStorage.getItem(AUTH_USER_KEY) ?? "{}";
  const parsedItem = JSON.parse(getItem) ?? undefined;
  const [authUser, setAuthUser] = useState(parsedItem);

  const handleAuthChange = (data: any) => {

    console.log(`🚀 ~ file: auth-context.tsx:35 ~ handleAuthChange ~ data:`, data);

    if (data) {
      localStorage.setItem(AUTH_TOKEN_KEY, data?.token ?? null);
      setAuthUser(data ?? null);
    } else {
      //logout
      localStorage.removeItem(AUTH_TOKEN_KEY);
      setAuthUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ authUser, handleAuthChange }}>
      {children}
    </AuthContext.Provider>
  );
};
