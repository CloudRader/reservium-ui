import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SamplePage from '../tests/testData/test';
import EditService from '../Components/managerPanel/EditService.jsx';
import testService from '../tests/testData/serviceTestData';

export const TestRoutes = () => (
    <Routes>
        <Route path="test-manager-table" element={<SamplePage />} />
        <Route
            path="test-edit-service"
            element={<EditService service={testService} isEditMode={false} />}
        />
    </Routes>
); 