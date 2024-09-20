import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import config from "./Config";
import { useAuth } from "./hooks/useAuth";

axios.defaults.withCredentials = true;

function Logout() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(async () => {
        const performLogout = async () => {
            try {
                // Call the server logout endpoint
                await axios.get(`${config.serverURL}/users/logout`);

                // Call the client-side logout function
                await logout();

                navigate('/login_info');
            } catch (error) {
                console.error('Error during logout:', error);
                setError('An error occurred during logout. Please try again.');
            }
        };

        await performLogout();
    }, [logout, navigate]);

    if (error) {
        return <div>{error} in LOG out</div>;
    }

    return <div>Logging out...</div>;
}

export default Logout;