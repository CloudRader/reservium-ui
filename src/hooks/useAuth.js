import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { API_BASE_URL } from "../constants";
import { tokenManager } from "../utils/tokenManager";

axios.defaults.withCredentials = true;

const getUserInfo = async () => {
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
        tokenManager.clearToken();
        queryClient.removeQueries('user');
        navigate('/');
    }, [navigate, queryClient]);

    return {
        login,
        logout,
        userInfo,
        isLoggedIn: !!userInfo,
        isLoading,
        isError,
        isFetching,
        authState: status, // 'loading' | 'error' | 'success'
        username: userInfo?.username ?? null,
        userId: userInfo?.id ?? null,
        managerRoles: userInfo?.roles ?? [],
    };
};
