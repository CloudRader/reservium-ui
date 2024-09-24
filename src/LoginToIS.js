import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from "./Config";
axios.defaults.withCredentials = true;

/**
 * Gets the login URL from the server and redirects the user to it.
 */
const LoginToIS = () => {
    const navigate = useNavigate();

    useEffect(async () => {
        const fetchLoginUrl = async () => {
            try {
                const response = await axios.get(`${config.serverURL}/users/login`);
                const loginUrl = response.data;

                const loginWindow = window.open(loginUrl, '_blank', 'noopener,noreferrer');

                if (loginWindow) {
                    // // Poll to check if the login window is closed
                    // const checkWindowClosed = setInterval(() => {
                    //     if (loginWindow.closed) {
                    //         clearInterval(checkWindowClosed);
                    //         navigate('/logined');
                    //     }
                    // }, 1000);
                } else {
                    // If window.open fails, fall back to redirection
                    window.location.href = loginUrl;
                }
            } catch (error) {
                // alert('Error fetching login URL:' + error);
                console.error('Error fetching login URL:', error);
                // navigate('/');
            }
        };
        await fetchLoginUrl();
    }, [navigate]);

};

export default LoginToIS;