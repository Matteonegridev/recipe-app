import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { ReactNode, SetStateAction, useState } from "react";
import { useNavigate } from "react-router";
import axios, { AxiosError } from "axios";
import { AuthQueryContext } from "../hooks/useAuthQuery";

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
};

export type ContextAuthType = {
  data: Credentials | undefined;

  isLoading: boolean;
  login: (user: User) => Promise<void>;
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

const URL = "http://localhost:3000";

// Check activity, give back the data. Stale time 5 minutes.
const fetchUser = async () => {
  const response = await axios.get(`${URL}/user/profile`, {
    withCredentials: true,
  });
  return response.data;
};

const queryClient = new QueryClient();

function AuthContextWithQuery({ children }: PropsContext) {
  const [displayError, setDisplayError] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5,
  });

  const resetErrors = (delay: number) => {
    setTimeout(() => {
      setDisplayError({});
    }, delay);
  };

  // Login:
  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: User): Promise<void> => {
      const response = await axios.post(
        `${URL}/user/login`,
        { username, password },
        { withCredentials: true },
      );
      return response.data;
    },
    onSuccess: (response) => {
      queryClient.setQueryData(["user"], response);
      setIsLogged(true);
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
      return await axios.post(
        `${URL}/user/register`,
        { username, password },
        { withCredentials: true },
      );
    },
  });

  // Logout:
  const logoutMutation = useMutation({
    mutationFn: async (): Promise<void> => {
      await axios.post(`${URL}/user/logout`, {}, { withCredentials: true });
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      setIsLogged(false);
      navigate("/auth");
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
        isLogged,
      }}
    >
      {children}
    </AuthQueryContext.Provider>
  );
}

export default AuthContextWithQuery;
