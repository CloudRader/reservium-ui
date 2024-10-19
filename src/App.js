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
import CreateNewService from "./Components/CreateNewService";

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

    const {services, calendars, miniServices} = data || {services: [], calendars: {}, miniServices: {}};

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
        <div className=" dark:!bg-slate-400 ">
            <Routes>
                {/*when login go to back-end redirect to IS then redirect to logined(with needed credentials) */}
                <Route path='/login' element={<LoginToIS/>}/>
                {/* send it to back-end for session get data from back and make components*/}
                <Route path='/logined' element={<LoginToBackend login={login}/>}/>
                {/*then go here as default page*/}
            </Routes>
            <Header isLoggedIn={true}
                    username={username}
                    services={services}
                // isManager={userRoles.includes("manager")}
                    isManager={true}
            />
            <Routes>
                <Route path='/logout' element={<Logout onLogout={logout}/>}/>
                <Route path="*" element={<NotFoundPage/>}/>

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



                <Route path='/success' element={<SuccessPage/>}/>

                {services && services.map(service => (
                    <Route
                        key={"view" + service.linkName}
                        path={`/view/${service.linkName}`}
                        element={<CalendarView
                            roomCalendarLinks={calendars[service.linkName]}/>}
                    />
                ))}

                {/*<Route*/}
                {/*    path={`/edit-service/1`}*/}

                {/*    element={<UniversalLayout centerContent*/}
                {/*                              headerTittle={"Service:"}>*/}

                {/*        <div className="bg-white p-4 rounded-lg shadow">*/}
                {/*            asd*/}
                {/*        </div><div className="bg-white p-4 rounded-lg shadow">*/}
                {/*            asd*/}
                {/*        </div><div className="bg-white p-4 rounded-lg shadow">*/}
                {/*            asd*/}
                {/*        </div><div className="bg-white p-4 rounded-lg shadow">*/}
                {/*            asd*/}
                {/*        </div>*/}
                {/*    </UniversalLayout>}*/}
                {/*/>*/}

                {userRoles.includes("manager") &&
                    <>
                        <Route path="/edit-services" element={<EditServices services={services}/>}/>
                        <Route
                            path='/add-service'
                            element={<CreateNewService/>}
                        />

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
                                    path={`/edit-mini-services/${service.linkName}`}
                                    element={<EditMiniServices
                                        miniServices={miniServices[service.linkName]}
                                        serviceName={service.linkName}
                                    />}
                                />
                                <Route
                                    path={`/edit-service/${service.serviceName}`}
                                    element={<EditService
                                        service={service}
                                    />}
                                />

                                <Route
                                    path={`/add-calendar/${service.linkName}`}
                                    element={<CreateNewCalendar serviceId={service.id}
                                                                serviceCalendars={calendars[service.linkName]}/>}
                                />
                                <Route
                                    path={`/add-mini-service/${service.linkName}`}
                                    element={<CreateNewMiniService serviceId={service.id}/>}
                                />

                                {miniServices[service.linkName].map(miniService => (
                                    <Route
                                        key={'/edit-mini-service/' + service.linkName}
                                        path={`/edit-mini-service/${service.linkName}/${miniService.name}`}
                                        element={<EditMiniService
                                            serviceName={service.linkName}
                                            miniServiceData={miniService}
                                            serviceId={service.id}
                                        />}
                                    />
                                ))}
                                {calendars[service.linkName].map(calendar => (
                                    <Route
                                        key={'/edit-calendar/' + service.linkName}
                                        path={`/edit-calendar/${service.linkName}/${calendar.className}`}
                                        element={<EditCalendar
                                            serviceName={service.linkName}
                                            calendarBaseData={calendar}
                                            serviceId={service.id}
                                        />}
                                    />
                                ))}

                            </>
                        ))}
                    </>
                }
            </Routes>
            <Footer/>
        </div>
    )
        ;
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppContent/>
        </QueryClientProvider>
    );
}

export default App;