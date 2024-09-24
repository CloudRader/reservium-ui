import {  useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from "axios";
import config from "./Config";
import LoginInfoPage from "./LoginInfoPage";
axios.defaults.withCredentials = true;

function Logout({ onLogout }) {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoginUrl = async () => {
            try {
                await axios.get(`${config.serverURL}/users/logout`);
            } catch (error) {
                console.error('Error while log out', error);
            }
        };
        fetchLoginUrl();

        onLogout();
    }, [onLogout, navigate]);

    return <LoginInfoPage />;
}

export default Logout;

