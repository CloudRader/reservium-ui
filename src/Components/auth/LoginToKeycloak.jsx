import { useEffect } from "react";
import keycloak from "./Keycloak";
import PulsatingLoader from "../ui/PulsatingLoader.jsx";
import { tokenManager } from "../../utils/tokenManager";

const LoginToKeycloak = () => {

    useEffect(() => {
        keycloak
            .init({
                onLoad: "login-required",   // immediately require login
                checkLoginIframe: true,
                pkceMethod: "S256",
            })
            .then(
                (auth) => {
                    if (!auth) {
                        window.location.reload();
                    } else {

                        /* http client will use this header in every request it sends */
                        // httpClient.defaults.headers.common[
                        //     "Authorization"
                        //     ] = `Bearer ${keycloak.token}`;
                        tokenManager.setToken(keycloak.token);
                        window.location.replace("/logined");

                        keycloak.onTokenExpired = () => {
                            console.log("token expired");
                        };
                    }
                },
                () => {
                    /* Notify the user if necessary */
                    console.error("Authentication Failed");
                }
            );
    }, []);

    return <PulsatingLoader />;
};

export default LoginToKeycloak;