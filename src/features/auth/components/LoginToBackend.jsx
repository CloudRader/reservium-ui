import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '../hooks/useKeycloak';
import { API_BASE_URL } from '@constants';
import axios from 'axios';
import PulsatingLoader from '@components/ui/feedback/PulsatingLoader';

export const LoginToBackend = ({ login }) => {
  const navigate = useNavigate();
  const { keycloak, isInitialized } = useKeycloak();

  useEffect(() => {
    // Wait for Keycloak to initialize
    // This is crucial because Keycloak needs to parse the callback URL
    if (!isInitialized) {
      return;
    }

    // Check if user is authenticated after Keycloak has initialized
    if (keycloak.authenticated && keycloak.token) {
      axios
        .post(`${API_BASE_URL}/auth/login`, null)
        .then(async (response) => {
          // Backend handles creating/updating user
          await login();

          // Clean up query params
          window.history.replaceState({}, document.title, '/');

          // Redirect to home
          navigate('/', { replace: true });
        })
        .catch((err) => {
          console.error('Backend login failed:', err);
          navigate('/');
        });
    } else {
      // If not authenticated after initialization, redirect to login
      console.error('Not authenticated with Keycloak after initialization');
      navigate('/login');
    }
  }, [keycloak, isInitialized, login, navigate]);

  return <PulsatingLoader />;
};