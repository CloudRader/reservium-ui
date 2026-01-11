import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ManagerRoute } from '@features/auth';
import {
  EditServices,
  CreateNewService,
  EditCalendars,
  EditMiniServices,
  EditService,
  CreateNewCalendar,
  CreateNewMiniService,
  EditMiniService,
  EditCalendar,
} from '@features/managerPanel';
import { ROUTE_SEGMENTS } from '@config/routes';

export const ManagerRoutes = ({ services, calendars, miniServices }) => {
  return (
    <ManagerRoute>
      <Routes>
        <Route
          path={ROUTE_SEGMENTS.MANAGER.SERVICES}
          element={<EditServices />}
        />
        <Route
          path={ROUTE_SEGMENTS.MANAGER.ADD_SERVICE}
          element={<CreateNewService />}
        />

        {services &&
          services.map((service) => (
            <React.Fragment key={service.linkName}>
              {/* Calendar routes */}
              <Route
                path={`${ROUTE_SEGMENTS.MANAGER.EDIT_CALENDARS}/${service.linkName}`}
                element={
                  <EditCalendars
                    serviceId={service.id}
                    serviceName={service.linkName}
                  />
                }
              />
              <Route
                path={`${ROUTE_SEGMENTS.MANAGER.ADD_CALENDAR}/${service.linkName}`}
                element={
                  <CreateNewCalendar
                    serviceId={service.id}
                    serviceCalendars={calendars[service.linkName]}
                  />
                }
              />

              {/* Mini-service routes */}
              <Route
                path={`${ROUTE_SEGMENTS.MANAGER.EDIT_MINI_SERVICES}/${service.linkName}`}
                element={
                  <EditMiniServices
                    serviceId={service.id}
                    serviceName={service.linkName}
                  />
                }
              />
              <Route
                path={`${ROUTE_SEGMENTS.MANAGER.ADD_MINI_SERVICE}/${service.linkName}`}
                element={<CreateNewMiniService serviceId={service.id} />}
              />

              {/* Service edit/view routes */}
              <Route
                path={`${ROUTE_SEGMENTS.MANAGER.VIEW_SERVICE}/${service.serviceName}`}
                element={<EditService service={service} isEditMode={false} />}
              />
              <Route
                path={`${ROUTE_SEGMENTS.MANAGER.EDIT_SERVICE}/${service.serviceName}`}
                element={<EditService service={service} isEditMode={true} />}
              />

              {/* Mini-service edit/view routes */}
              {miniServices[service.linkName]?.map((miniService) => (
                <React.Fragment key={miniService.name}>
                  <Route
                    path={`${ROUTE_SEGMENTS.MANAGER.VIEW_MINI_SERVICE}/${service.linkName}/${miniService.name}`}
                    element={
                      <EditMiniService
                        miniServiceData={miniService}
                        isEditMode={false}
                      />
                    }
                  />
                  <Route
                    path={`${ROUTE_SEGMENTS.MANAGER.EDIT_MINI_SERVICE}/${service.linkName}/${miniService.name}`}
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
                    path={`${ROUTE_SEGMENTS.MANAGER.VIEW_CALENDAR}/${service.linkName}/${calendar.className}`}
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
                    path={`${ROUTE_SEGMENTS.MANAGER.EDIT_CALENDAR}/${service.linkName}/${calendar.className}`}
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
};

export default ManagerRoutes;
