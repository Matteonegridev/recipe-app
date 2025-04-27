import { useMutation, useQuery } from "@tanstack/react-query";
import { ReactNode, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { AuthQueryContext } from "../hooks/useAuthQuery";
import { useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";

type PropsContext = {
  children: ReactNode;
};

// What we give for login and register:
type User = {
  username: string;
  password: string;
};

// What we get. Never give password.
type Credentials = {
  id: string;
  username: string;
  savedRecipes: { _id: string; slug: string }[];
};

export type ContextAuthType = {
  data: Credentials | null | undefined;
  isLoading: boolean;
  login: (user: User) => Promise<Credentials>;
  register: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  displayError: {
    username?: string;
    password?: string;
  };
  setDisplayError: React.Dispatch<
    SetStateAction<{
      username?: string;
      password?: string;
    }>
  >;
  resetErrors: (delay: number) => void;
  isLogged: boolean;
};

// const URL = "http://localhost:3000";

// Check activity, give back the data. Stale time 5 minutes.
const fetchUser = async (): Promise<Credentials | null> => {
  try {
    const response = await api.get(`/user/profile`);
    console.log("fetchUser:", response.data);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      // user is not logged in
      return null;
    }
    return null;
  }
};

function AuthContextWithQuery({ children }: PropsContext) {
  const [displayError, setDisplayError] = useState<{
    username?: string;
    password?: string;
  }>({});

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<Credentials | null>({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5,
  });

  const resetErrors = (delay: number) => {
    setTimeout(() => {
      setDisplayError({});
    }, delay);
  };

  useEffect(() => {
    console.log("🧠 Auth state changed:", { data, isLoading });
  }, [data, isLoading]);

  // Login:
  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: User): Promise<Credentials> => {
      const response = await api.post(`/user/login`, { username, password });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
        refetchType: "active",
      });
      navigate("/");
    },
    onError: (err) => {
      const error = err as AxiosError<{
        username?: string;
        password?: string;
      }>;

      if (error.response?.status === 400) {
        const errorMessage = error.response?.data;

        setDisplayError({
          username: errorMessage?.username,
          password: errorMessage?.password,
        });
        console.log("isError:", displayError);
      }
      resetErrors(4000);
    },
  });

  // Register:
  const registerMutation = useMutation({
    mutationFn: async ({ username, password }: User): Promise<void> => {
      return await api.post(`/user/register`, { username, password });
    },
  });

  // Logout:
  const logoutMutation = useMutation({
    mutationFn: async (): Promise<void> => {
      await api.post(`/user/logout`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
        refetchType: "active",
      });
      navigate("/");
    },
  });

  return (
    <AuthQueryContext.Provider
      value={{
        data,
        isLoading,
        login: loginMutation.mutateAsync,
        register: registerMutation.mutateAsync,
        logout: logoutMutation.mutateAsync,
        setDisplayError,
        displayError,
        resetErrors,
        isLogged: !!data,
      }}
    >
      {children}
    </AuthQueryContext.Provider>
  );
}

export default AuthContextWithQuery;
