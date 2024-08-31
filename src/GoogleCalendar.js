import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import listPlugin from '@fullcalendar/list';
import { Popover } from '@/components/ui/popover';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import config from "./Config";

const Calendar = ({ googleCalendars }) => {
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

        return (
            <Popover>
                <PopoverTrigger asChild>
                    <div>{info.el}</div>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <h3 className="font-bold mb-2">{event.title}</h3>
                    <p className="mb-2"><strong>Reservation time:</strong><br />{startTime} - {endTime}</p>
                    <p><strong>Description:</strong><br />{(event.extendedProps.description || 'N/A').split('\n').map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}</p>
                </PopoverContent>
            </Popover>
        );
    };

    const handleEventClick = (clickInfo) => {
        clickInfo.jsEvent.preventDefault();
    };

    return (
        <div className="h-full w-full mx-auto font-sans text-black">
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
                className="fc-theme-standard"
            />
        </div>
    );
}

export default Calendar;