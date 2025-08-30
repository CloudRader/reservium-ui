// In-memory token storage - secure and cleared on page refresh
let authToken = null;

export const tokenManager = {
  setToken(token) {
    authToken = token;
  },

  getToken() {
    return authToken;
  },

  clearToken() {
    authToken = null;
  },

  hasToken() {
    return authToken !== null;
  }
};