import { createContext, useContext } from "react";
import { ContextAuthType } from "../context/ReactQueryContext";

export const AuthQueryContext = createContext<ContextAuthType | null>(null);

export const useAuthQuery = () => {
  const context = useContext(AuthQueryContext);
  if (context === null || undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
