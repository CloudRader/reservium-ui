import React, { useState, useEffect, useCallback } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import ReservationComponent from "./ReservationComponent";
import config from "./Config";
import CreateNewCalendar from "./CreateNewCalendar";
import CreateNewMiniService from "./CreateNewMiniService";

axios.defaults.withCredentials = true;

function RedirectToExternal({ url }) {
    useEffect(() => {
        window.location.href = url;
    }, [url]);
    return null;
}

// get a callback
function Login({ onLogin }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        console.log("from is ", params);
        const code = params.get('code');
        const state = params.get('state');
        console.log('Cookies:', document.cookie);
        if (code) {
            handleAuthenticationResponse(code,state);
        }
    }, [location, onLogin, navigate]);

    const handleAuthenticationResponse = async (code, state) => {
        try {
            const username = await sendCodeToServer(code ,state);
            const response = await getUserInfo();
            const userInfo = { active_member: response.active_member , section_head: response.section_head};

            onLogin(username,userInfo);

            navigate('/');
        } catch (error) {
            console.error('Error handling authentication response:', error);
        }
    };

    const sendCodeToServer = async (code, state) => {
        try {
            const response = await axios.get(`${config.domenServer}/users/callback?code=${code}&state=${state}`);
            return response.data.username;
        } catch (error) {
            console.error('Error sending code to server:', error);
            throw error;
        }
    };

    const getUserInfo = async () => {
        try {
            axios.interceptors.request.use(
                config => {
                    const token = localStorage.getItem('authToken');
                    if (token) {
                        config.headers['Authorization'] = 'Bearer ' + token;
                    }
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            const response = await axios.get(`${config.domenServer}я бы мог`);
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
    const [userRoles, setUserRoles] =
        useState({ active_member: false, section_head: false } );

    const handleLogin = useCallback((userName, userRoles) => {
        setIsLoggedIn(true);
        setUsername(userName);
        setUserRoles(userRoles)
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
            <Header isLoggedIn={isLoggedIn} username={username} userRoles={userRoles} onLogout={handleLogout} />
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