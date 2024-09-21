import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from "../Config";
axios.defaults.withCredentials = true;


export const useAuth = (setClientStatus) => {
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
            navigate('/club'); // redirect here
        } catch (error) {
            console.error('Error during login:', error);
            navigate('/');
        }
    }, [navigate]);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUsername(null);
        setUserRoles({ active_member: false, section_head: false });
        localStorage.removeItem('userName');
        navigate('/');
    }, [navigate]);

    useEffect(() => {
        const checkAuth = async () => {
            const storedUserName = localStorage.getItem('userName');
            if (storedUserName) {
                try {
                    const userInfo = await getUserInfo();
                    setIsLoggedIn(true);
                    setUsername(storedUserName);
                    setUserRoles({
                        active_member: userInfo.active_member,
                        section_head: userInfo.section_head
                    });
                    setClientStatus("authorized");
                } catch (error) {
                    setClientStatus("unauthorized");
                    console.error('Error verifying authentication:', error);
                    logout();
                }
            }
        };
        checkAuth();
    }, [logout]);

    return { isLoggedIn, username, userRoles, login, logout };
};

const sendCodeToServer = async (code, state) => {
    const response = await axios.get(`${config.serverURL}/users/callback`, {
        params: { code, state }
    });
    return response.data.username;
};

const getUserInfo = async () => {
    const response = await axios.get(`${config.serverURL}/users/me`);
    return response.data;
};
