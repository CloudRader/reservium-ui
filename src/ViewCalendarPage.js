import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import ReservationForm from './Components/ReservationForm';
import LoginInfoPage from "./LoginInfoPage";
import Logout from "./Logout";
import constants from "./Constants";
import AdaptiveCalendar from "./Components/AdaptiveCalendar";
import {useNavigate} from "react-router-dom";
import {useMutation} from 'react-query';
import WarningMessage from "./Components/WarningMessage";
import {ErrorMobileModal} from "./Components/ErrorMobileModal";
import PulsatingLoader from "./Components/PulsatingLoader";
import {mockGoogleCalendars} from "./tests/mockCalendars";
import KioskCalendar from "./KioskCalendar";

const CalendarView = ({roomCalendarLinks}) => {

    return (
        <div className={`w-full dark:!bg-slate-400 shadow-md overflow-hidden p-6 no-underline`}>
            <KioskCalendar googleCalendars={mockGoogleCalendars} />
        </div>
    );
};

export default CalendarView;