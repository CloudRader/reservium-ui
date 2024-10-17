import React, { useEffect, useState, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { Popover } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import constants from "../Constants";
import styles from "../styles/KioskCalendar.module.css";
import moment from 'moment';

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

function KioskCalendar({ googleCalendars }) {
    const [currentView, setCurrentView] = useState('timeGridDay');

    useEffect(() => {
        // Request fullscreen
        document.documentElement.requestFullscreen().catch(err => console.log(err));

        // Prevent exiting fullscreen
        const handleKeyDown = (e) => {
            if (e.key === 'F11' || e.key === 'Escape') {
                e.preventDefault();
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        // Auto-refresh calendar
        const refreshInterval = setInterval(() => {
            // Force re-render of FullCalendar
            setCurrentView(prev => prev === 'timeGridDay' ? 'timeGridDay2' : 'timeGridDay');
        }, REFRESH_INTERVAL);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            clearInterval(refreshInterval);
        };
    }, []);

    const eventDidMount = (info) => {
        const { event, el } = info;

        let startTime = formatTime(event.start);
        let endTime = formatTime(event.end || event.start);

        return new Popover(el, {
            title: event.title,
            placement: "auto",
            trigger: "hover",
            customClass: "popoverStyle",
            content: `
                <p><strong>Time:</strong> ${startTime} - ${endTime}</p>
                <p><strong>Description:</strong><br>${(event.extendedProps.description || 'N/A').replace(/\n/g, '<br>')}</p>
            `,
            html: true,
        });
    };

    const calendarProps = {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, googleCalendarPlugin],
        // initialView: currentView,
        height: "90vh",
        // headerToolbar: false,
        googleCalendarApiKey: constants.googleCalendarApiKey,
        eventSources: googleCalendars,
        dayMaxEventRows: 3,
        fixedWeekCount: false,
        firstDay: 1,
        eventDidMount,
        eventTimeFormat: { hour: '2-digit', minute: '2-digit', omitZeroMinute: true, hour12: false },
        slotLabelFormat: { hour: '2-digit', minute: '2-digit', omitZeroMinute: false, meridiem: false, hour12: false },
        allDaySlot: false,
        slotMinTime: "08:00:00",
        slotMaxTime: "24:00:00",
        expandRows: true,
        stickyHeaderDates: true,
        nowIndicator: true,
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
        <div className={styles['kiosk-calendar-container']}>
            <FullCalendar {...calendarProps} />
        </div>
    );
}

function formatTime(date) {
    if (!date) return 'N/A';
    return date.toLocaleString([], {
        hour: 'numeric', minute: 'numeric',
        hour12: false
    });
}

export default KioskCalendar;