// import { useEffect } from 'react';
// import {useLocation, useNavigate} from 'react-router-dom';
//
// /*
//  * This component is get params from url and send it to backend.
//  */
//
// export const LoginToBackend = ({login}) => {
//     const location = useLocation();
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         const params = new URLSearchParams(location.search);
//         const code = params.get('code');
//         const state = params.get('state');
//         if (code && state) {
//             login(code, state);
//         } else {
//             console.error('Did not get params from IS:');
//         }
//     }, [location, login, navigate]);
//
//     return null;
// };

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "../../constants";
import axios from 'axios';
import { tokenManager } from "../../utils/tokenManager";

export const LoginToBackend = ({ login }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = tokenManager.getToken();

        if (token) {
            axios
                .post(`${API_BASE_URL}/auth/login`, null)
                .then((response) => {
                    // Backend handles creating/updating user
                    login(response.data);

                    // Clean up query params
                    window.history.replaceState({}, document.title, "/");

                    // Redirect to home
                    navigate("/", { replace: true });
                })
                .catch((err) => {
                    console.error('Backend login failed:', err);
                    navigate('/');
                });
        } else {
            console.error('No token found');
            navigate('/');
        }
    }, [login, navigate]);

    return null;
};