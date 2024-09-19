import {  useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from "axios";
import config from "./Config";
import {useAuth} from "./LoginToBackend";
axios.defaults.withCredentials = true;

function Logout() {
    const {logout} = useAuth();
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

        logout();
    }, [logout, navigate]);

    return null;
}

export default Logout;
