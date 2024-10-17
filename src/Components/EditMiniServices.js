import React from 'react';
import EditTable from "./EditTable";



const EditMiniServices = ({serviceName, miniServices}) => {

    const mockcolumHeaders = [
        'Id',
        'Name',
        'Reservation_service_id',
        'Actions',
    ];

    return (
        <EditTable name={'Mini Services'}
                   data={miniServices}
                   columHeaders={mockcolumHeaders}
                   editLink={`/edit-mini-service/`}
                   addLink={`/add-mini-service/${serviceName}`}
                   />
    );
};

export default EditMiniServices;