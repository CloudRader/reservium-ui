import React, {useState} from 'react';
import ReservationForm from './Components/ReservationForm';
import LoginInfoPage from "./LoginInfoPage";
import Logout from "./Logout";
import AdaptiveCalendar from "./Components/AdaptiveCalendar";
import WarningMessage from "./Components/WarningMessage";
import {ErrorMobileModal} from "./Components/ErrorMobileModal";
import PulsatingLoader from "./Components/PulsatingLoader";
import useSubmitLogic from "./hooks/useSubmitLogic";
import Constants from "./Constants";

const ReservationPage = ({isLoggedIn, onLogout, roomCalendarLinks, service}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < Constants.MOBILE_SCREEN_BREAKPOINT);
    const [selectedSlot, setSelectedSlot] = useState(null)
    const {errorMessages,setErrorMessages, handleSubmit, isSubmitting} = useSubmitLogic(service);

    // useEffect(() => {
    //     const handleResize = () => setisMobile(window.innerWidth < SMALL_SCREEN_BREAKPOINT);
    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);

    if (!isLoggedIn) {
        return <LoginInfoPage/>;
    }

    if (errorMessages.auth) {
        return <Logout onLogout={onLogout}/>;
    }

    return (
        <div className="max-w-7xl dark:!bg-slate-400 mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {isSubmitting && <PulsatingLoader/>}
            {isMobile &&
                errorMessages?.general &&
                <ErrorMobileModal
                    onClose={() => setErrorMessages({})}
                    message={errorMessages.general}/>}
            <WarningMessage contactMail={service?.contact_mail} wikiLink={service?.wikiLink}/>
            <div className="flex flex-col lg:flex-row gap-8">
                <ReservationForm
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    calendarIds={service?.calendarIds}
                    reservationTypes={service.reservation_types?.map(name => ({value: name, label: name})) || []}
                    selectedSlot={selectedSlot}
                />
                <div className={`w-full dark:!bg-slate-400 shadow-md overflow-hidden ${isMobile ? 'p-1' : 'p-6'} no-underline`}>
                    <AdaptiveCalendar
                        isMobile={isMobile}
                        googleCalendars={roomCalendarLinks}
                        setSelectedSlot={setSelectedSlot}
                    />
                    {!isMobile &&
                        errorMessages?.general &&
                        <div className="alert alert-danger mt-5">{errorMessages.general}</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ReservationPage;