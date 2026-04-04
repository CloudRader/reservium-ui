import { useEffect } from 'react';
import { useKeycloak } from '../hooks/useKeycloak';
import PulsatingLoader from '@components/ui/feedback/PulsatingLoader.jsx';
import { ROUTES } from '@config/routes';

const LoginToKeycloak = () => {
  const { keycloak, isInitialized } = useKeycloak();

  useEffect(() => {
    // Wait for Keycloak to be initialized before attempting login
    if (!isInitialized) {
      return;
    }

    // Check if keycloak.login is available
    if (keycloak && typeof keycloak.login === 'function') {
      // Redirect to Keycloak login page
      keycloak.login({
        redirectUri: window.location.origin + ROUTES.LOGINED,
      });
    }
  }, [keycloak, isInitialized]);

  return <PulsatingLoader />;
};

export default LoginToKeycloak;