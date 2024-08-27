import React from 'react';
import GoogleCalendar from './GoogleCalendar';
import ReservationForm from './ReservationForm';
import LoginInfo from "./LoginInfo";

const Grill = ({isLoggedIn}) => {
    const clubRoomCalendarLink = "https://calendar.google.com/calendar/embed?src=c_19586a3da50ca06566ef62012d6829ebf4e3026108212e9f9d0cc2fc6bc7c44a%40group.calendar.google.com&ctz=Europe%2FPrague"


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
            <GoogleCalendar src={clubRoomCalendarLink}/>
            {isLoggedIn ? ( // if the user is logged in, render the ReservationForm
                <ReservationForm formFields={formFields}/>
            ) : ( // if the user is not logged in, render the LoginInfo
                <LoginInfo/>
            )}
        </div>
    );
};

export default Grill;
