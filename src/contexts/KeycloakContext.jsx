import React, { createContext, useEffect, useState, useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import keycloak from '../Components/auth/Keycloak';
import { API_BASE_URL } from '../constants';

axios.defaults.withCredentials = true;

const KeycloakContext = createContext(null);

const getUserInfo = async () => {
  // Double-check authentication at execution time (defense in depth)
  if (!keycloak.authenticated) {
    return null;
  }

  const response = await axios.get(`${API_BASE_URL}/users/me`);
  return response.data;
};

export const KeycloakProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState(null);
  const queryClient = useQueryClient();

  // Initialize Keycloak
  useEffect(() => {
    let isMounted = true;

    keycloak
      .init({
        onLoad: 'check-sso',
        pkceMethod: 'S256',
        checkLoginIframe: false,
      })
      .then((authenticated) => {
        if (isMounted) {
          console.log('Keycloak initialized, authenticated:', authenticated);
          setIsInitialized(true);
          setInitError(null);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error('Keycloak init failed:', error);
          setInitError(error);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch user info when authenticated
  const {
    data: userInfo,
    isLoading: isUserLoading,
    isError: isUserError,
    isFetching,
    status,
  } = useQuery('user', getUserInfo, {
    retry: false,
    enabled: isInitialized && keycloak.authenticated,
    select: (data) => data || null,
  });

  // Auth state calculation
  const isAuthenticated = isInitialized && keycloak.authenticated;
  const isLoggedIn = isAuthenticated && !!userInfo;
  const authState = isAuthenticated
    ? isUserLoading
      ? 'loading'
      : status
    : 'idle';

  // Login function
  const login = useCallback(async () => {
    try {
      await queryClient.invalidateQueries('user');
      // Navigation will be handled by the component using this function
    } catch (error) {
      console.error('Login error:', error);
    }
  }, [queryClient]);

  // Logout function
  const logout = useCallback(() => {
    queryClient.removeQueries('user');
  }, [queryClient]);

  const value = {
    keycloak,
    isInitialized,
    initError,
    // Auth state
    userInfo,
    isLoggedIn,
    username: userInfo?.username ?? null,
    userId: userInfo?.id ?? null,
    managerRoles: userInfo?.roles ?? [],
    isLoading: isUserLoading,
    isError: isUserError,
    isFetching,
    authState,
    // Auth functions
    login,
    logout,
  };

  return (
    <KeycloakContext.Provider value={value}>
      {children}
    </KeycloakContext.Provider>
  );
};

export default KeycloakContext;
