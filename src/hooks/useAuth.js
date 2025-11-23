import { useKeycloak } from './useKeycloak';

/**
 * useAuth hook - simplified to just consume KeycloakContext
 * All auth logic is now in KeycloakContext
 */
export const useAuth = () => {
  return useKeycloak();
};
