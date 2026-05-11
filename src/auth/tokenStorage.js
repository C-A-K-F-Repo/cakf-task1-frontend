const REFRESH_TOKEN_KEY = "cakf.refreshToken";

export function getStoredRefreshToken() {
  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function storeRefreshToken(refreshToken) {
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearStoredRefreshToken() {
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
}
