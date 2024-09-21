import { useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from './hooks/useAuth';

/*
 * This component is get params from url and send it to backend.
 */

export const LoginToBackend = () => {
    const location = useLocation();
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        const state = params.get('state');
        if (code && state) {
            login(code, state);
        } else {
            console.error('Did not get params from IS:');
        }
    }, [location, login, navigate]);

    return null;
};