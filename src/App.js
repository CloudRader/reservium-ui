import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import config from "./Config";
import { useAuth } from "./hooks/useAuth";
import ReservationPage from "./ReservationPage";
import LoginInfoPage from "./LoginInfoPage";
import Header from "./Header";
import Footer from "./Footer";
import {fetchReservationData, useReservationData} from "./hooks/useReservationData";
import {QueryClient, QueryClientProvider} from "react-query";
import LoginToIS from "./LoginToIS";
import {LoginToBackend} from "./LoginToBackend";
import Logout from "./Logout";
import SuccessPage from "./SuccessPage";
const queryClient = new QueryClient();

function AppRoutes() {
    const { isLoggedIn, login, logout } = useAuth();

    return (
        <Routes>
            <Route path="/login" element={<LoginToIS />} />
            <Route path="/logined" element={<LoginToBackend login={login} />} />
            <Route path="/logout" element={<Logout logout={logout} />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route
                path="/login_info"
                element={isLoggedIn ? <Navigate to="/" replace /> : <LoginInfoPage />}
            />
            <Route
                path="/*"
                element={isLoggedIn ? <AppContent /> : <Navigate to="/login_info" replace />}
            />
        </Routes>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
                <AppRoutes />
        </QueryClientProvider>
    );
}

const Loader = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
);

function AppContent() {
    const [authState, setAuthState] = useState('initial');
    const [userData, setUserData] = useState(null);
    const [servicesData, setServicesData] = useState(null);
    const { logout } = useAuth();

    useEffect(() => {
        const checkAuth = async () => {
            setAuthState('checking');
            try {
                const response = await axios.get(`${config.serverURL}/users/me`);
                setUserData(response.data);
                setAuthState('authenticated');
                await fetchServicesData();
            } catch (error) {
                console.error('Authentication error:', error);
                setAuthState('unauthenticated');
            }
        };

        const fetchServicesData = async () => {
            try {
                const data = await fetchReservationData();
                setServicesData(data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        checkAuth();
    }, []);

    if (authState === 'initial' || authState === 'checking') {
        return <Loader />;
    }

    if (authState === 'unauthenticated') {
        return <LoginInfoPage />;
    }

    if (authState === 'authenticated' && !servicesData) {
        return <Loader />;
    }

    const renderRoutes = () => (
        <>
            {servicesData && servicesData.services.map(service => (
                <Route
                    key={service.linkName}
                    path={`/${service.linkName}`}
                    element={
                        <ReservationPage
                            isLoggedIn={true}
                            roomCalendarLinks={servicesData.calendars[service.linkName]}
                            service={service}
                        />
                    }
                />
            ))}
            <Route index element={
                servicesData && servicesData.services.length > 0 ? (
                    <ReservationPage
                        isLoggedIn={true}
                        roomCalendarLinks={servicesData.calendars[servicesData.services[0]?.linkName]}
                        service={servicesData.services[0]}
                    />
                ) : (
                    <div>No services available</div>
                )
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
        </>
    );

    return (
        <>
            <Header isLoggedIn={true} username={userData.username} services={servicesData?.services || []} />
            {renderRoutes()}
            <Footer />
        </>
    );
}

export default App;

            // {/*{userRoles.includes("manager") && (*/}
            // {/*    <>*/}
            // {/*        <Route*/}
            // {/*            path='/create-new-calendar'*/}
            // {/*            element={<CreateNewCalendar isLoggedIn={isLoggedIn} username={username} />}*/}
            // {/*        />*/}
            // {/*        <Route*/}
            // {/*            path='/create-new-miniservice'*/}
            // {/*            element={<CreateNewMiniService isLoggedIn={isLoggedIn} username={username} />}*/}
            // {/*        />*/}
            // {/*    </>*/}
            // {/*)}*/}