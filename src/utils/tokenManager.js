// SessionStorage token storage - persists during browser session
const TOKEN_KEY = 'auth_token';

export const tokenManager = {
  setToken(token) {
    if (token) {
      sessionStorage.setItem(TOKEN_KEY, token);
    } else {
      sessionStorage.removeItem(TOKEN_KEY);
    }
  },

  getToken() {
    const token = sessionStorage.getItem(TOKEN_KEY);
    return token;
  },

  clearToken() {
    sessionStorage.removeItem(TOKEN_KEY);
  },

  hasToken() {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const hasToken = token !== null;
    return hasToken;
  }
};