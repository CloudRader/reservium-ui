import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EditServices from '../Components/EditServices';
import CreateNewService from '../Components/CreateNewService';
import EditCalendars from '../Components/EditCalendars';
import EditMiniServices from '../Components/EditMiniServices';
import EditService from '../Components/EditService';
import CreateNewCalendar from '../Components/CreateNewCalendar';
import CreateNewMiniService from '../Components/CreateNewMiniService';
import EditMiniService from '../Components/EditMiniService';
import EditCalendar from '../Components/EditCalendar';


// todo DEL make this as condition only for manager and then try to get all data that i need with deleted services and cal and mini serv
export const ManagerRoutes = ({ services, calendars, miniServices }) => (
    <Routes>
        <Route
            path="manager-panel"
            element={<EditServices />} />

        <Route
            path='add-service'
            element={<CreateNewService />} />

        {services && services.map(service => (
            <React.Fragment key={service.linkName}>
                {/* Calendar routes */}
                <Route
                    path={`edit-calendars/${service.linkName}`}
                    element={<EditCalendars
                        serviceId={service.id}
                        serviceName={service.linkName}
                    />}
                />
                <Route
                    path={`add-calendar/${service.linkName}`}
                    element={<CreateNewCalendar
                        serviceId={service.id}
                        serviceCalendars={calendars[service.linkName]}
                    />}
                />

                {/* Mini-service routes */}
                <Route
                    path={`edit-mini-services/${service.linkName}`}
                    element={<EditMiniServices
                        serviceId={service.id}
                        serviceName={service.linkName}
                    />}
                />
                <Route
                    path={`add-mini-service/${service.linkName}`}
                    element={<CreateNewMiniService
                        serviceId={service.id} />}
                />

                {/* Service edit/view routes */}
                <Route
                    path={`view-service/${service.serviceName}`}
                    element={<EditService
                        service={service}
                        isEditMode={false}
                    />}
                />
                <Route
                    path={`edit-service/${service.serviceName}`}
                    element={<EditService
                        service={service}
                        isEditMode={true}
                    />}
                />

                {/* Mini-service edit/view routes */}
                {miniServices[service.linkName]?.map(miniService => (
                    <React.Fragment key={miniService.name}>
                        <Route
                            path={`view-mini-service/${service.linkName}/${miniService.name}`}
                            element={<EditMiniService
                                miniServiceData={miniService}
                                isEditMode={false}
                            />}
                        />
                        <Route
                            path={`edit-mini-service/${service.linkName}/${miniService.name}`}
                            element={<EditMiniService
                                serviceName={service.linkName}
                                miniServiceData={miniService}
                                serviceId={service.id}
                                isEditMode={true}
                            />}
                        />
                    </React.Fragment>
                ))}

                {/* Calendar edit/view routes */}
                {calendars[service.linkName]?.map(calendar => (
                    <React.Fragment key={calendar.className}>
                        <Route
                            path={`view-calendar/${service.linkName}/${calendar.className}`}
                            element={<EditCalendar
                                serviceName={service.linkName}
                                calendarBaseData={calendar}
                                serviceId={service.id}
                                isEditMode={false}
                                serviceCalendars={calendars[service.linkName]}
                            />}
                        />
                        <Route
                            path={`edit-calendar/${service.linkName}/${calendar.className}`}
                            element={<EditCalendar
                                serviceName={service.linkName}
                                calendarBaseData={calendar}
                                serviceId={service.id}
                                isEditMode={true}
                                serviceCalendars={calendars[service.linkName]}
                            />}
                        />
                    </React.Fragment>
                ))}
            </React.Fragment>
        ))}
    </Routes>
); 