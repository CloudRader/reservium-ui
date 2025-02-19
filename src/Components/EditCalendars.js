import React from 'react';
import EditTable from "./EditTable";

const EditCalendars = ({ roomCalendarLinks, serviceName }) => {
    return (
        <EditTable
            name={'Calendars'}
            data={roomCalendarLinks}
            nameAtr={'className'}
            idAtr={'googleCalendarId'}
            editLink={`/edit-calendar/${serviceName}/`}
            addLink={`/add-calendar/${serviceName}`}
            viewLink={`/view-calendar/${serviceName}/`}
            deleteLink={`/calendars/`}
        />
    );
};

export default EditCalendars;