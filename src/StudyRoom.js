import React from 'react';
import GoogleCalendar from './GoogleCalendar';
import ReservationForm from './ReservationForm';
import LoginInfo from "./LoginInfo";

const StudyRoom = ({isLoggedIn}) => {
    const studyRoomCalendarLink = "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FPrague&bgcolor=%23F6BF26&title=Study%20Room&showCalendars=0&showTz=0&showPrint=0&hl=en&src=Y184ZjA3YTA1NGRjNGNkMDJmODQ4NDkxZmZlZTlhZGIwMzAyNjExODExZTcxMWZmZTkyMWU0MDI1ZDE4ZDQyZWYyQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%238E24AA"


    const formFields = [
        {
            name: 'date',
            type: 'date',
            labelText: 'Date',
            labelColor: 'text-warning',
        },
        {
            name: 'startTime',
            type: 'time',
            labelText: 'Start Time',
            labelColor: 'text-danger',
            validation: (value) => {
                const startTime = new Date();
                startTime.setHours(8, 0, 0, 0);
                return value >= startTime;
            },
        },
        {
            name: 'endTime',
            type: 'time',
            labelText: 'End Time',
            labelColor: 'text-danger',
            validation: (value) => {
                const endTime = new Date();
                endTime.setHours(22, 0, 0, 0);
                return value <= endTime;
            },
        },
        {
            name: 'type',
            type: 'select',
            labelText: 'Type of Reservation',
            labelColor: 'text-primary',
            options: [
                { value: 'entireSpace', label: 'Entire Space' },
                { value: 'projector', label: 'Projector' },
                { value: 'pool', label: 'Pool' },
                { value: 'tableFootball', label: 'Table Football' },
            ],
        },
        {
            name: 'purpose',
            type: 'text',
            labelText: 'Purpose',
            labelColor: 'text-success',
        },
        {
            name: 'guests',
            type: 'number',
            labelText: 'Number of Guests',
            labelColor: 'text-success',
            validation: (value) => value < 40,
        },
        {
            name: 'comment',
            type: 'text',
            labelText: 'Comment',
            labelColor: 'text-success',
        },
    ];


    return (
        <div>
            {isLoggedIn ? ( // if the user is logged in, render the ReservationForm
                <ReservationForm formFields={formFields}/>
            ) : ( // if the user is not logged in, render the LoginInfo
                <LoginInfo/>
            )}
            <GoogleCalendar src={studyRoomCalendarLink}/>
        </div>
    );
};

export default StudyRoom
