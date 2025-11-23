import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManagerRoute from '../Components/auth/ManagerRoute';
import EditServices from '../Components/managerPanel/EditServices.jsx';
import CreateNewService from '../Components/managerPanel/CreateNewService.jsx';
import EditCalendars from '../Components/managerPanel/EditCalendars.jsx';
import EditMiniServices from '../Components/managerPanel/EditMiniServices.jsx';
import EditService from '../Components/managerPanel/EditService.jsx';
import CreateNewCalendar from '../Components/managerPanel/CreateNewCalendar.jsx';
import CreateNewMiniService from '../Components/managerPanel/CreateNewMiniService.jsx';
import EditMiniService from '../Components/managerPanel/EditMiniService.jsx';
import EditCalendar from '../Components/managerPanel/EditCalendar.jsx';

export const ManagerRoutes = ({ services, calendars, miniServices }) => (
  <ManagerRoute>
    <Routes>
      <Route path="manager-panel" element={<EditServices />} />
      <Route path="add-service" element={<CreateNewService />} />

      {services &&
        services.map((service) => (
          <React.Fragment key={service.linkName}>
            {/* Calendar routes */}
            <Route
              path={`edit-calendars/${service.linkName}`}
              element={
                <EditCalendars
                  serviceId={service.id}
                  serviceName={service.linkName}
                />
              }
            />
            <Route
              path={`add-calendar/${service.linkName}`}
              element={
                <CreateNewCalendar
                  serviceId={service.id}
                  serviceCalendars={calendars[service.linkName]}
                />
              }
            />

            {/* Mini-service routes */}
            <Route
              path={`edit-mini-services/${service.linkName}`}
              element={
                <EditMiniServices
                  serviceId={service.id}
                  serviceName={service.linkName}
                />
              }
            />
            <Route
              path={`add-mini-service/${service.linkName}`}
              element={<CreateNewMiniService serviceId={service.id} />}
            />

            {/* Service edit/view routes */}
            <Route
              path={`view-service/${service.serviceName}`}
              element={<EditService service={service} isEditMode={false} />}
            />
            <Route
              path={`edit-service/${service.serviceName}`}
              element={<EditService service={service} isEditMode={true} />}
            />

            {/* Mini-service edit/view routes */}
            {miniServices[service.linkName]?.map((miniService) => (
              <React.Fragment key={miniService.name}>
                <Route
                  path={`view-mini-service/${service.linkName}/${miniService.name}`}
                  element={
                    <EditMiniService
                      miniServiceData={miniService}
                      isEditMode={false}
                    />
                  }
                />
                <Route
                  path={`edit-mini-service/${service.linkName}/${miniService.name}`}
                  element={
                    <EditMiniService
                      serviceName={service.linkName}
                      miniServiceData={miniService}
                      serviceId={service.id}
                      isEditMode={true}
                    />
                  }
                />
              </React.Fragment>
            ))}

            {/* Calendar edit/view routes */}
            {calendars[service.linkName]?.map((calendar) => (
              <React.Fragment key={calendar.className}>
                <Route
                  path={`view-calendar/${service.linkName}/${calendar.className}`}
                  element={
                    <EditCalendar
                      serviceName={service.linkName}
                      calendarBaseData={calendar}
                      serviceId={service.id}
                      isEditMode={false}
                      serviceCalendars={calendars[service.linkName]}
                    />
                  }
                />
                <Route
                  path={`edit-calendar/${service.linkName}/${calendar.className}`}
                  element={
                    <EditCalendar
                      serviceName={service.linkName}
                      calendarBaseData={calendar}
                      serviceId={service.id}
                      isEditMode={true}
                      serviceCalendars={calendars[service.linkName]}
                    />
                  }
                />
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
    </Routes>
  </ManagerRoute>
);
