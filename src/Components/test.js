import React, { useState } from 'react';
import UniversalLayout from '../UniversalLayout';
import EditTable from './EditTable';

const SamplePage = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const sampleData = [
        { id: 1, name: 'Mini Service 1' },
        { id: 2, name: 'Mini Service 2' },
        { id: 3, name: 'Mini Service 3' },
    ];

    return (
            <div >

                <EditTable
                    name="Mini Service"
                    data={sampleData}
                    nameAtr="name"
                    idAtr="id"
                    editLink="/edit-mini-service"
                    addLink="/add-mini-service"
                />
            </div>
    );
};

export default SamplePage;