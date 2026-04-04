import { useEffect } from 'react';
import axios from 'axios';
import { useQueryClient } from 'react-query';
import { API_BASE_URL } from '@constants';
import { useKeycloak } from '../hooks/useKeycloak';
import PulsatingLoader from '@components/ui/feedback/PulsatingLoader';

function Logout() {
  const queryClient = useQueryClient();
  const { keycloak, isInitialized } = useKeycloak();

  useEffect(() => {
    const logout = async () => {
      // Wait for Keycloak to be initialized before attempting logout
      if (!isInitialized) {
        return;
      }

      queryClient.clear();

      if (keycloak.authenticated) {
        try {
          await axios.get(`${API_BASE_URL}/auth/logout`);
        } catch (error) {
          console.error('Backend logout error:', error);
        }
      }

      // Safely logout from Keycloak
      if (keycloak && typeof keycloak.logout === 'function') {
        try {
          await keycloak.logout({ redirectUri: window.location.origin });
        } catch (error) {
          console.error('Keycloak logout error:', error);
          // Fallback: just redirect to home
          window.location.href = window.location.origin;
        }
      } else {
        // Fallback: just redirect to home
        window.location.href = window.location.origin;
      }
    };

    logout();
  }, [queryClient, keycloak, isInitialized]);

  return <PulsatingLoader />;
}

export default Logout;
