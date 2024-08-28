import React from 'react';
import './LoginInfo.css';
import LoginButton from "./LoginButton";

const LoginInfo = () => {
    return (
        <div className="info">
            <div className="text">Please log in to be able to make reservations -></div>
            <LoginButton />
        </div>
    );
};

export default LoginInfo;
