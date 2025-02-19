import React from 'react';
import { Route } from 'react-router-dom';
import SamplePage from '../testData/test';
import EditService from '../Components/EditService';
import testService from '../testData/serviceTestData';

export const testRoutes = [
    <Route key="test-manager-table" path="/test-manager-table" element={<SamplePage />} />,
    <Route
        key="test-edit-service"
        path="/test-edit-service"
        element={<EditService service={testService} isEditMode={false} />}
    />
]; 