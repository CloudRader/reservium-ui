import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SamplePage from '@tests/testData/test';
import { EditService } from '@features/managerPanel';
import testService from '@tests/testData/serviceTestData';
import { ROUTE_SEGMENTS } from '@config/routes';

export const TestRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTE_SEGMENTS.TEST.MANAGER_TABLE} element={<SamplePage />} />
      <Route
        path={ROUTE_SEGMENTS.TEST.EDIT_SERVICE}
        element={<EditService service={testService} isEditMode={false} />}
      />
    </Routes>
  );
};

export default TestRoutes; 