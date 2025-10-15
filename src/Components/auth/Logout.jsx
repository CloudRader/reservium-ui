import { useEffect } from 'react';
import axios from 'axios';
import LoginInfoPage from '../../pages/LoginInfoPage.jsx';
import { API_BASE_URL } from '../../constants';
import keycloak from './Keycloak';

axios.defaults.withCredentials = true;

function Logout({ onLogout }) {
  useEffect(() => {
    const logoutUser = async () => {
      try {
        // Call backend logout endpoint if authenticated
        if (keycloak.authenticated) {
          await axios.get(`${API_BASE_URL}/auth/logout`);
        }
      } catch (error) {
        console.error('Backend logout error:', error);
      }

      // Update app state
      if (onLogout) {
        onLogout();
      }

      // Logout from Keycloak (clears tokens and redirects)
      keycloak.logout();
    };

    logoutUser();
  }, [onLogout]);

  return <LoginInfoPage />;
}

export default Logout;
