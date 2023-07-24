import { useEffect, createContext, useContext, useState, FC, ReactNode } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../services/auth";
import Cookies from 'js-cookie';
import { User } from "../utils/Interfaces";


interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  error: string;
  message: string;
  loading: boolean;
  loadingRq:boolean;
  signup: (user: User) => Promise<void>;
  signin: (user: User) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setErrors] = useState<string>('');
  const [message, setmessage] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingRq, setLoadingRq] = useState<boolean>(false);

  useEffect(() => {
    if (error !== '') {
      const timer = setTimeout(() => {
        setErrors('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const signup = async (user: User): Promise<void> => {
    setLoadingRq(true);
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
        setmessage('Usuario Creado exitosamente');
      }
    } catch (error: any) {
      const validateError = error?.response ? error.response.data.message : error.message;
      setErrors(validateError);
    }
    setLoadingRq(false);
  };

  const signin = async (user: any): Promise<void> => {
    setLoadingRq(true);
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error:any) {
      const validateError = error?.response ? error.response.data.message : error.message;
      setErrors(validateError);
    }
    setLoadingRq(false);
  };

  const logout = (): void => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async (): Promise<void> => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const res:any = await verifyTokenRequest(cookies.token);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        message,
        signup,
        signin,
        logout,
        isAuthenticated,
        error,
        loading,
        loadingRq,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
