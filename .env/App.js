import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import StudyRoom from './StudyRoom';
import ClubRoom from './ClubRoom';
import Grill from './Grill';
import LoginInfo from './LoginInfo';

function RedirectToExternal({ url }) {
    useEffect(() => {
        window.location.href = url;
    }, [url]);

    return null; // Since we are redirecting, there's no need to render anything
}


function App() {
    // set a default value for the isLoggedIn state
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = useCallback((userName) => {
        setIsLoggedIn(true);
        // store the user's name in the local storage or a global state
        localStorage.setItem('userName', userName);
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        // remove the user's name from the local storage or a global state
        localStorage.removeItem('userName');
    };

    // use the useEffect hook to check the user's login status when the app loads
    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setIsLoggedIn(true);
        }
    }, []);


    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <Routes>
                <Route path='/study-room' element={<StudyRoom isLoggedIn={isLoggedIn} />} />
                <Route path='/club-room' element={<ClubRoom isLoggedIn={isLoggedIn} />} />
                <Route path='/grill' element={<Grill isLoggedIn={isLoggedIn} />} />
                <Route
                    path='/login'
                    element={<RedirectToExternal url="https://10.0.52.106:8000/auth_is/login" />}
                />
                <Route path='/' element={<ClubRoom isLoggedIn={isLoggedIn} />} />
            </Routes>
        </Router>
    );
}

export default App;
