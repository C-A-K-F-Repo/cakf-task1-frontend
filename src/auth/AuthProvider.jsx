import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import { authApi } from "../api/authApi";
import {
  clearStoredRefreshToken,
  getStoredRefreshToken,
  storeRefreshToken
} from "./tokenStorage";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = useCallback(() => {
    setAccessToken(null);
    setUser(null);
    clearStoredRefreshToken();
  }, []);

  const applySession = useCallback(async (tokenResponse) => {
    storeRefreshToken(tokenResponse.refresh_token);
    setAccessToken(tokenResponse.access_token);

    const currentUser = await authApi.getMe(tokenResponse.access_token);
    setUser(currentUser);

    return currentUser;
  }, []);

  const refreshSession = useCallback(async () => {
    const refreshToken = getStoredRefreshToken();
    if (!refreshToken) {
      clearSession();
      return null;
    }

    try {
      const tokenResponse = await authApi.refresh(refreshToken);
      return applySession(tokenResponse);
    } catch (error) {
      clearSession();
      throw error;
    }
  }, [applySession, clearSession]);

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      const refreshToken = getStoredRefreshToken();

      if (!refreshToken) {
        if (isMounted) {
          setIsLoading(false);
        }
        return;
      }

      try {
        const tokenResponse = await authApi.refresh(refreshToken);
        if (isMounted) {
          await applySession(tokenResponse);
        }
      } catch {
        if (isMounted) {
          clearSession();
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, [applySession, clearSession]);

  const login = useCallback(
    async ({ email, password }) => {
      const tokenResponse = await authApi.login(email, password);
      return applySession(tokenResponse);
    },
    [applySession]
  );

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const value = useMemo(
    () => ({
      accessToken,
      user,
      isAuthenticated: Boolean(accessToken && user),
      isLoading,
      login,
      logout,
      refreshSession
    }),
    [accessToken, isLoading, login, logout, refreshSession, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
