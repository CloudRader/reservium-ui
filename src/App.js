import React, {  useEffect } from 'react';
import { Route, Routes, } from 'react-router-dom';
import Header from './Header';
import ReservationComponent from "./ReservationComponent";
import config from "./Config";
import CreateNewCalendar from "./CreateNewCalendar";
import CreateNewMiniService from "./CreateNewMiniService";
import {Login, useAuth} from "./Login";
import Logout from "./Logout";
import axios from 'axios';

function RedirectToExternal({ url }) {
    useEffect(() => {
        window.location.href = url;
    }, [url]);
    return null;
}

async function getReservationServiceData() {
    try {
        // Make the GET request to the /reservation_services/ endpoint
        const response = await axios.get(`${config.domenServer}/reservation_services/`);

        // Extract the data from the response
        const data = response.data;
        const result = [];
        data.map(info => {
            const tmp = {
                linkName: info.alias,
                serviceName: info.name,
                reservation_types: [],
                mini_services: [],
            };

            tmp.reservation_types = info.calendars.map(calendar => {
                console.log(calendar.reservation_type);
                return calendar.reservation_type;
            });
            tmp.mini_services = info.mini_services.map(mini_service => {
                return mini_service.name;
            });

            result.push(tmp);
        })
        console.log("result", result);
        return result;

    } catch (error) {
        console.error('Error fetching reservation service data:', error);
    }
}


function App() {
    const { isLoggedIn, username, userRoles, logout } = useAuth();
    const loginUrl = `${config.domenServer}/users/login`;
    const services = getReservationServiceData();
    return (
        <div>
            <Header isLoggedIn={isLoggedIn} username={username} userRoles={userRoles} onLogout={logout} services={services}/>
            <Routes>
                <Route path='/club-room' element={<ReservationComponent isLoggedIn={isLoggedIn} username={username} onLogout={logout} roomCalendarLink={config.clubRoomCalendarLink} selectedZone={"klub"} />} />
                <Route path='/study-room' element={<ReservationComponent isLoggedIn={isLoggedIn} username={username}  onLogout={logout} roomCalendarLink={config.studyRoomCalendarLink} selectedZone={"stud"}/>} />
                <Route path='/grill' element={<ReservationComponent isLoggedIn={isLoggedIn} username={username} onLogout={logout} roomCalendarLink={config.grillCalendarLink} selectedZone={"grill"}/>} />
                <Route path='/login' element={<RedirectToExternal url={loginUrl} />} />
                <Route path='/logined' element={<Login />} />
                <Route path='/logout' element={<Logout onLogout={logout} />} />
                <Route path='/' element={<ReservationComponent isLoggedIn={isLoggedIn} username={username} onLogout={logout} roomCalendarLink={config.clubRoomCalendarLink} selectedZone={"klub"} />} />
                <Route path='/create-new-calendar' element={<CreateNewCalendar isLoggedIn={isLoggedIn} username={username} onLogout={logout} />} />
                <Route path='/create-new-miniservice' element={<CreateNewMiniService isLoggedIn={isLoggedIn} username={username} onLogout={logout} />} />
            </Routes>
        </div>
    );
}
export default App;