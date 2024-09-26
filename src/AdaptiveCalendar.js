import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { Popover } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import config from "./Constants";
import styles from "./styles/AdaptiveCalendar.module.css";

const SMALL_SCREEN_BREAKPOINT = 768;

function AdaptiveCalendar({ googleCalendars }) {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < SMALL_SCREEN_BREAKPOINT);

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < SMALL_SCREEN_BREAKPOINT);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const eventDidMount = (info) => {
        const { event, el } = info;

        if (event.title.toLowerCase().includes("not approved")) {
            el.style.cssText = 'border-color: rgb(146, 34, 167); background-color: darkgray';
        }

        const startTime = formatDateTime(event.start);
        const endTime = formatTime(event.end);

        return new Popover(el, {
            title: event.title,
            placement: "auto",
            trigger: "hover",
            customClass: "popoverStyle",
            content: `
                <p><strong>Reservation time:</strong><br>${startTime} - ${endTime}</p>
                <p><strong>Description:</strong><br>${(event.extendedProps.description || 'N/A').replace(/\n/g, '<br>')}</p>
            `,
            html: true,
        });
    };

    const handleEventClick = (clickInfo) => clickInfo.jsEvent.preventDefault();

    const commonCalendarProps = {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, googleCalendarPlugin],
        height: "auto",
        aspectRatio: 1.1,
        dayMaxEventRows: 3,
        fixedWeekCount: false,
        firstDay: 1,
        googleCalendarApiKey: config.googleCalendarApiKey,
        eventSources: googleCalendars,
        eventDidMount,
        eventTimeFormat: { hour: '2-digit', minute: '2-digit', omitZeroMinute: true, hour12: false },
        slotLabelFormat: { hour: '2-digit', minute: '2-digit', omitZeroMinute: false, meridiem: false, hour12: false },
        eventClick: handleEventClick,
        navLinks: true,
    };

    const mobileCalendarProps = {
        ...commonCalendarProps,
        initialView: "listWeek",
        headerToolbar: {
            start: 'prev,next',
            center: 'title',
            end: 'listWeek',
        },
        views: {
            listWeek: { buttonText: 'list'},
        },
    };

    const desktopCalendarProps = {
        ...commonCalendarProps,
        initialView: "dayGridMonth",
        headerToolbar: {
            start: 'prev,next today',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        },
        views: {
            dayGridMonth: { buttonText: 'Month' },
            timeGridWeek: { buttonText: 'Week' },
            timeGridDay: { buttonText: 'Day' },
            listWeek: { buttonText: 'List' },
        },
    };


    return (
        <div className={`${styles['calendar-container']} ${isSmallScreen ? styles['mobile'] : ''}`}>
            <FullCalendar {...(isSmallScreen ? mobileCalendarProps : desktopCalendarProps)} />
        </div> );
}

function formatDateTime(date) {
    return date.toLocaleString([], {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: false
    });
}

function formatTime(date) {
    return date.toLocaleString([], {
        hour: 'numeric', minute: 'numeric',
        hour12: false
    });
}

export default AdaptiveCalendar;