import {useState, useCallback, useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from "../Config";
import {useQuery, useQueryClient} from "react-query";

axios.defaults.withCredentials = true;
const sendCodeToServer = async (code, state) => {
    const response = await axios.get(`${config.serverURL}/users/callback`, { params: { code, state }});
    return response.data.username;
};

// const getUserInfo = async () => {
//     const response = await axios.get(`${config.serverURL}/users/me`);
//     return response.data;
// };

export const useAuth = () => {
    const navigate = useNavigate();
    // const queryClient = useQueryClient();

    // const { data: userInfo, isLoading, isError, error } = useQuery(
    //     'userAuth',
    //     async () => {
    //         if (!username) return null;
    //         const response = await axios.get(`${config.serverURL}/users/me`);
    //         return response.data;
    //     },
    //     {
    //         enabled: !!username,
    //         staleTime: 20 * 60 * 1000, // 20 minutes
    //         retry: false,
    //         onError: () => {
    //             setUsername(null);
    //             localStorage.removeItem('userName');
    //         }
    //     }
    // );

    const login = useCallback(async (code, state) => {
        try {
            const newUsername = await sendCodeToServer(code, state);
            localStorage.setItem('userName', newUsername);
            navigate('/');
        } catch (error) {
            console.error('Error during login:', error);
            navigate('/');
        }
    }, [navigate]);

    const logout = useCallback(async () => {
        try {
            await axios.get(`${config.serverURL}/users/logout`);
        } catch (error) {
            console.error('Error during server logout:', error);
        } finally {
            localStorage.removeItem('userName');
            // navigate('/');
        }
    }, []);


    const isLoggedIn = !!localStorage.getItem('userName');

    // const userRoles = userInfo ? {
    //     active_member: userInfo.active_member,
    //     section_head: userInfo.section_head
    // } : { active_member: false, section_head: false };


    return {isLoggedIn, login, logout };
};
