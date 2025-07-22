import React, { memo, useCallback, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { Popover } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import constants from "../constants/Constants";
import styles from "../styles/AdaptiveCalendar.module.css";
import moment from "moment";

const AdaptiveCalendar = memo(
  ({ isMobile, googleCalendars, setSelectedSlot }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    const eventDidMount = (info) => {
      const { event, el } = info;

      if (event.title.toLowerCase().includes("not approved")) {
        el.style.cssText =
          "border-color: rgb(146, 34, 167); background-color: darkgray";
      }

      if (event.extendedProps.isSelectedSlot) {
        el.style.cssText =
          "background-color: rgba(0, 128, 255, 0.3); border: 2px solid rgb(0, 128, 255);";
      }

      let startTime = String(constants.default_reservation_start_time) + ":00";
      let endTime = String(constants.default_reservation_end_time) + ":00";

      if (event.start) {
        startTime = formatDateTime(event.start);
        endTime = formatTime(event.end || event.start);
      }

      return new Popover(el, {
        title: event.title,
        placement: "auto",
        trigger: "hover",
        customClass: "popoverStyle",
        content: `
                <p><strong>Reservation time:</strong><br>${startTime} - ${endTime}</p>
                <p><strong>Description:</strong><br>${(
                  event.extendedProps.description || "N/A"
                ).replace(/\n/g, "<br>")}</p>
            `,
        html: true,
      });
    };

    const handleEventClick = (clickInfo) => clickInfo.jsEvent.preventDefault();

    const handleDateSelect = useCallback(
      (selectInfo) => {
        const { start, end } = selectInfo;
        setSelectedSlot({
          start,
          end,
          allDay: selectInfo.allDay,
        });
        setSelectedEvent({
          id: "selected-slot",
          title: "Selected Slot",
          start,
          end,
          allDay: selectInfo.allDay,
          extendedProps: { isSelectedSlot: true },
        });
      },
      [setSelectedSlot]
    );

    const handleDateClick = useCallback(
      (clickInfo) => {
        const selectedDate = moment(clickInfo.date);
        let start, end;

        if (clickInfo.view.type === "dayGridMonth") {
          // For month view, set start to 17:00 and end to 22:00
          start = selectedDate
            .clone()
            .hour(constants.default_reservation_start_time)
            .minute(0)
            .second(0)
            .millisecond(0)
            .toDate();
          end = selectedDate
            .clone()
            .hour(constants.default_reservation_end_time)
            .minute(0)
            .second(0)
            .millisecond(0)
            .toDate();
        } else {
          // For other views, keep the clicked time and add 4 hours
          start = selectedDate.toDate();
          end = selectedDate.add(4, "hours").toDate();
        }

        setSelectedSlot({
          start,
          end,
          allDay: false,
        });
        setSelectedEvent({
          id: "selected-slot",
          title: "Selected Slot",
          start,
          end,
          allDay: false,
          extendedProps: { isSelectedSlot: true },
        });
      },
      [setSelectedSlot]
    );

    const commonCalendarProps = {
      plugins: [
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
        interactionPlugin,
        googleCalendarPlugin,
      ],
      height: "auto",
      aspectRatio: 1.1,
      dayMaxEventRows: 3,
      fixedWeekCount: false,
      firstDay: 1,
      googleCalendarApiKey: constants.googleCalendarApiKey,
      eventSources: [
        ...googleCalendars,
        {
          events: (info, successCallback) => {
            const events = selectedEvent ? [selectedEvent] : [];
            successCallback(events);
          },
        },
      ],
      eventDidMount,
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
      eventClick: handleEventClick,
      navLinks: true,
      dateClick: handleDateClick,
      selectable: true,
      select: handleDateSelect,
    };

    const mobileCalendarProps = {
      ...commonCalendarProps,
      initialView: "listWeek",
      headerToolbar: {
        start: "prev,next",
        center: "title",
        end: "listWeek,timeGridDay",
      },
      views: {
        listWeek: {
          buttonText: "list",
          selectable: false, // Disable selection in list view
          dateClick: handleDateClick, // Enable date clicking in list view
        },
        timeGridDay: {
          buttonText: "day",
          selectable: true, // Enable selection in day view
        },
      },
    };

    const desktopCalendarProps = {
      ...commonCalendarProps,
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
    };

    return (
      <div
        className={`${styles["calendar-container"]} ${
          isMobile ? styles["mobile"] : ""
        }`}
      >
        <FullCalendar
          {...(isMobile ? mobileCalendarProps : desktopCalendarProps)}
        />
      </div>
    );
  }
);

function formatDateTime(date) {
  if (!date) return "N/A";
  return date.toLocaleString([], {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
}
function formatTime(date) {
  if (!date) return "N/A";
  return date.toLocaleString([], {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
}

export default AdaptiveCalendar;
