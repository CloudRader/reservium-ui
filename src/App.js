import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Header from './Header';
import ReservationPage from "./ReservationPage";
import { LoginToBackend } from "./LoginToBackend";
import { useAuth } from "./hooks/useAuth";
import Logout from "./Logout";
import Footer from "./Footer";
import NotFoundPage from "./NotFoundPage";
import LoginToIS from "./LoginToIS";
import SuccessPage from "./SuccessPage";
import { useReservationData } from './hooks/useReservationData';
import axios from "axios";
import LoginInfoPage from "./LoginInfoPage";

axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

function AppContent() {
    const { isLoggedIn, username, userRoles, login, logout, isLoading: isAuthLoading, isError: isAuthError, error: authError } = useAuth();
    const { data, isLoading: isDataLoading, isError: isDataError } = useReservationData(isLoggedIn);

    if (isAuthLoading) {
        return <div>Loading authentication...</div>;
    }

    if (isAuthError) {
        return <div>Authentication Error: {authError.message}</div>;
    }

    const { services, calendars } = data || { services: [], calendars: {} };

    const renderRoutes = () => (
        <Routes>
            {/*when login go to back-end redirect to IS then redirect to logined(with needed credentials) */}
            <Route path='/login' element={<LoginToIS/>}/>
            {/* send it to back-end for session get data from back and make components*/}
            <Route path='/logined' element={<LoginToBackend login={login}/>}/>
            {/*then go here as default page*/}
            <Route path='/logout' element={<Logout logout={logout} />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/login_info" element={<LoginInfoPage />} />

            {isLoggedIn ? (
                <>
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
                        services.length > 0 ? (
                            <ReservationPage
                                isLoggedIn={isLoggedIn}
                                roomCalendarLinks={calendars[services[0]?.linkName]}
                                service={services[0]}
                            />
                        ) : (
                            <div>No services available</div>
                        )
                    } />
                </>
            ) : (
                <Route path="*" element={<Navigate to="/login_info" replace />} />
            )}

            <Route path="*" element={<NotFoundPage />} />
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
    );

    return (
        <>
            <Header isLoggedIn={isLoggedIn} username={username} services={services} />
            {isLoggedIn && isDataLoading ? (
                <div>Loading data...</div>
            ) : isLoggedIn && isDataError ? (
                <div>Error loading data. Please try again later.</div>
            ) : (
                renderRoutes()
            )}
            <Footer />
        </>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppContent />
        </QueryClientProvider>
    );
}

export default App;