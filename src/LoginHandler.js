import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from "./Config";
axios.defaults.withCredentials = true;

const LoginHandler = () => {
    const navigate = useNavigate();
    const loginUrl = `${config.serverURL}/users/login`;

    useEffect(() => {
        const fetchLoginUrl = async () => {
            try {
                const response = await axios.get(loginUrl);
                if (response.data) {
                    window.location.href = response.data;
                }
            } catch (error) {
                alert('Error fetching login URL:' + error);
                console.error('Error fetching login URL:', error);
                // navigate('/');
            }
        };
        fetchLoginUrl();
    }, [loginUrl, navigate]);

};

export default LoginHandler;