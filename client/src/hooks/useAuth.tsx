import { useContext, createContext } from "react";
import { AuthContextType } from "../context/AuthContext";

export const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook with safety check
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null || undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
