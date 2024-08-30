import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from "./Config";

axios.defaults.withCredentials = true;

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
            navigate('/login');
        }
    }, [navigate]);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUsername(null);
        setUserRoles({ active_member: false, section_head: false });
        localStorage.removeItem('userName');
        navigate('/login');
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
                } catch (error) {
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

const Login = () => {
    const location = useLocation();
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        const state = params.get('state');
        if (code) {
            login(code, state);
        } else {
            // Redirect to the external login page
            window.location.href = `${config.serverURL}/users/login`;
        }
    }, [location, login, navigate]);

    return null;
};

export { useAuth, Login };