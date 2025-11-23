import { useEffect } from 'react';
import axios from 'axios';
import { useQueryClient } from 'react-query';
import { API_BASE_URL } from '../../constants';
import keycloak from './Keycloak';
import PulsatingLoader from '../ui/PulsatingLoader';

function Logout() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const logout = async () => {
      queryClient.clear();

      if (keycloak.authenticated) {
        try {
          await axios.get(`${API_BASE_URL}/auth/logout`);
        } catch (error) {
          console.error('Backend logout error:', error);
        }
      }

      keycloak.logout({ redirectUri: window.location.origin });
    };

    logout();
  }, [queryClient]);

  return <PulsatingLoader />;
}

export default Logout;
