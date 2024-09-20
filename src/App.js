import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';

import Header from './Header';
import ReservationPage from "./ReservationPage";
// import CreateNewCalendar from "./CreateNewCalendar";
// import CreateNewMiniService from "./CreateNewMiniService";
import {LoginToBackend} from "./LoginToBackend";
import {useAuth} from "./hooks/useAuth";
import Logout from "./Logout";
import Footer from "./Footer";
import NotFoundPage from "./NotFoundPage";
import LoginToIS from "./LoginToIS";
import SuccessPage from "./SuccessPage";
import {useReservationData} from './hooks/useReservationData';
import axios from "axios";
import LoginInfoPage from "./LoginInfoPage";

axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

function AppContent() {
    const { isLoggedIn, username, userRoles, logout, isLoading: isAuthLoading, isError: isAuthError, error: authError } = useAuth();
    const { data, isLoading: isDataLoading, isError: isDataError } = useReservationData(isLoggedIn);

    // Combined loading state
    if (isAuthLoading || (isLoggedIn && isDataLoading)) {
        return <div>Loading...</div>;
    }

    // Auth error state
    if (isAuthError) {
        return <div>Authentication Error: {authError.message}</div>;
    }

    // Not logged in state
    if (!isLoggedIn) {
        return <LoginInfoPage />;
    }

    // Data fetch error state
    if (isDataError) {
        return <div>Error loading data. Please try again later.</div>;
    }

    const {services, calendars} = data || {services: [], calendars: {}};


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