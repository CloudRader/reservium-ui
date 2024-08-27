import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import './LoginInfo.css';

const LoginInfo = ({ onLogin }) => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        // redirect the user to the Identity Server login page
        navigate('https://10.0.52.106:8000/auth_is/login');
    };

    return (
        <div className="info">
            <div>Please log in to be able to make reservations -></div>
            <NavLink
                to="/login"
                className="glow-on-hover"
                handleClick={handleLoginClick}
            >
                Log in
            </NavLink>
        </div>
    );
};

export default LoginInfo;
