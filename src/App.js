import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import Header from './Components/Header';
import ReservationPage from "./ReservationPage";
// import CreateNewCalendar from "./CreateNewCalendar";
// import CreateNewMiniService from "./CreateNewMiniService";
import {LoginToBackend} from "./LoginToBackend";
import Logout from "./Logout";
import Footer from "./Components/Footer";
import NotFoundPage from "./NotFoundPage";
import SuccessPage from "./SuccessPage";
import {useReservationData} from './hooks/useReservationData';
import PulsatingLoader from "./Components/PulsatingLoader";
import axios from "axios";
import LoginToIS from "./LoginToIS";
import {useAuth} from './hooks/useAuth';
import CalendarView from "./ViewCalendarPage";
import EditServices from "./Components/EditServices";
import EditService from "./Components/EditService";

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

    const {services, calendars} = data || {services: [], calendars: {}};

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

                <Route path="/edit-services" element={<EditServices/>}/>
                <Route path="/edit-service/1" element={<EditService/>}/>

                {services && services.map(service => (
                    <Route
                        key={`/edit-service/${service.linkName}`}
                        path={`/edit-service/${service.linkName}`}
                        element={<EditService />}
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

                <Route path='/' element={<HomePage />} />

                {userRoles.includes("manager") && (
                    <>
                        <Route
                            path='/create-new-calendar'
                            element={<CreateNewCalendar isLoggedIn={isLoggedIn} username={username} />}
                        />
                        <Route
                            path='/create-new-miniservice'
                            element={<CreateNewMiniService isLoggedIn={isLoggedIn} username={username} />}
                        />
                    </>
                )}
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