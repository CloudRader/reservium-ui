// In-memory token storage - secure and cleared on page refresh
let authToken = null;

export const tokenManager = {
  setToken(token) {
    console.log('🔑 TokenManager: Setting token:', token ? `${token.substring(0, 10)}...` : 'null');
    authToken = token;
  },

  getToken() {
    console.log('🔍 TokenManager: Getting token:', authToken ? `${authToken.substring(0, 10)}...` : 'null');
    return authToken;
  },

  clearToken() {
    console.log('🗑️ TokenManager: Clearing token');
    authToken = null;
  },

  hasToken() {
    const hasToken = authToken !== null;
    console.log('❓ TokenManager: Has token:', hasToken);
    return hasToken;
  }
};