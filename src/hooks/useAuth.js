import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import constants from "../constants/Constants";

axios.defaults.withCredentials = true;

const sendCodeToServer = async (code, state) => {
    await axios.get(`${constants.serverURL}/auth/callback`, {
        params: { code, state },
    });
};

const getUserInfo = async () => {
    // const response = await axios.get(`${constants.serverURL}/users/me`);
    const response = await axios.get(
        `${constants.serverURL}/users/me`,
        {
            headers: {
                Authorization: `Bearer some-token`,
            },
        }
    );
    return response.data;
};

export const useAuth = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        data: userInfo,
        isLoading,
        isError,
        refetch,
        isFetching,
        status,
    } = useQuery('user', getUserInfo, {
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
    });

    const isLoggedIn = !!userInfo;

    const login = useCallback(async (code, state) => {
        try {
            await sendCodeToServer(code, state);
            await queryClient.invalidateQueries('user');
            navigate('/club');
        } catch (error) {
            console.error('Login error:', error);
            navigate('/');
        }
    }, [navigate, queryClient]);

    const logout = useCallback(() => {
        queryClient.removeQueries('user');
        localStorage.removeItem('userName');
        navigate('/');
    }, [queryClient, navigate]);

    return {
        login,
        logout,
        userInfo,
        isLoggedIn,
        isLoading,
        isError,
        isFetching,
        authState: status, // 'loading' | 'error' | 'success'
        username: userInfo?.username ?? null,
        userId: userInfo?.id ?? null,
        managerRoles: userInfo?.roles ?? [],
    };
};
