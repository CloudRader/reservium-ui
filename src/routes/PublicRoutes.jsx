import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ViewCalendarRoutes } from './ViewCalendarRoutes';
import LoginToKeycloak from '../Components/auth/LoginToKeycloak';
import SuccessPage from '../pages/SuccessPage';
import NotFoundPage from '../pages/NotFoundPage';

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginToKeycloak />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/view/*" element={<ViewCalendarRoutes />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
