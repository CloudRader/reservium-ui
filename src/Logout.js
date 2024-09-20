import React, { useEffect, useState } from 'react';
import axios from "axios";

axios.defaults.withCredentials = true;

function Logout({logout}) {

        useEffect(() => {
            logout();
        }, [logout]);

        return <div>Logging out...</div>;
}

    export default Logout;