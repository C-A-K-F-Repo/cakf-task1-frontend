const REFRESH_TOKEN_KEY = "cakf.refreshToken";
const USER_KEY = "cakf.user";

export function getStoredRefreshToken() {
  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function storeRefreshToken(refreshToken) {
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearStoredRefreshToken() {
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function getStoredUser() {
  try {
    const user = window.localStorage.getItem(USER_KEY);

    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

export function storeUser(user) {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  window.localStorage.removeItem(USER_KEY);
}
