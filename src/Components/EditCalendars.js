import React from 'react';
import EditTable from "./EditTable";

const EditCalendars = ({roomCalendarLinks, serviceName}) => {

    return (
        <EditTable
            name={'Calendars'}
            data={roomCalendarLinks}
            nameAtr={'className'}
            idAtr={'googleCalendarId'}
            editLink={`/edit-calendar/`}
            addLink={`/add-calendar/${serviceName}`}/>
    );
};

export default EditCalendars;