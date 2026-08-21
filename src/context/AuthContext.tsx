import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { UserResponse } from "../api/types";
import {
  clearSession,
  getStoredUser,
  getToken,
  saveSession,
  updateStoredUser,
} from "../api/adminClient";
import { fetchMyProfile, loginRequest } from "../api/adminApi";
import { AuthContext } from "./auth-context";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserResponse | null>(() =>
    getStoredUser<UserResponse>(),
  );
  const [token, setTokenState] = useState<string | null>(() => getToken());
  const [initializing, setInitializing] = useState(true);
  const tokenRef = useRef<string | null>(token);

  const setToken = useCallback((value: string | null) => {
    tokenRef.current = value;
    setTokenState(value);
  }, []);

  const setUser = useCallback((value: UserResponse | null) => {
    setUserState(value);
    if (value && tokenRef.current) {
      updateStoredUser(value);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      const storedToken = getToken();
      if (!storedToken) {
        setInitializing(false);
        return;
      }

      try {
        const profile = await fetchMyProfile(storedToken);
        if (cancelled) return;
        setUser(profile);
        setToken(storedToken);
        saveSession(storedToken, profile);
      } catch {
        if (cancelled) return;
        clearSession();
        setUser(null);
        setToken(null);
      } finally {
        if (!cancelled) setInitializing(false);
      }
    }

    void restoreSession();
    return () => {
      cancelled = true;
    };
  }, [setToken, setUser]);

  useEffect(() => {
    const handleUnauthorized = () => {
      clearSession();
      setToken(null);
      setUser(null);
    };
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () =>
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, [setToken, setUser]);

  const login = useCallback(
    async (username: string, password: string) => {
      const result = await loginRequest({ username, password });
      saveSession(result.access_token, result.user);
      setToken(result.access_token);
      setUser(result.user);
    },
    [setToken, setUser],
  );

  const logout = useCallback(() => {
    clearSession();
    setToken(null);
    setUser(null);
  }, [setToken, setUser]);

  const value = useMemo(
    () => ({ user, token, initializing, login, logout, setUser }),
    [user, token, initializing, login, logout, setUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}