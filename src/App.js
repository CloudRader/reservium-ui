import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './Components/Header';
import ReservationPage from "./pages/ReservationPage";
import CreateNewCalendar from "./Components/CreateNewCalendar";
import CreateNewMiniService from "./Components/CreateNewMiniService";
import { LoginToBackend } from "./Components/LoginToBackend";
import Logout from "./Components/Logout";
import Footer from "./Components/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import SuccessPage from "./pages/SuccessPage";
import { useReservationData } from './hooks/useReservationData';
import PulsatingLoader from "./Components/PulsatingLoader";
import axios from "axios";
import LoginToIS from "./Components/LoginToIS";
import { useAuth } from './hooks/useAuth';
import CalendarView from "./pages/ViewCalendarPage";
import EditServices from "./Components/EditServices";
import EditService from "./Components/EditService";
import EditCalendars from "./Components/EditCalendars";
import EditCalendar from "./Components/EditCalendar";
import EditMiniServices from "./Components/EditMiniServices";
import EditMiniService from "./Components/EditMiniService";
import CreateNewService from "./Components/CreateNewService";
// tests
import SamplePage from "./testData/test";
import testService from './testData/serviceTestData';
import { ManagerRoutes } from './routes/ManagerRoutes';
import { ServiceRoutes } from './routes/ServiceRoutes';
import { TestRoutes } from './routes/TestRoutes';

axios.defaults.withCredentials = true;
const queryClient = new QueryClient();

const EditServicesLazy = lazy(() => import('./Components/EditServices'));
const CreateNewServiceLazy = lazy(() => import('./Components/CreateNewService'));

function AppContent() {
    const { login, isLoggedIn, username, userRoles, logout, authState } = useAuth();
    const { data, isLoading, isError } = useReservationData(isLoggedIn);

    if (isError) {
        return <div>Error loading data. Please try again later.</div>;
    }

    if (authState === 'initializing' || authState === 'checking' || isLoading) {
        return <PulsatingLoader />;
    }

    const { services, calendars, miniServices } = data || { services: [], calendars: {}, miniServices: {} };

    // if (!isLoggedIn) {
    //     return (
    //         <div className=" dark:!bg-slate-400 ">
    //             <Routes>
    //                 <Route path='/login' element={<LoginToIS/>}/>
    //                 <Route path='/logined' element={<LoginToBackend login={login}/>}/>
    //             </Routes>
    //         </div>
    //     );
    // }

    return (
        <div className="dark:!bg-slate-400">
            <Header
                isLoggedIn={isLoggedIn}
                username={username}
                services={services}
                isManager={userRoles?.section_head}
            />

            <Routes>
                <Route path='/login' element={<LoginToIS />} />
                <Route path='/logined' element={<LoginToBackend login={login} />} />
                <Route path='/logout' element={<Logout onLogout={logout} />} />
                <Route path='/success' element={<SuccessPage />} />

                {/* Test Routes */}
                <Route path="test/*" element={<TestRoutes />} />

                {/* Service Routes */}
                <Route path="/*" element={
                    <ServiceRoutes
                        services={services}
                        calendars={calendars}
                        isLoading={isLoading}
                        isLoggedIn={isLoggedIn}
                        logout={logout}
                    />
                } />
                {/* Manager Routes */}
                {isLoggedIn && userRoles?.section_head && (
                    <Route path="manager/*" element={
                        <ManagerRoutes
                            services={services}
                            calendars={calendars}
                            miniServices={miniServices}
                        />
                    } />
                )}

                {/* 404 route should be last */}
                <Route path="/*" element={<NotFoundPage />} />
            </Routes>

            <Footer />
        </div>
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