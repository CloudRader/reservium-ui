import React, {useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import Header from './Header';
import ReservationPage from "./ReservationPage";
// import CreateNewCalendar from "./CreateNewCalendar";
// import CreateNewMiniService from "./CreateNewMiniService";
import {LoginToBackend} from "./LoginToBackend";
import Logout from "./Logout";
import Footer from "./Footer";
import NotFoundPage from "./NotFoundPage";
import SuccessPage from "./SuccessPage";
import {useReservationData} from './hooks/useReservationData';
import PulsatingLoader from "./Components/PulsatingLoader";
import axios from "axios";
import LoginToIS from "./LoginToIS";
import {useAuth} from './hooks/useAuth';

axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

function AppContent() {
    // const [clientStatus, setClientStatus] = useState("waitForAuthorize");
    const {isLoggedIn, username, userRoles, logout, authState} = useAuth(clientStatus,setClientStatus);
    const {data, isLoading, isError} = useReservationData(isLoggedIn);

    if (isError) {
        return <div>Error loading data. Please try again later.</div>;
    }

    if (authState === 'initializing' || authState === 'checking' || dataLoading) {
        return <PulsatingLoader />;
    }

    const {services, calendars} = data || {services: [], calendars: {}};

    return (
        <>
            <Header isLoggedIn={isLoggedIn} username={username} userRoles={userRoles}
                    onLogout={logout}
                    services={services}/>
            <Routes>
                {/*when login go to back-end redirect to IS then redirect to logined(with needed credentials) */}
                <Route path='/login' element={<LoginToIS/>}/>
                {/* send it to back-end for session get data from back and make components*/}
                <Route path='/logined' element={<LoginToBackend login={login}/>}/>
                {/*then go here as default page*/}

                {services.map(service => (
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