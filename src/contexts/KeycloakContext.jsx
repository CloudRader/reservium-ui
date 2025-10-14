import { createContext, useContext, useEffect, useState } from 'react';
import keycloak from '../Components/auth/Keycloak';

const KeycloakContext = createContext(null);

export const KeycloakProvider = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    keycloak
      .init({
        onLoad: 'check-sso',
        pkceMethod: 'S256',
        checkLoginIframe: false,
        silentCheckSsoRedirectUri:
          window.location.origin + '/silent-check-sso.html',
      })
      .then((auth) => {
        setAuthenticated(auth);
        setInitialized(true);

        if (auth) {
          // Token refresh is handled automatically before requests in axios interceptor
          // This ensures token is only refreshed when needed (lazy refresh pattern)
          keycloak.onTokenExpired = () => {
            console.warn('Token expired, will refresh on next request');
          };
        }
      })
      .catch((error) => {
        console.error('Keycloak initialization failed:', error);
        setInitialized(true);
      });
  }, []);

  const value = {
    keycloak,
    initialized,
    authenticated,
    login: () => keycloak.login(),
    logout: () => keycloak.logout({ redirectUri: window.location.origin }),
  };

  return (
    <KeycloakContext.Provider value={value}>
      {children}
    </KeycloakContext.Provider>
  );
};

export const useKeycloak = () => {
  const context = useContext(KeycloakContext);
  if (!context) {
    throw new Error('useKeycloak must be used within KeycloakProvider');
  }
  return context;
};
