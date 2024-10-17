import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UniversalLayout from "../UniversalLayout";
import EditTable from "./EditTable";

const EditCalendars = ({roomCalendarLinks, serviceName }) => {
    // const [calendars, setCalendars] = useState([]);
    // const { serviceId } = useParams();

    // useEffect(() => {
    //     // Fetch calendars data here
    //     // For now, we'll use mock data
    //     const mockCalendars = [
    //         { id: '1', reservation_type: 'Type A',},
    //         { id: '2', reservation_type: 'Type B', },
    //         { id: '3', reservation_type: 'Type C', },
    //     ];
    //
    //     setCalendars(mockCalendars);
    // }, []);

    const mockcolumHeaders = [
        'Calendar Id',
        'className',
        'backgroundColor',
        'borderColor',
    ];


    return (
        <EditTable name={'Calendars'} data={roomCalendarLinks} columHeaders={mockcolumHeaders} editLink={`/edit-calendar/`} addLink={`/add-calendar/${serviceName}`} />
    );
};

export default EditCalendars;