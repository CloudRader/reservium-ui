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


async function getReservationServiceData() {
    try {
        const response = await axios.get(`${config.serverURL}/reservation_services/`);
        const data = response.data;

        const services = data.map(info => ({
            linkName: info.alias,
            serviceName: info.name,
            reservation_types: info.calendars.map(calendar => calendar.reservation_type),
            calendarIds: info.calendars.reduce((acc, calendar) => {
                acc[calendar.reservation_type] = calendar.id;
                return acc;
            }, {})
        }));

        const calendars = data.reduce((acc, info) => {
            acc[`${info.alias}`] =  info.calendars.map((calendar) => {
                const calAcc = {};
                calAcc["googleCalendarId"] = calendar.id;
                calAcc["className"] = calendar.reservation_type;
                calAcc["backgroundColor"] = calendar.color;
                calAcc["borderColor"] = calendar.color;
                return calAcc;
            }, {});

            return acc;
        }, {});

        return {
            services: services,
            calendars: calendars
        };
    } catch (error) {
        console.log('Error fetching reservation service data:', error);
        return {
            services: [],
            calendars: {}
        };
    }
}

function App() {
    const {isLoggedIn, username, userRoles, logout} = useAuth();
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
                <Route path='/login' element={<LoginHandler/>}/>
                {/* send it to back-end for session get data from back and make components*/}
                <Route path='/logined' element={<Login/>}/>
                {/*then go here as default page*/}
                <Route path='/' element={<ReservationComponent isLoggedIn={isLoggedIn} onLogout={logout}
                                                               roomCalendarLinks={calendars[0]}
                                                               service={calendars.club}/>}/>

                {services
                    .map(service => (
                        <Route
                            key={service.linkName}
                            path={`/${service.linkName}`}
                            element={
                                <ReservationComponent
                                    isLoggedIn={isLoggedIn}
                                    onLogout={logout}
                                    // roomCalendarLinks={config.clubCalendarLinks}
                                    roomCalendarLinks={calendars[service.linkName]}
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

                {/*// if section role === "manager" show this */}
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