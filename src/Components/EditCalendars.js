import React from 'react';
import EditTable from "./EditTable";

const EditCalendars = ({roomCalendarLinks, serviceName }) => {

    const mockcolumHeaders = [
        'Calendar Id',
        'className',
        'backgroundColor',
        'borderColor',
        'Actions',
    ];

    return (
        <EditTable name={'Calendars'} data={roomCalendarLinks} columHeaders={mockcolumHeaders} editLink={`/edit-calendar/`} addLink={`/add-calendar/${serviceName}`} />
    );
};

export default EditCalendars;