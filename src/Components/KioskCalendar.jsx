import React, { useCallback, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { Popover } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import constants from "../constants/Constants";
import styles from "../styles/KioskCalendar.module.css";

function KioskCalendar({ googleCalendars }) {
  // Helper functions
  const formatTime = useCallback((date) => {
    if (!date) return "N/A";
    return date.toLocaleString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
  }, []);

  const formatEventSources = useCallback(() => {
    if (!googleCalendars) return [];

    const calendarsArray = Array.isArray(googleCalendars)
      ? googleCalendars
      : [googleCalendars];

    return calendarsArray.map((calendar) => ({
      googleCalendarId: calendar.googleCalendarId,
      className: calendar.className,
      color: calendar.backgroundColor || calendar.borderColor,
      backgroundColor: calendar.backgroundColor,
      borderColor: calendar.borderColor,
    }));
  }, [googleCalendars]);

  // Event handlers
  const handleEventMount = useCallback(
    (info) => {
      const { event, el } = info;

      // Add event styling from AdaptiveCalendar
      if (event.title.toLowerCase().includes("not approved")) {
        el.style.cssText =
          "border-color: rgb(146, 34, 167); background-color: darkgray";
      }

      const startTime = formatTime(event.start);
      const endTime = formatTime(event.end || event.start);

      return new Popover(el, {
        title: event.title,
        placement: "auto",
        trigger: "hover",
        customClass: "popoverStyle",
        content: `
                <p><strong>Time:</strong> ${startTime} - ${endTime}</p>
                <p><strong>Description:</strong><br>${(
                  event.extendedProps.description || "N/A"
                ).replace(/\n/g, "<br>")}</p>
            `,
        html: true,
      });
    },
    [formatTime]
  );

  // Updated calendar configuration
  const calendarProps = useMemo(
    () => ({
      plugins: [
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
        googleCalendarPlugin,
      ],
      height: "100%",
      aspectRatio: 1.1,
      googleCalendarApiKey: constants.googleCalendarApiKey,
      eventSources: formatEventSources(),
      dayMaxEventRows: 3,
      fixedWeekCount: false,
      firstDay: 1,
      eventDidMount: handleEventMount,
      eventTimeFormat: {
        hour: "2-digit",
        minute: "2-digit",
        omitZeroMinute: true,
        hour12: false,
      },
      slotLabelFormat: {
        hour: "2-digit",
        minute: "2-digit",
        omitZeroMinute: false,
        meridiem: false,
        hour12: false,
      },
      allDaySlot: false,
      slotMinTime: "08:00:00",
      slotMaxTime: "24:00:00",
      expandRows: true,
      stickyHeaderDates: true,
      nowIndicator: true,
      navLinks: true,
      initialView: "dayGridMonth",
      headerToolbar: {
        start: "prev,next today",
        center: "title",
        end: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      },
      views: {
        dayGridMonth: { buttonText: "Month" },
        timeGridWeek: { buttonText: "Week" },
        timeGridDay: { buttonText: "Day" },
        listWeek: { buttonText: "List" },
      },
      // Disable interaction features
      selectable: false,
      eventClick: (e) => e.jsEvent.preventDefault(),
    }),
    [formatEventSources, handleEventMount]
  );

  return (
    <div className={styles["kiosk-calendar-container"]}>
      <FullCalendar {...calendarProps} />
    </div>
  );
}

export default React.memo(KioskCalendar);
