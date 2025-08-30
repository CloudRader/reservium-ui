import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import Header from './widgets/Header/Header.jsx';
import { LoginToBackend } from './Components/auth/LoginToBackend.jsx';
import Logout from './Components/auth/Logout.jsx';
import Footer from './widgets/Footer/Footer.jsx';
import SuccessPage from './pages/SuccessPage';
import { useReservationData } from './hooks/useReservationData';
import PulsatingLoader from './Components/ui/PulsatingLoader';
import LoginToIS from './Components/auth/LoginToIS.jsx';
import { useAuth } from './hooks/useAuth';
import { ManagerRoutes } from './routes/ManagerRoutes';
import { ServiceRoutes } from './routes/ServiceRoutes';
import Dashboard from './Components/dashboard/Dashboard';
import { ViewCalendarRoutes } from './routes/ViewCalendarRoutes';
import LoginInfoPage from './pages/LoginInfoPage';
import { tokenManager } from './utils/tokenManager';

axios.interceptors.request.use(
  (config) => {
    // Ensure headers object exists
    if (!config.headers) {
      config.headers = {};
    }
    const token = tokenManager.getToken();

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('❌ Axios Request Error:', error);
    return Promise.reject(error);
  }
);

// Setup response interceptor for handling 401 errors
// axios.interceptors.response.use(
//   (response) => {
//     console.log(
//       '✅ Axios Response:',
//       response.status,
//       response.config.method?.toUpperCase(),
//       response.config.url
//     );
//     return response;
//   },
//   (error) => {
//     console.error(
//       '❌ Axios Response Error:',
//       error.response?.status,
//       error.config?.method?.toUpperCase(),
//       error.config?.url
//     );
//     if (error.response?.status === 401) {
//       console.log(
//         '🔒 401 Unauthorized - Clearing token and redirecting to logout'
//       );
//       tokenManager.clearToken();
//       // Redirect to login or handle logout
//       window.location.href = '/logout';
//     }
//     return Promise.reject(error);
//   }
// );

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

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
  const isViewCalendarRoute = location.pathname.startsWith('/view');

  if (authState === 'loading') {
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
          element={<ServiceRoutes services={services} calendars={calendars} />}
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
