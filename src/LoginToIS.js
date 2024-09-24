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

    useEffect(() => {
        const fetchLoginUrl = async () => {
            try {
                const response = await axios.get(`${config.serverURL}/users/login`);
                window.location.href = response?.data;
            } catch (error) {
                // alert('Error fetching login URL:' + error);
                console.error('Error fetching login URL:', error);
                // navigate('/');
            }
        };
        fetchLoginUrl();
    }, [navigate]);

};

export default LoginToIS;