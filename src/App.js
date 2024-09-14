import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import Header from './Header';
import ReservationPage from "./ReservationPage";
import config from "./Config";
import CreateNewCalendar from "./CreateNewCalendar";
import CreateNewMiniService from "./CreateNewMiniService";
import {Login, useAuth} from "./Login";
import Logout from "./Logout";
import axios from 'axios';
import Footer from "./Footer";
import NotFoundPage from "./NotFoundPage";
import LoginHandler from "./LoginHandler";
import SuccessPage from "./SuccessPage";
import { QueryClient, QueryClientProvider } from 'react-query';
axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

async function getReservationServiceData() {
    try {
        const response = await axios.get(`${config.serverURL}/reservation_services/`);
        const data = response.data;

        const services = data.map(info => ({
            wikiLink: info.web,
            linkName: info.alias,
            serviceName: info.name,
            contact_mail: info.contact_mail,
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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const {services, calendars} = await getReservationServiceData();
            setServices(services);
            setCalendars(calendars);
            setIsLoading(false);
        }

        if (isLoggedIn) fetchData();

    }, [isLoggedIn]);


    if (isLoading && isLoggedIn) { // change logic here TodO
        return <div>Loading...</div>; // or a more sophisticated loading component
    }

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} username={username} userRoles={userRoles} onLogout={logout}
                    services={services}/>
            <QueryClientProvider client={queryClient}>
            <Routes>
                {/*when login go to back-end redirect to IS then redirect to logined(with needed credentials) */}
                <Route path='/login' element={<LoginHandler/>}/>
                {/* send it to back-end for session get data from back and make components*/}
                <Route path='/logined' element={<Login/>}/>
                {/*then go here as default page*/}
                <Route key='' path='/' element={<ReservationPage isLoggedIn={isLoggedIn} onLogout={logout}
                                                               roomCalendarLinks={calendars["club"]}
                                                               service={services[0]}/>}/>

                {services
                    .map(service => (
                        <Route
                            key={service.linkName}
                            path={`/${service.linkName}`}
                            element={
                                <ReservationPage
                                    isLoggedIn={isLoggedIn}
                                    onLogout={logout}
                                    roomCalendarLinks={calendars[service.linkName]}
                                    service={service}
                                />
                            }
                        />
                    ))}

                <Route path='/logout' element={<Logout onLogout={logout}/>}/>
                <Route path="*" element={<NotFoundPage/>}/>

                <Route path="/success" element={<SuccessPage />}/>

                {/*<Route path='/' element={<HomePage />} />*/}

                {/*// if section role === "manager" show this */}
                <Route path='/create-new-calendar'
                       element={<CreateNewCalendar isLoggedIn={isLoggedIn} username={username}/>}/>
                <Route path='/create-new-miniservice'
                       element={<CreateNewMiniService isLoggedIn={isLoggedIn} username={username}/>}/>
            </Routes>
            </QueryClientProvider>

            <Footer/>
        </div>
    );
}

export default App;