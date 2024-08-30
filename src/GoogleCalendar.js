import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import listPlugin from '@fullcalendar/list';
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import config from "./Config";

function Calendar({ googleCalendars }) {
    const eventDidMount = (info) => {
        const event = info.event;

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
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, googleCalendarPlugin, listPlugin]}
                initialView={'dayGridMonth'}
                headerToolbar={{
                    start: 'today prev,next',
                    center: 'title',
                    end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                }}
                nextDayThreshold='08:00:00'
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
        </div>
    );
}

export default Calendar;