import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from "./Config";

axios.defaults.withCredentials = true;

// Custom hook for authentication
const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);
    const [userRoles, setUserRoles] = useState({ active_member: false, section_head: false });
    const navigate = useNavigate();

    const login = useCallback(async (code, state) => {
        try {
            const username = await sendCodeToServer(code, state);
            const userInfo = await getUserInfo();
            setIsLoggedIn(true);
            setUsername(username);
            setUserRoles({
                active_member: userInfo.active_member,
                section_head: userInfo.section_head
            });
            localStorage.setItem('userName', username);
            navigate('/');
        } catch (error) {
            console.error('Error during login:', error);
            // Handle login error (e.g., show error message to user)
        }
    }, [navigate]);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUsername(null);
        setUserRoles({ active_member: false, section_head: false });
        localStorage.removeItem('userName');
    }, []);

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setIsLoggedIn(true);
            setUsername(storedUserName);
        }
    }, []);

    return { isLoggedIn, username, userRoles, login, logout };
};

// Utility functions for API calls
const sendCodeToServer = async (code, state) => {
    const response = await axios.get(`${config.domenServer}/users/callback`, {
        params: { code, state }
    });
    return response.data.username;
};

const getUserInfo = async () => {
    const response = await axios.get(`${config.domenServer}/users/me`);
    return response.data;
};

// Login component
const Login = () => {
    const location = useLocation();
    const { login } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        const state = params.get('state');
        if (code) {
            login(code, state);
        }
    }, [location, login]);

    return null;
};

export { useAuth, Login };