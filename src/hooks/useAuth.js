import { useState, useCallback } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from "../Config";
import {useQuery, useQueryClient} from "react-query";
axios.defaults.withCredentials = true;

const sendCodeToServer = async (code, state) => {
    const response = await axios.get(`${config.serverURL}/users/callback`, { params: { code, state }});
    return response.data.username;
};

const getUserInfo = async () => {
    const response = await axios.get(`${config.serverURL}/users/me`);
    return response.data;
};

export const useAuth = () => {
    const [username, setUsername] = useState(localStorage.getItem('userName') || null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: userInfo, isLoading, isError, error } = useQuery(
        'userAuth',
        getUserInfo,
        {
            enabled: !!username,
            staleTime: 20 * 60 * 1000, // 20 minutes
            retry: false,
            onError: () => {
                setUsername(null);
                localStorage.removeItem('userName');
                navigate('/');
            }
        }
    );

    const login = useCallback(async (code, state) => {
        try {
            const newUsername = await sendCodeToServer(code, state);
            setUsername(newUsername);
            localStorage.setItem('userName', newUsername);
            await queryClient.invalidateQueries('userAuth');
            navigate('/club');
        } catch (error) {
            console.error('Error during login:', error);
            navigate('/');
        }
    }, [navigate, queryClient]);

    const logout = useCallback(async () => {
        try {
            // Clear local state and storage
            setUsername(null);
            localStorage.removeItem('userName');
            queryClient.removeQueries('userAuth');
            queryClient.clear(); // Clear all queries
        } catch (error) {
            console.error('Error during client-side logout:', error);
            throw error; // Propagate the error
        }
    }, [queryClient]);

    const isLoggedIn = !!username && !!userInfo;
    const userRoles = userInfo ? {
        active_member: userInfo.active_member,
        section_head: userInfo.section_head
    } : { active_member: false, section_head: false };

    return { isLoggedIn, username, userRoles, login, logout, isLoading, isError, error };
};
