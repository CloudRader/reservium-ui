import {  useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';

function Logout({ onLogout }) {
    const navigate = useNavigate();

    useEffect(() => {
        onLogout();
        navigate('/'); // Redirect to home page or any other route after logout
    }, [onLogout, navigate]);

    return null;
}

export default Logout;
