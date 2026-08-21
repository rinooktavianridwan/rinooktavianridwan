import { createContext, useContext } from "react";
import type { UserResponse } from "../api/types";

export interface AuthContextValue {
  user: UserResponse | null;
  token: string | null;
  initializing: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: UserResponse | null) => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}