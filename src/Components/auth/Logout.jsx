import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginInfoPage from "../../pages/LoginInfoPage.jsx";
import { API_BASE_URL } from "../../constants";
import keycloak from "./Keycloak";
import { tokenManager } from "../../utils/tokenManager";

axios.defaults.withCredentials = true;

function Logout({ onLogout }) {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                await keycloak.init({ onLoad: "check-sso", pkceMethod: "S256", checkLoginIframe: false });

                console.log("realm:", keycloak.realm);
                console.log("clientId:", keycloak.clientId);
                console.log("url:", keycloak.url);
                console.log("authServerUrl:", keycloak.authServerUrl);

                // Call backend logout endpoint if needed
                await axios.get(`${API_BASE_URL}/auth/logout`);
            } catch (error) {
                console.error("Error while logging out from backend:", error);
            }

            // Clear frontend token + app state
            tokenManager.clearToken();

            // Update app state
            if (onLogout) onLogout();

            // Logout from Keycloak
            await keycloak.logout({
                redirectUri: window.location.origin, // redirect to home page
            });
        };

        logoutUser();
    }, [onLogout, navigate]);

    return <LoginInfoPage />;
}

export default Logout;
