import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "https://auth.buk.cvut.cz", // change to your Keycloak base URL
    realm: "buk.cvut.cz",             // change to your realm
    clientId: "reservation-frontend-app",      // change to your clientId
});

export default keycloak;