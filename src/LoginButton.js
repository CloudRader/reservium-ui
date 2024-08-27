import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import './LoginButton.css';

const LoginInfo = () => {
    const domenName = 'https://rezervace.buk.cvut.cz:8000'; // TODO config

    const navigate = useNavigate();

    const handleLoginClick = () => {
        // redirect the user to the Identity Server login page
        navigate(domenName + '/auth_is/login');
    };

    return (
            <NavLink
                to="/login"
                className="glow-on-hover"
                handleClick={handleLoginClick}
            >
                Log in
            </NavLink>
    );
};

export default LoginInfo;
