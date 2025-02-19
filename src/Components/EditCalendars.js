import React from 'react';
import EditTable from "./EditTable";

const EditCalendars = ({ roomCalendarLinks, serviceName }) => {
    return (
        <EditTable
            name={'Calendars'}
            data={roomCalendarLinks}
            nameAtr={'className'}
            idAtr={'googleCalendarId'}
            editLink={`/manager/edit-calendar/${serviceName}/`}
            addLink={`/manager/add-calendar/${serviceName}`}
            viewLink={`/manager/view-calendar/${serviceName}/`}
            deleteLink={`/calendars/`}
        />
    );
};

export default EditCalendars;