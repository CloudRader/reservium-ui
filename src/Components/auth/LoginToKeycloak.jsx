import { useEffect } from 'react';
import keycloak from './Keycloak';
import PulsatingLoader from '../ui/PulsatingLoader.jsx';

const LoginToKeycloak = () => {
  useEffect(() => {
    // Redirect to Keycloak login page
    keycloak.login({
      redirectUri: window.location.origin + '/logined',
    });
  }, []);

  return <PulsatingLoader />;
};

export default LoginToKeycloak;