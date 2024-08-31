import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;
const LoginHandler = ({ loginUrl }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoginUrl = async () => {
            try {
                const response = await axios.get(loginUrl);
                if (response.data && response.data.redirectUrl) {
                    window.location.href = response.data.redirectUrl;
                } else {
                    console.error('Invalid response from server');
                    navigate('/');
                }
            } catch (error) {
                console.error('Error fetching login URL:', error);
                navigate('/');
            }
        };

        fetchLoginUrl();
    }, [loginUrl, navigate]);

    return <div>Redirecting to login...</div>;
};

export default LoginHandler;