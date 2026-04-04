import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '../hooks/useKeycloak';
import { API_BASE_URL } from '@constants';
import axios from 'axios';
import PulsatingLoader from '@components/ui/feedback/PulsatingLoader';
import { ROUTES } from '@config/routes';
import { API_ENDPOINTS } from '@config/apiEndpoints';

export const LoginToBackend = ({ login }) => {
  const navigate = useNavigate();
  const { keycloak, isInitialized } = useKeycloak();

  useEffect(() => {
    // Wait for Keycloak to initialize
    if (!isInitialized) {
      return;
    }

    // Check if user is authenticated after Keycloak has initialized
    if (keycloak.authenticated && keycloak.token) {
      axios
        .post(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, null)
        .then(async (response) => {
          // Backend handles creating/updating user
          await login();

          // Clean up query params
          window.history.replaceState({}, document.title, ROUTES.HOME);

          // Redirect to home
          navigate(ROUTES.HOME, { replace: true });
        })
        .catch((err) => {
          console.error('Backend login failed:', err);
          navigate(ROUTES.HOME);
        });
    } else {
      // If not authenticated after initialization, redirect to login
      console.error('Not authenticated with Keycloak after initialization');
      navigate(ROUTES.LOGIN);
    }
  }, [keycloak, isInitialized, login, navigate]);

  return <PulsatingLoader />;
};
