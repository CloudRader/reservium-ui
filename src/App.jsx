import React, { useEffect, useState } from 'react';
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
import LoginToKeycloak from './Components/auth/LoginToKeycloak.jsx';
import { useAuth } from './hooks/useAuth';
import { ManagerRoutes } from './routes/ManagerRoutes';
import { ServiceRoutes } from './routes/ServiceRoutes';
import Dashboard from './Components/dashboard/Dashboard';
import { ViewCalendarRoutes } from './routes/ViewCalendarRoutes';
import LoginInfoPage from './pages/LoginInfoPage';
import keycloak from './Components/auth/Keycloak';

// Request interceptor: Add Authorization header with token refresh
axios.interceptors.request.use(
  async (config) => {
    if (!config.headers) {
      config.headers = {};
    }

    // Only add token if user is authenticated
    if (keycloak.authenticated) {
      try {
        // Refresh token if it expires in less than 30 seconds (industry standard)
        await keycloak.updateToken(30);
        config.headers['Authorization'] = `Bearer ${keycloak.token}`;
      } catch (error) {
        console.error('Failed to refresh token:', error);
        keycloak.clearToken();
      }
    }

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor: Handle 401/403 errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Authentication error, redirecting to logout');
      keycloak.logout({ redirectUri: window.location.origin });
    }
    return Promise.reject(error);
  }
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function AppContent() {
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);

  useEffect(() => {
    keycloak
      .init({
        onLoad: 'check-sso',
        pkceMethod: 'S256',
        checkLoginIframe: false,
      })
      .then((authenticated) => {
        console.log('Keycloak initialized, authenticated:', authenticated);
        setKeycloakInitialized(true);
      })
      .catch((error) => {
        console.error('Keycloak init failed:', error);
        setKeycloakInitialized(true);
      });
  }, []);

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

  if (!keycloakInitialized || authState === 'loading') {
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

  if (!isLoggedIn) {
    return (
      <div className=" dark:!bg-slate-400 ">
        <Routes>
          <Route path="/login" element={<LoginToKeycloak />} />
          <Route path="/logined" element={<LoginToBackend login={login} />} />
          <Route path="*" element={<LoginInfoPage />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="dark:!bg-slate-400">
      <Header
        isLoggedIn={isLoggedIn}
        username={username}
        services={services}
        isManager={managerRoles?.length > 0}
      />
      <Routes>
        <Route path="/login" element={<LoginToKeycloak />} />
        <Route path="/logined" element={<LoginToBackend login={login} />} />
        <Route path="/logout" element={<Logout onLogout={logout} />} />

        <Route path="/success" element={<SuccessPage />} />

        {!isLoggedIn && <Route path="*" element={<LoginInfoPage />} />}

        <Route
          path="/events"
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
