import {  useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from "axios";
import config from "./Config";
axios.defaults.withCredentials = true;

function Logout({ onLogout }) {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoginUrl = async () => {
            try {
                const response = await axios.get(`${config.serverURL}/users/logout`);
                if (response.data) {
                   console.log(response.data)
                } else {
                    console.error('Empty response from server');
                }
            } catch (error) {
                console.error('Error fetching login URL:', error);
            }
        };
        fetchLoginUrl();

        onLogout();
    }, [onLogout, navigate]);

    return null;
}

export default Logout;
