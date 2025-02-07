import React from 'react';
import EditTable from "./EditTable";



const EditMiniServices = ({serviceName, miniServices}) => {

    return (
        <EditTable name={'Mini Services'}
                   data={miniServices}
                   nameAtr={'name'}
                   idAtr={'id'}
                   editLink={`/edit-mini-service/${serviceName}/`}
                   addLink={`/add-mini-service/${serviceName}`}
                   />
    );
};

export default EditMiniServices;