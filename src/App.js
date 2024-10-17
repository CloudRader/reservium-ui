import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import Header from './Components/Header';
import ReservationPage from "./pages/ReservationPage";
import CreateNewCalendar from "./Components/CreateNewCalendar";
import CreateNewMiniService from "./Components/CreateNewMiniService";
import {LoginToBackend} from "./Components/LoginToBackend";
import Logout from "./Components/Logout";
import Footer from "./Components/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import SuccessPage from "./pages/SuccessPage";
import {useReservationData} from './hooks/useReservationData';
import PulsatingLoader from "./Components/PulsatingLoader";
import axios from "axios";
import LoginToIS from "./Components/LoginToIS";
import {useAuth} from './hooks/useAuth';
import CalendarView from "./pages/ViewCalendarPage";
import EditServices from "./Components/EditServices";
import EditService from "./Components/EditService";
import EditCalendars from "./Components/EditCalendars";
import EditCalendar from "./Components/EditCalendar";
import EditMiniServices from "./Components/EditMiniServices";
import EditMiniService from "./Components/EditMiniService";

axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

function AppContent() {
    const {login, isLoggedIn, username, userRoles, logout, authState} = useAuth();
    const {data, isLoading, isError} = useReservationData(isLoggedIn);

    if (isError) {
        return <div>Error loading data. Please try again later.</div>;
    }

    if (authState === 'initializing' || authState === 'checking' || isLoading) {
        return <PulsatingLoader/>;
    }

    const {services, calendars, miniServices} = data || {services: [], calendars: {} ,miniServices : {}};

    return (
        <div className=" dark:!bg-slate-400 ">
            <Header isLoggedIn={true}
                    username={username}
                    services={services}
                // isManager={userRoles.includes("manager")}
                    isManager={true}
            />
            <Routes>
                {/*when login go to back-end redirect to IS then redirect to logined(with needed credentials) */}
                <Route path='/login' element={<LoginToIS/>}/>
                {/* send it to back-end for session get data from back and make components*/}
                <Route path='/logined' element={<LoginToBackend login={login}/>}/>
                {/*then go here as default page*/}

                {services && services.map(service => (
                    <Route
                        key={service.linkName}
                        path={`/${service.linkName}`}
                        element={<ReservationPage
                            isLoading={isLoading}
                            isLoggedIn={isLoggedIn}
                            onLogout={logout}
                            roomCalendarLinks={calendars[service.linkName]}
                            service={service}
                        />}
                    />
                ))}

                <Route key='/' path='/' element={<ReservationPage isLoading={isLoading}
                                                                  isLoggedIn={isLoggedIn} onLogout={logout}
                                                                  roomCalendarLinks={calendars["club"]}
                                                                  service={services[0]}/>}/>

                <Route path='/logout' element={<Logout onLogout={logout}/>}/>
                <Route path="*" element={<NotFoundPage/>}/>

                <Route path="/success" element={<SuccessPage/>}/>

                {services && services.map(service => (
                    <Route
                        key={"view" + service.linkName}
                        path={`/view/${service.linkName}`}
                        element={<CalendarView
                            roomCalendarLinks={calendars[service.linkName]}/>}
                    />
                ))}

                {/*DELETE IT USE FOR TEST*/}
                <Route path="/edit-services" element={<EditServices services={services}/>}/>

                {services && services.map(service => (
                    <>
                        <Route
                            key={'/edit-calendars/' + service.linkName}
                            path={`/edit-calendars/${service.linkName}`}
                            element={<EditCalendars
                                roomCalendarLinks={calendars[service.linkName]}
                                serviceName={service.linkName}
                            />}
                        />
                        <Route
                            key={'/edit-mini-services/' + service.linkName}
                            path={`/edit-mini-services/${service.linkName}`}
                            element={<EditMiniServices
                                miniServices={miniServices[service.linkName]}
                                serviceName={service.linkName}
                            />}
                        />
                        <Route
                            key={'/edit-service/' + service.linkName}
                            path={`/edit-service/${service.linkName}`}
                            element={<EditService
                                serviceData={service}
                            />}
                        />

                        {miniServices[service.linkName].map(miniService => (
                            <Route
                                key={'/edit-mini-service/' + service.linkName}
                                path={`/edit-mini-service/${service.linkName}/${miniService.name}`}
                                element={<EditMiniService
                                    serviceName={service.linkName}
                                    miniServiceData={miniService}
                                />}
                            />
                        ))}
                        {calendars[service.linkName].map(calendar => (
                            <Route
                                key={'/edit-calendar/' + service.linkName}
                                path={`/edit-calendar/${service.linkName}/${calendar.name}`}
                                element={<EditCalendar
                                    serviceName={service.linkName}
                                    calendarData={calendar}
                                />}
                            />
                        ))}
                    </>
                ))}

                {/*{userRoles.includes("manager") && (*/}
                {/*    // TODO add here all routs for manager*/}
                {/*    <>*/}
                <Route
                    path='/add-service'
                    element={<CreateNewCalendar username={username}/>}
                />
                <Route
                    path='/add-calendar'
                    element={<CreateNewCalendar username={username}/>}
                />
                <Route
                    path='/add-miniservice'
                    element={<CreateNewMiniService username={username}/>}
                />
                {/*    </>*/}
                {/*)}*/}

            </Routes>
            <Footer/>
        </div>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppContent/>
        </QueryClientProvider>
    );
}

export default App;