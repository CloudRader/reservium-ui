import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: window._env_?.VITE_KEYCLOAK_URL || import.meta.env.VITE_KEYCLOAK_URL,
  realm: window._env_?.VITE_KEYCLOAK_REALM || import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: window._env_?.VITE_KEYCLOAK_CLIENT_ID || import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

export default keycloak;
