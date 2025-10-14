import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { API_BASE_URL } from '../constants';
import keycloak from '../Components/auth/Keycloak';

axios.defaults.withCredentials = true;

const getUserInfo = async () => {
  // Only fetch user info if authenticated with Keycloak
  if (!keycloak.authenticated) {
    throw new Error('Not authenticated');
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
  });

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
    navigate('/logout');
  }, [navigate, queryClient]);

  return {
    login,
    logout,
    userInfo,
    isLoggedIn: keycloak.authenticated && !!userInfo,
    isLoading,
    isError,
    isFetching,
    authState: status, // 'loading' | 'error' | 'success'
    username: userInfo?.username ?? null,
    userId: userInfo?.id ?? null,
    managerRoles: userInfo?.roles ?? [],
  };
};
