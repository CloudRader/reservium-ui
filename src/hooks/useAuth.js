import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { API_BASE_URL } from '../constants';
import keycloak from '../Components/auth/Keycloak';

axios.defaults.withCredentials = true;

const getUserInfo = async () => {
  // Double-check authentication at execution time (defense in depth)
  // Even though enabled: keycloak.authenticated should prevent this,
  // there can be race conditions during keycloak initialization
  if (!keycloak.authenticated) {
    // Return null instead of throwing - this prevents errors
    // The enabled flag should prevent this from being called, but if it does,
    // we handle it gracefully
    return null;
  }

  const response = await axios.get(`${API_BASE_URL}/users/me`);
  return response.data;
};

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: userInfo,
    isLoading,
    isError,
    isFetching,
    status,
  } = useQuery('user', getUserInfo, {
    retry: false,
    enabled: keycloak.authenticated, // Only run query if authenticated
    // If query somehow runs when not authenticated, treat null as no data
    select: (data) => data || null,
  });

  // When not authenticated, status is 'idle', not 'loading'
  // We need to determine authState based on keycloak state and query status
  const authState = keycloak.authenticated
    ? (isLoading ? 'loading' : status)
    : 'idle';

  const login = useCallback(async () => {
    try {
      await queryClient.invalidateQueries('user');
      navigate('/club');
    } catch (error) {
      console.error('Login error:', error);
      navigate('/');
    }
  }, [navigate, queryClient]);

  const logout = useCallback(() => {
    queryClient.removeQueries('user');
    // navigate('/logout');
  }, [navigate, queryClient]);

  return {
    login,
    logout,
    userInfo,
    isLoggedIn: keycloak.authenticated && !!userInfo,
    isLoading,
    isError,
    isFetching,
    authState, // 'loading' | 'error' | 'success' | 'idle'
    username: userInfo?.username ?? null,
    userId: userInfo?.id ?? null,
    managerRoles: userInfo?.roles ?? [],
  };
};
