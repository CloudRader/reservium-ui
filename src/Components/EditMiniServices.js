import React, { useState, useEffect } from 'react';
import EditTable from "./EditTable";



const EditMiniServices = ({serviceName, miniServices}) => {

    const mockcolumHeaders = [
        'Calendar Id',
        'className',
        'backgroundColor',
        'borderColor',
    ];

    return (
        <EditTable name={'Mini Services'} data={miniServices} columHeaders={mockcolumHeaders} editLink={`/edit-mini-service/`} addLink={`/add-mini-service/${serviceName}`} />
    );
};

export default EditMiniServices;