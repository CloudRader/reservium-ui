import React, { useState, useEffect, useCallback } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import ReservationComponent from "./ReservationComponent";
import config from "./Config";
import CreateNewCalendar from "./CreateNewCalendar";
import CreateNewMiniService from "./CreateNewMiniService";

function RedirectToExternal({ url }) {
    useEffect(() => {
        window.location.href = url;
    }, [url]);
    return null;
}

function Login({ onLogin }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const username = params.get('username');
        console.log(params);
        const authToken = params.get('auth_token');

        if (username && authToken) {
            handleAuthenticationResponse(username, authToken);
        }
    }, [location, onLogin, navigate]);

    const handleAuthenticationResponse = async (username, authToken) => {
        try {
            await sendAuthDataToServer( authToken);

            onLogin(username);

            navigate('/');
        } catch (error) {
            console.error('Error handling authentication response:', error);
        }
    };

    const sendAuthDataToServer = async (authToken) => {
        try {
            await axios.post(`${config.domenServer}/users/callback`, {
                authToken
            });
        } catch (error) {
            console.error('Error sending auth data to server:', error);
            throw error;
        }
    };

    return null;
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);

    const handleLogin = useCallback((userName) => {
        setIsLoggedIn(true);
        setUsername(userName);
        localStorage.setItem('userName', userName);
    }, []);

    const handleLogout = useCallback(() => {
        setIsLoggedIn(false);
        setUsername(null);
        localStorage.removeItem('userName');
    }, []);

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setIsLoggedIn(true);
            setUsername(storedUserName);
        }
    }, []);

    const loginUrl = `${config.domenServer}/users/login`;

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />
            <Routes>
                <Route path='/club-room' element={<ReservationComponent isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} roomCalendarLink={config.clubRoomCalendarLink} selectedZone={"klub"} />} />
                <Route path='/study-room' element={<ReservationComponent isLoggedIn={isLoggedIn} username={username}  onLogout={handleLogout} roomCalendarLink={config.studyRoomCalendarLink} selectedZone={"stud"}/>} />
                <Route path='/grill' element={<ReservationComponent isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} roomCalendarLink={config.grillCalendarLink} selectedZone={"grill"}/>} />
                <Route path='/login' element={<RedirectToExternal url={loginUrl} />}/>
                <Route path='/logined' element={<Login onLogin={handleLogin} />} />
                <Route path='/' element={<ReservationComponent isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} roomCalendarLink={config.clubRoomCalendarLink} selectedZone={"klub"} />} />
                <Route path='/create-new-calendar' element={<CreateNewCalendar isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />} />
                <Route path='/create-new-miniservice' element={<CreateNewMiniService isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />} />
            </Routes>
        </div>
    );
}

export default App;