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
        const code = params.get('code');

        if (code) {
            handleAuthenticationResponse(code);
        }
    }, [location, onLogin, navigate]);

    const handleAuthenticationResponse = async (code) => {
        try {
            await sendCodeToServer(code);

            const userInfo = await getUserInfo();

            onLogin(userInfo.username);

            navigate('/');
        } catch (error) {
            console.error('Error handling authentication response:', error);
        }
    };

    const sendCodeToServer = async (code) => {
        try {
            await axios.get(`${config.backendUrl}/users/callback/auth?code=${code}`);
        } catch (error) {
            console.error('Error sending code to server:', error);
            throw error;
        }
    };

    const getUserInfo = async () => {
        try {
            const response = await axios.get(`${config.backendUrl}/user-info`);
            return response.data;
        } catch (error) {
            console.error('Error getting user info:', error);
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