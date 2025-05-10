import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import constants from "../Constants";

axios.defaults.withCredentials = true;
const sendCodeToServer = async (code, state) => {
    const response = await axios.get(`${constants.serverURL}/users/callback`, {
        params: { code, state }
    });
    return response.data.username;
};

const getUserInfo = async () => {
    const response = await axios.get(`${constants.serverURL}/users/me`);
    return response.data;
};


export const useAuth = () => {
    const [authState, setAuthState] = useState('initializing'); // 'initializing', 'checking', 'authenticated', 'unauthenticated'
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);
    const [managerRoles, setManagerRoles] = useState([]);
    const navigate = useNavigate();

    const login = useCallback(async (code, state) => {
        try {
            setAuthState('checking');
            const username = await sendCodeToServer(code, state);
            const userInfo = await getUserInfo();
            setIsLoggedIn(true);
            setUsername(username);
            setManagerRoles(userInfo.roles || []);
            setUserId(userInfo.id)
            localStorage.setItem('userName', username);
            setAuthState('authenticated');
            navigate('/club'); // redirect here
        } catch (error) {
            console.error('Error during login:', error);
            setAuthState('unauthenticated');
            navigate('/');
        }
    }, [navigate]);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUsername(null);
        setUserId(null)
        setManagerRoles([]);
        setAuthState('unauthenticated');
        
        localStorage.removeItem('userName');
        // navigate('/');
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            setAuthState('checking');
            const storedUserName = localStorage.getItem('userName');
            if (storedUserName) {
                try {
                    const userInfo = await getUserInfo();
                    setIsLoggedIn(true);
                    setUsername(storedUserName);
                    setManagerRoles(userInfo.roles || []);
                    setUserId(userInfo.id)
                    setAuthState('authenticated');
                } catch (error) {
                    setAuthState('unauthorized');
                    console.error('Error verifying authentication:', error);
                    logout();
                }
            } else {
                setAuthState('unauthenticated');
            }
        };
        checkAuth();
    }, [logout]);

    return { login, isLoggedIn, username, managerRoles, logout, authState, userId };
};