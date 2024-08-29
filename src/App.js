import React, {useEffect, useState} from 'react';
import { Route, Routes, } from 'react-router-dom';
import Header from './Header';
import ReservationComponent from "./ReservationComponent";
import config from "./Config";
import CreateNewCalendar from "./CreateNewCalendar";
import CreateNewMiniService from "./CreateNewMiniService";
import {Login, useAuth} from "./Login";
import Logout from "./Logout";
import axios from 'axios';
import Footer from "./Footer";

function RedirectToExternal({ url }) {
    useEffect(() => {
        window.location.href = url;
    }, [url]);
    return null;
}

async function getReservationServiceData() {
    try {
        const response = await axios.get(`${config.domenServer}/reservation_services/`);
        const data = response.data;
        const result = data.map(info => {
            return {
                linkName: info.alias,
                serviceName: info.name,
                reservation_types: info.calendars.map(calendar => calendar.reservation_type),
                mini_services: info.mini_services.map(mini_service => mini_service.name),
            };
        });

        console.log("result", result);
        return result;

    } catch (error) {
        console.log('Error fetching reservation service data:', error);
        return [];
    }
}


function App() {
    const { isLoggedIn, username, userRoles, logout } = useAuth();
    const loginUrl = `${config.domenServer}/users/login`;

    const [services, setServices] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getReservationServiceData();
            setServices(data);
        }
        if(isLoggedIn) fetchData();
    }, [isLoggedIn]);

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} username={username} userRoles={userRoles} onLogout={logout} services={services} />
            <Routes>
                {services
                    .map(service => (
                        <Route
                            key={service.linkName}
                            path={`/${service.linkName}`}
                            element={
                                <ReservationComponent
                                    isLoggedIn={isLoggedIn}
                                    onLogout={logout}
                                    roomCalendarLinks={config[`${service.linkName}CalendarLinks`]}
                                    service={service}
                                />
                            }
                        />
                    ))}
                <Route path='/login' element={<RedirectToExternal url={loginUrl} />} />
                <Route path='/logined' element={<Login />} />
                <Route path='/logout' element={<Logout onLogout={logout} />} />
                <Route path='/create-new-calendar' element={<CreateNewCalendar isLoggedIn={isLoggedIn} username={username} onLogout={logout} />} />
                <Route path='/create-new-miniservice' element={<CreateNewMiniService isLoggedIn={isLoggedIn} username={username} onLogout={logout} />} />
                <Route path='/' element={<ReservationComponent isLoggedIn={isLoggedIn} onLogout={logout} roomCalendarLinks={config.clubCalendarLinks} selectedZone={"club"} />} />
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;