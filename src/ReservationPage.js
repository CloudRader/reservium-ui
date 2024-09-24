import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import ReservationForm from './ReservationForm2';
import LoginInfoPage from "./LoginInfoPage";
import Logout from "./Logout";
import config from "./Config";
import AdaptiveCalendar from "./AdaptiveCalendar";
import {useNavigate} from "react-router-dom";
import {useMutation} from 'react-query';
import WarningMessage from "./WarningMessage";
import {ErrorMobileModal} from "./ErrorMobileModal";
import PulsatingLoader from "./Components/PulsatingLoader";

axios.defaults.withCredentials = true;

const ReservationPage = ({ isLoggedIn, onLogout, roomCalendarLinks, service}) => {
    const [errorMessages, setErrorMessages] = useState({});
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const mutation = useMutation(
        (formData) => axios.post(`${config.serverURL}/events/create_event`, formData),
        {
            onSuccess: (response) => {
                if (response.status === 201) {
                    navigate('/success', {
                        state: {
                            ...response.data,
                            contactMail: service.contact_mail,
                            wikiLink: service.wikiLink
                        }
                    });
                    setErrorMessages({});
                } else {
                    handleError({general: `Cannot create a reservation. ${response.data.message}`});
                }
            },
            onError: (error) => {
                const errorMessage = error.response?.status === 401
                    ? {auth: 'Authentication failed. Please log out and log in again.'}
                    : {general: 'Cannot create a reservation, try again later.'};
                handleError(errorMessage);
            }
        }
    );

    const handleSubmit = useCallback((formData) => {
        mutation.mutate(formData);
    }, [mutation]);

    const handleError = useCallback((errorMessage) => {
        setErrorMessages(errorMessage);
        if (isMobile && errorMessage.general) setIsModalOpen(true);
    }, [isMobile]);


    if (!isLoggedIn) {
        return <LoginInfoPage />;
    }

    if (errorMessages.auth) {
        return <Logout onLogout={onLogout} />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <WarningMessage contactMail={service?.contact_mail} wikiLink={service?.wikiLink}/>
            <div className="flex flex-col lg:flex-row gap-8">
                <ReservationForm
                    onSubmit={handleSubmit}
                    isSubmitting={mutation.isLoading}
                    calendarIds={service.calendarIds}
                    reservationTypes={service.reservation_types?.map(name => ({value: name, label: name})) || []}
                />
                <div className="w-full bg-white shadow-md overflow-hidden p-6 no-underline">
                    <AdaptiveCalendar googleCalendars={roomCalendarLinks}/>
                    {!isMobile &&
                        errorMessages.general &&
                        <div className="alert alert-danger mt-5">{errorMessages.general}</div>
                    }
                </div>
            </div>
            {mutation.isLoading && <PulsatingLoader/>}
            { isModalOpen ?
                <ErrorMobileModal
                onClose={() => setIsModalOpen(false)}
                message={errorMessages.general}/>
            : null
            }
        </div>
    );
};

export default ReservationPage;