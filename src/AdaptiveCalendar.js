import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import config from "./Config";
import "./styles/GoogleCalendar.css";

function AdaptiveCalendar({ googleCalendars }) {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const eventDidMount = (info) => {
        const event = info.event;

        if (event.title.toLowerCase().includes("not approved")) {
            // Set gray color to event
            // info.el.style.backgroundColor = 'gray';
            info.el.style.borderColor = 'darkgray';
        }

        const startTime = event.start.toLocaleString([], {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric',
            hour12: false
        });

        const endTime = event.end.toLocaleString([], {
            hour: 'numeric', minute: 'numeric',
            hour12: false
        });

        return new bootstrap.Popover(info.el, {
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

    const handleEventClick = (clickInfo) => {
        clickInfo.jsEvent.preventDefault();
    };


    return (
        <div className="calendar-container">
            {isSmallScreen ? (
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, googleCalendarPlugin]}
                    initialView="listWeek"
                    headerToolbar={{
                        start: 'prev,next today',
                        center: 'title',
                        end: 'listWeek',
                    }}
                    views={{
                        listWeek: {
                            buttonText: 'List',
                        },
                    }}
                    height="auto"
                    aspectRatio={1.1}
                    dayMaxEventRows={3}
                    fixedWeekCount={false}
                    firstDay={1}
                    textColor="#212529"
                    googleCalendarApiKey={config.googleCalendarApiKey}
                    eventSources={googleCalendars}
                    eventDidMount={eventDidMount}
                    eventTimeFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        omitZeroMinute: true,
                        hour12: false,
                    }}
                    slotLabelFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        omitZeroMinute: false,
                        meridiem: false,
                        hour12: false,
                    }}
                    eventClick={handleEventClick}
                    navLinks={true}
                />
            ) : (
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, googleCalendarPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        start: 'prev,next today',
                        center: 'title',
                        end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                    }}
                    views={{
                        dayGridMonth: {
                            buttonText: 'Month',
                        },
                        timeGridWeek: {
                            buttonText: 'Week',
                        },
                        timeGridDay: {
                            buttonText: 'Day',
                        },
                        listWeek: {
                            buttonText: 'List',
                        },
                    }}
                    height="auto"
                    aspectRatio={1.1}
                    dayMaxEventRows={3}
                    fixedWeekCount={false}
                    firstDay={1}
                    googleCalendarApiKey={config.googleCalendarApiKey}
                    eventSources={googleCalendars}
                    eventDidMount={eventDidMount}
                    eventTimeFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        omitZeroMinute: true,
                        hour12: false,
                    }}
                    eventTextColor="#212529"
                    slotLabelFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        omitZeroMinute: false,
                        meridiem: false,
                        hour12: false,
                    }}
                    eventClick={handleEventClick}
                    navLinks={true}
                />
            )}
        </div>
    );
}

export default AdaptiveCalendar;
