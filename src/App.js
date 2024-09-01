import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import Header from './Header';
import ReservationComponent from "./ReservationComponent";
import config from "./Config";
import CreateNewCalendar from "./CreateNewCalendar";
import CreateNewMiniService from "./CreateNewMiniService";
import {Login, useAuth} from "./Login";
import Logout from "./Logout";
import axios from 'axios';
import Footer from "./Footer";
import NotFoundPage from "./NotFoundPage";
import LoginHandler from "./LoginHandler";


// todo TO LOGIN
async function getReservationServiceData() {
    try {
        const response = await axios.get(`${config.serverURL}/reservation_services/`);
        const data = response.data;
        const services = data.map(info => {
            return {
                linkName: info.alias,
                serviceName: info.name,
                reservation_types: info.calendars.map(calendar => calendar.reservation_type),
                mini_services: info.mini_services.map(mini_service => mini_service.name),
            }
        });
        const calendars = data.map(info => {
            return {
                linkName: info.alias,
                calendarsIds: info.calendars.map(calendar => calendar.id),
                calendarsColor: info.calendars.map(calendar => calendar.color),
            }
        });
        return {
            services: services,
            calendars: calendars
        }
    } catch (error) {
        console.log('Error fetching reservation service data:', error);
        return {
            services: [],
            calendars: []
        };
    }
}

async function getCalendarsData() {
    try {
        const response = await axios.get(`${config.serverURL}/reservation_services/`);
        const data = response.data;
        return data.map(info => {
            return {
                linkName: info.alias,
                serviceName: info.name,
                reservation_types: info.calendars.map(calendar => calendar.reservation_type),

                mini_services: info.mini_services.map(mini_service => mini_service.name),
                calendarsIds: info.calendars.map(calendar => calendar.id),
                calendarsColor: info.calendars.map(calendar => calendar.color),
            };
        });
    } catch (error) {
        console.log('Error fetching reservation service data:', error);
        return [];
    }
}


function App() {
    const {isLoggedIn, username, userRoles, logout} = useAuth();
    const loginUrl = `${config.serverURL}/users/login`;
    const [services, setServices] = useState([]);
    const [calendars, setCalendars] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const {services, calendars} = await getReservationServiceData();
            setServices(services);
            setCalendars(calendars);
        }

        if (isLoggedIn) fetchData();

    }, [isLoggedIn, username, userRoles]);

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} username={username} userRoles={userRoles} onLogout={logout}
                    services={services}/>
            <Routes>
                {/*when login go to back-end redirect to IS then redirect to logined(with needed credentials) */}
                {/*<Route path='/login' element={<RedirectToExternal url={loginUrl} />} />*/}
                <Route path='/login' element={<LoginHandler loginUrl={loginUrl}/>}/>
                {/* send it to back-end for session get data from back and make components*/}
                <Route path='/logined' element={<Login/>}/>
                {/*then go here as default page*/}
                <Route path='/' element={<ReservationComponent isLoggedIn={isLoggedIn} onLogout={logout}
                                                               roomCalendarLinks={calendars[0]}
                                                               service={services[0]}/>}/>

                {services
                    .map(service => (
                        <Route
                            key={service.linkName}
                            path={`/${service.linkName}`}
                            element={
                                <ReservationComponent
                                    isLoggedIn={isLoggedIn}
                                    onLogout={logout}
                                    roomCalendarLinks={calendars.find(calendar => calendar.linkName === service.linkName)} // TODO too slow
                                    service={service}
                                />
                            }
                        />
                    ))}
                {/*TODO call back end */}
                <Route path='/logout' element={<Logout onLogout={logout}/>}/>
                <Route path="*" element={<NotFoundPage/>}/>

                <Route path="/success" element={<NotFoundPage/>}/>
                {/*TODO AFTER SUBMIT*/}

                {/*<Route path='/' element={<HomePage onLogout={logout} />} />*/}

                {/*// if section role === "manager" he have this */}
                <Route path='/create-new-calendar'
                       element={<CreateNewCalendar isLoggedIn={isLoggedIn} username={username}/>}/>
                <Route path='/create-new-miniservice'
                       element={<CreateNewMiniService isLoggedIn={isLoggedIn} username={username}/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;