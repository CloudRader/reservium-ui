import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginHandler = ({ loginUrl }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoginUrl = async () => {
            try {
                const response = await axios.get(loginUrl);
                if (response.data) {
                    // Check if the response is a string (URL)
                    if (typeof response.data === 'string' && response.data.startsWith('http')) {
                        window.location.href = response.data;
                    } else if (response.data.redirectUrl) {
                        // Fallback for object response with redirectUrl
                        window.location.href = response.data.redirectUrl;
                    } else {
                        console.error('Invalid response from server');
                        navigate('/');
                    }
                } else {
                    console.error('Empty response from server');
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