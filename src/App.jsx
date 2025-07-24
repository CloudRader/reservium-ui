import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./Components/Header";
import { LoginToBackend } from "./Components/LoginToBackend";
import Logout from "./Components/Logout";
import Footer from "./Components/Footer";
import SuccessPage from "./pages/SuccessPage";
import { useReservationData } from "./hooks/useReservationData";
import PulsatingLoader from "./Components/ui/PulsatingLoader";
import LoginToIS from "./Components/LoginToIS";
import { useAuth } from "./hooks/useAuth";
import { ManagerRoutes } from "./routes/ManagerRoutes";
import { ServiceRoutes } from "./routes/ServiceRoutes";
import Dashboard from "./Components/dashboard/Dashboard";
import { ViewCalendarRoutes } from "./routes/ViewCalendarRoutes";
import LoginInfoPage from "./pages/LoginInfoPage";

const queryClient = new QueryClient();

function AppContent() {
  const {
    login,
    isLoggedIn,
    username,
    managerRoles,
    logout,
    authState,
    userId,
  } = useAuth();
  const { data, isLoading, isError } = useReservationData(isLoggedIn);
  const location = useLocation();
  const isViewCalendarRoute = location.pathname.startsWith("/view");

  if (authState === "initializing" || authState === "checking") {
    return <PulsatingLoader />;
  }

  if (isError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  if (isLoading) {
    return <PulsatingLoader />;
  }

  const { services, calendars, miniServices } = data || {
    services: [],
    calendars: {},
    miniServices: {},
  };

  //   if (!isLoggedIn) {
  //       return (
  //           <div className=" dark:!bg-slate-400 ">
  //               <Routes>
  //                   <Route path='/login' element={<LoginToIS />} />
  //                   <Route path='/logined' element={<LoginToBackend login={login} />} />
  //               </Routes>
  //           </div>
  //       );
  //   }

  return (
    <div className="dark:!bg-slate-400">
      <Header
        isLoggedIn={isLoggedIn}
        username={username}
        services={services}
        isManager={managerRoles?.length > 0}
      />

      <Routes>
        <Route path="/login" element={<LoginToIS />} />
        <Route path="/logined" element={<LoginToBackend login={login} />} />
        <Route path="/logout" element={<Logout onLogout={logout} />} />

        {!isLoggedIn && <Route path="*" element={<LoginInfoPage />} />}

        <Route path="/success" element={<SuccessPage />} />

        <Route
          path="/dashboard"
          element={
            <Dashboard
              userId={userId}
              isManager={managerRoles?.length > 0}
              managerRoles={managerRoles}
            />
          }
        />

        {/* View Calendar Routes */}
        <Route path="view/*" element={<ViewCalendarRoutes />} />

        {/* Test Routes */}
        {/* <Route path="test/*" element={<TestRoutes />} /> */}

        {/* Manager Routes */}
        {managerRoles?.length > 0 && (
          <Route
            path="manager/*"
            element={
              <ManagerRoutes
                services={services}
                calendars={calendars}
                miniServices={miniServices}
              />
            }
          />
        )}

        {/* Service Routes */}
        <Route
          path="/*"
          element={
            <ServiceRoutes
              services={services}
              calendars={calendars}
              logout={logout}
            />
          }
        />
      </Routes>

      {/* Only render the footer if not on a view calendar route */}
      {!isViewCalendarRoute && <Footer />}
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
