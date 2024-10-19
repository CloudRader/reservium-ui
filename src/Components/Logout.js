import {  useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from "axios";
import constants from "../Constants";
import LoginInfoPage from "../pages/LoginInfoPage";
axios.defaults.withCredentials = true;

function Logout({ onLogout }) {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoginUrl = async () => {
            try {
                await axios.get(`${constants.serverURL}/users/logout`);
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

