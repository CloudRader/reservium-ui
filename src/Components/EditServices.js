import React from 'react';
import EditTable from "./EditTable";

const EditServices = ({services}) => {

    const mockcolumHeaders = [
        'Id',
        'Name',
        'Reservation_service_id',
        'Actions',
    ];

    return (
        <EditTable name={'Services'}
                   data={services}
                   columHeaders={mockcolumHeaders}
                   editLink={`/edit-service/`}
                   addLink={`/add-service/`}
        />
    );
};
export default EditServices;