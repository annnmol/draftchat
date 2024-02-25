
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

export const AUTH_USER_KEY = "auth-user";
export const AUTH_TOKEN_KEY = "auth-token";
const DEFAULT_LOGIN_REDIRECT = "/chat";

const getItem = localStorage.getItem(AUTH_USER_KEY) ?? "{}";
const parsedItem = JSON.parse(getItem) ?? undefined;

interface IAuthUserContext {
  authUser: any | undefined;
  handleAuthChange: (data: any) => void;
}

export const AuthContext = createContext({
  authUser: undefined,
  handleAuthChange: (data: any) => undefined,
} as IAuthUserContext);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate(); 

  const [authUser, setAuthUser] = useState(parsedItem);
  
  const handleAuthChange = async (data: any) => {
    if (data?._id) {
      data = JSON.stringify(data);
      localStorage.setItem(AUTH_USER_KEY, data ?? null);
      setAuthUser(data ?? null);
      navigate(DEFAULT_LOGIN_REDIRECT);
    } else {
      //logout
      localStorage.removeItem(AUTH_USER_KEY);
      setAuthUser(null);
      navigate('/auth/login');
    }
  };

  useEffect(() => {
    if (!parsedItem?._id) {
     navigate('/auth/login');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, handleAuthChange }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const state = useContext(AuthContext);
  return state ?? undefined;
};