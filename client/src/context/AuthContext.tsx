// Senza React Query:

import { useState, ReactNode, useEffect } from "react";
import { AuthContext } from "../hooks/useAuth";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import api from "../lib/axios";

type User = {
  username: string;
};

export type AuthContextType = {
  authUser: User | null;
  isLogged: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  register: (username: string, password: string) => void;
  isError: {
    username?: string;
    password?: string;
  };
};

type ProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: ProviderProps) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isError, setIsError] = useState<{
    username?: string;
    password?: string;
  }>({});
  const navigate = useNavigate();

  const resetErrors = (delay: number) => {
    setTimeout(() => {
      setIsError({});
    }, delay);
  };

  const login = async (username: string, password: string) => {
    const emptyFields = username.trim() === "" || password.trim() === "";

    if (emptyFields) {
      setIsError({
        username: username.trim() === "" ? "Username is required" : undefined,
        password: password.trim() === "" ? "Password is required" : undefined,
      });
      resetErrors(4000);
      return;
    }
    try {
      const response = await api.post(`/user/login`, { username, password });

      if (response.status === 200) {
        setAuthUser({ username: response.data.username });
        setIsLogged(true);
        navigate("/");
      }
    } catch (err) {
      const error = err as AxiosError<{
        username?: string;
        password?: string;
      }>;

      if (error.response?.status === 400) {
        const errorMessage = error.response?.data;

        setIsError({
          username: errorMessage?.username,
          password: errorMessage?.password,
        });
        console.log("isError:", isError);
      }
    }
    resetErrors(5000);
  };

  const logout = async () => {
    try {
      await api.post(`/user/logout`, {});
      setAuthUser(null);
      setIsLogged(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const register = async (username: string, password: string) => {
    try {
      const response = await api.post(`/user/register`, {
        username,
        password,
      });
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.log("Registration failed:", error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get(`/user/profile`);
        login(res.data.username, res.data.password);
      } catch (err) {
        setAuthUser(null);
        setIsLogged(false);
        console.error(err);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authUser, isLogged, login, logout, register, isError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
