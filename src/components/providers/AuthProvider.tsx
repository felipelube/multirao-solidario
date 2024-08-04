import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { AUTH_TOKEN_NAME } from "../../config/auth";

interface AuthContextType {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

type UserInfo = {
  id: number;
  email: string;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const isLoggedIn = !!authToken;

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_NAME);
    if (token) {
      setAuthToken(token);
    }
  }, [setAuthToken, setUserInfo]);

  useEffect(() => {
    try {
      return setUserInfo(
        JSON.parse(atob((authToken ?? "").split(".")[1])) as UserInfo
      );
    } catch {
      setUserInfo(null);
    }
  }, [authToken]);

  const login = (token: string) => {
    localStorage.setItem(AUTH_TOKEN_NAME, token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_NAME);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
