import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './Header';
import ReservationComponent from "./ReservationComponent";
import config from "./Config";
import CreateNewCalendar from "./CreateNewCalendar";
import CreateNewMiniService from "./CreateNewMiniService";
import { Login, useAuth } from "./Login";
import Logout from "./Logout";
import axios from 'axios';
import Footer from "./Footer";

function App() {
    const { isLoggedIn, username, userRoles, logout } = useAuth();
    const [services, setServices] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if (isLoggedIn) {
                const data = await getReservationServiceData();
                setServices(data);
            }
        }
        fetchData();
    }, [isLoggedIn]);

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} username={username} userRoles={userRoles} onLogout={logout} services={services} />
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/logout' element={<Logout onLogout={logout} />} />
                <Route
                    path='/'
                    element={
                        isLoggedIn
                            ? <ReservationComponent isLoggedIn={isLoggedIn} onLogout={logout} roomCalendarLinks={config.clubCalendarLinks} service={services[0]} />
                            : <Navigate to="/login" />
                    }
                />
                {services.map(service => (
                    <Route
                        key={service.linkName}
                        path={`/${service.linkName}`}
                        element={
                            isLoggedIn
                                ? <ReservationComponent
                                    isLoggedIn={isLoggedIn}
                                    onLogout={logout}
                                    roomCalendarLinks={config[`${service.linkName}CalendarLinks`]}
                                    service={service}
                                />
                                : <Navigate to="/login" />
                        }
                    />
                ))}
                <Route
                    path='/create-new-calendar'
                    element={
                        isLoggedIn && userRoles.section_head
                            ? <CreateNewCalendar isLoggedIn={isLoggedIn} username={username} />
                            : <Navigate to="/" />
                    }
                />
                <Route
                    path='/create-new-miniservice'
                    element={
                        isLoggedIn && userRoles.section_head
                            ? <CreateNewMiniService isLoggedIn={isLoggedIn} username={username} />
                            : <Navigate to="/" />
                    }
                />
            </Routes>
            <Footer/>
        </div>
    );
}

async function getReservationServiceData() {
    try {
        const response = await axios.get(`${config.serverURL}/reservation_services/`);
        return response.data.map(info => ({
            linkName: info.alias,
            serviceName: info.name,
            reservation_types: info.calendars.map(calendar => calendar.reservation_type),
            mini_services: info.mini_services.map(mini_service => mini_service.name),
        }));
    } catch (error) {
        console.error('Error fetching reservation service data:', error);
        return [];
    }
}

export default App;