import axios from 'axios';
import keycloak from '../Components/auth/Keycloak';

// Request interceptor: Add Authorization header with token refresh
axios.interceptors.request.use(
  async (config) => {
    if (!config.headers) {
      config.headers = {};
    }

    // Only add token if user is authenticated
    if (keycloak.authenticated) {
      try {
        // Refresh token if it expires in less than 30 seconds
        await keycloak.updateToken(30);
        config.headers['Authorization'] = `Bearer ${keycloak.token}`;
      } catch (error) {
        console.error('Failed to refresh token:', error);
        keycloak.clearToken();
      }
    }

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor: Handle 401
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Authentication error, redirecting to logout');
      keycloak.logout({ redirectUri: window.location.origin });
    }
    return Promise.reject(error);
  }
);
