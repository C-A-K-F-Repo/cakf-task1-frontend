import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import { authApi } from "../api/authApi";
import {
  clearStoredRefreshToken,
  clearStoredUser,
  getStoredRefreshToken,
  getStoredUser,
  storeUser,
  storeRefreshToken
} from "./tokenStorage";

export const AuthContext = createContext(null);

function decodeJwtPayload(token) {
  try {
    const [, payload] = token.split(".");
    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = window.atob(normalizedPayload.padEnd(Math.ceil(normalizedPayload.length / 4) * 4, "="));

    return JSON.parse(decodedPayload);
  } catch {
    return null;
  }
}

function getUserFromAccessToken(accessToken) {
  const payload = decodeJwtPayload(accessToken);

  if (!payload) {
    return null;
  }

  return {
    id: payload.sub,
    email: payload.email ?? "",
    role: payload.role
  };
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = useCallback(() => {
    setAccessToken(null);
    setUser(null);
    clearStoredRefreshToken();
    clearStoredUser();
  }, []);

  const applySession = useCallback(async (tokenResponse) => {
    storeRefreshToken(tokenResponse.refresh_token);
    setAccessToken(tokenResponse.access_token);

    let currentUser;
    try {
      currentUser = await authApi.getMe(tokenResponse.access_token);
    } catch (error) {
      currentUser = getUserFromAccessToken(tokenResponse.access_token);

      if (!currentUser?.email) {
        currentUser = getStoredUser();
      }

      if (!currentUser) {
        throw error;
      }
    }

    setUser(currentUser);
    storeUser(currentUser);

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

  const loginWithGoogle = useCallback(
    async (idToken) => {
      const tokenResponse = await authApi.loginWithGoogle(idToken);
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
      loginWithGoogle,
      logout,
      refreshSession
    }),
    [accessToken, isLoading, login, loginWithGoogle, logout, refreshSession, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
