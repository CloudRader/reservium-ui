import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';

import Header from './Header';
import ReservationPage from "./ReservationPage";
// import CreateNewCalendar from "./CreateNewCalendar";
// import CreateNewMiniService from "./CreateNewMiniService";
import {LoginToBackend, useAuth} from "./LoginToBackend";
import Logout from "./Logout";
import Footer from "./Footer";
import NotFoundPage from "./NotFoundPage";
import LoginToIS from "./LoginToIS";
import SuccessPage from "./SuccessPage";
import {useReservationData} from './hooks/useReservationData';
import axios from "axios";

axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

function AppContent() {
    const {isLoggedIn, username, userRoles} = useAuth();
    const {data, isLoading, isError} = useReservationData(isLoggedIn);

    if (isError) {
        return <div>Error loading data. Please try again later.</div>;
    }

    const {services, calendars} = data || {services: [], calendars: {}};
    console.log(services);
    console.log(isLoading);
    console.log(isLoggedIn);

    return (
        <>
            <Header isLoggedIn={isLoggedIn} username={username}
                    services={services}/>
            <Routes>
                {/*when login go to back-end redirect to IS then redirect to logined(with needed credentials) */}
                <Route path='/login' element={<LoginToIS/>}/>
                {/* send it to back-end for session get data from back and make components*/}
                <Route path='/logined' element={<LoginToBackend/>}/>
                {/*then go here as default page*/}

                {services.map(service => (
                    <Route
                        key={service.linkName}
                        path={`/${service.linkName}`}
                        element={
                            <ReservationPage
                                isLoggedIn={isLoggedIn}
                                roomCalendarLinks={calendars[service.linkName]}
                                service={service}
                            />
                        }
                    />
                ))}
                <Route index element={
                    <ReservationPage
                        isLoggedIn={isLoggedIn}
                        roomCalendarLinks={calendars[services[0]?.linkName]}
                        service={services[0]}/>
                }/>


                <Route path='/logout' element={<Logout/>}/>
                <Route path="*" element={<NotFoundPage/>}/>

                <Route path="/success" element={<SuccessPage/>}/>

                {/*<Route path='/' element={<HomePage />} />*/}

                {/*{userRoles.includes("manager") && (*/}
                {/*    <>*/}
                {/*        <Route*/}
                {/*            path='/create-new-calendar'*/}
                {/*            element={<CreateNewCalendar isLoggedIn={isLoggedIn} username={username} />}*/}
                {/*        />*/}
                {/*        <Route*/}
                {/*            path='/create-new-miniservice'*/}
                {/*            element={<CreateNewMiniService isLoggedIn={isLoggedIn} username={username} />}*/}
                {/*        />*/}
                {/*    </>*/}
                {/*)}*/}
            </Routes>
            <Footer/>
        </>
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