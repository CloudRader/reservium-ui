import React from 'react';
import { useNavigate } from 'react-router-dom';
import UniversalLayout from '@layouts/UniversalLayout.jsx';
import { API_BASE_URL } from '@constants';
import { API_ENDPOINTS } from '@config/apiEndpoints';
import { ROUTES } from '@config/routes';
import { useEditableForm, useMiniServices } from '../../hooks';
import SuccessErrorMessage from '@components/ui/feedback/SuccessErrorMessage.jsx';
import ActionButtons from '@components/ui/buttons/ActionButtons.jsx';

const FETCH_PARAMS = { include_removed: true };

const EditCalendar = ({
  serviceName,
  calendarBaseData,
  serviceId,
  isEditMode = false,
  serviceCalendars = [],
}) => {
  const navigate = useNavigate();
  // Always fetch with include_removed=true to support viewing soft-deleted calendars
  const calendarFetchUrl = `${API_BASE_URL}${API_ENDPOINTS.CALENDARS.GET_COLLISIONS(calendarBaseData.googleCalendarId)}`;
  const calendarUpdateUrl = `${API_BASE_URL}${API_ENDPOINTS.CALENDARS.UPDATE(calendarBaseData.googleCalendarId)}`;

  // calendarBaseData now includes all backend fields thanks to includeAllFields option
  const initialData = {
    ...calendarBaseData,
    collision_ids:
      calendarBaseData.collision_ids || serviceCalendars.collision_ids || [],
  };

  // Fetch mini services using custom hook
  const { miniServices, isLoading: isLoadingMiniServices } =
    useMiniServices(serviceId);

  const handleSaveSuccess = (savedData) => {
    // Navigate to new URL if reservation_type (className) changed
    if (savedData.reservation_type !== calendarBaseData.className) {
      navigate(
        ROUTES.MANAGER.EDIT_CALENDAR(serviceName, savedData.reservation_type),
        { replace: true }
      );
    }
  };

  const transformData = (data) => {
    return {
      ...data,
      mini_services:
        data.mini_services?.map((ms) =>
          typeof ms === 'object' ? ms.id : ms
        ) || [],
    };
  };

  const {
    loading,
    isEditing,
    editedData,
    message,
    handleEdit,
    handleSave,
    handleCancel,
    handleChange,
    handleRulesChange,
  } = useEditableForm(
    initialData,
    calendarUpdateUrl,
    calendarFetchUrl,
    isEditMode,
    handleSaveSuccess,
    transformData,
    FETCH_PARAMS
  );

  if (loading || isLoadingMiniServices) return <p>Loading...</p>;

  if (!editedData) return <p>No data available</p>;

  // Ensure mini_services is always an array
  if (!editedData.mini_services) {
    editedData.mini_services = [];
  }

  return (
    <UniversalLayout
      centerContent
      whiteBackGreenContentBackground
      headerTittle={`${isEditing ? 'Edit' : 'View'} Calendar: ${serviceName}`}
    >
      <div className="bg-white p-4 rounded-lg shadow">
        {message && <SuccessErrorMessage message={message} />}
        <div className="mb-4">
          <label
            htmlFor="calendar-id"
            className="block text-sm font-medium text-gray-700"
          >
            ID
          </label>
          <input
            id="calendar-id"
            type="text"
            name="id"
            value={editedData.id}
            readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="calendar-color"
            className="block text-sm font-medium text-gray-700"
          >
            Color
          </label>
          <div className="flex items-center space-x-2">
            <input
              id="calendar-color"
              type="color"
              name="color"
              value={editedData.color || '#000000'}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-12 h-12 p-1 rounded-md cursor-pointer"
              aria-label="Color picker"
            />
            <input
              id="calendar-color-text"
              type="text"
              name="color"
              value={editedData.color || ''}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`flex-grow mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                isEditing ? 'bg-white' : 'bg-gray-100'
              }`}
              placeholder="#000000"
              aria-label="Color hex value"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="reservation-type"
            className="block text-sm font-medium text-gray-700"
          >
            Reservation Type
          </label>
          <input
            id="reservation-type"
            type="text"
            name="reservation_type"
            value={editedData.reservation_type}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
              isEditing ? 'bg-white' : 'bg-gray-100'
            }`}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="max-people"
            className="block text-sm font-medium text-gray-700"
          >
            Max People
          </label>
          <input
            id="max-people"
            type="number"
            name="max_people"
            value={editedData.max_people}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
              isEditing ? 'bg-white' : 'bg-gray-100'
            }`}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="more-than-max"
            className="block text-sm font-medium text-gray-700"
          >
            Allow More Than Max People With Permission
          </label>
          <input
            id="more-than-max"
            type="checkbox"
            name="more_than_max_people_with_permission"
            checked={editedData.more_than_max_people_with_permission || false}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Collision With Calendars
          </label>
          <div className="mt-1">
            {serviceCalendars
              ?.filter(
                (calendar) =>
                  calendar.googleCalendarId !==
                  calendarBaseData.googleCalendarId
              )
              .map((calendar) => (
                <div
                  key={calendar.googleCalendarId}
                  className="flex items-center mb-2"
                >
                  <input
                    type="checkbox"
                    id={`collision-calendar-${calendar.googleCalendarId}`}
                    checked={
                      editedData.collision_ids?.includes(
                        calendar.googleCalendarId
                      ) || false
                    }
                    onChange={(e) => {
                      const updatedCollisions = e.target.checked
                        ? [
                            ...(editedData.collision_ids || []),
                            calendar.googleCalendarId,
                          ]
                        : (editedData.collision_ids || []).filter(
                            (id) => id !== calendar.googleCalendarId
                          );
                      handleChange({
                        target: {
                          name: 'collision_ids',
                          value: updatedCollisions,
                        },
                      });
                    }}
                    disabled={!isEditing}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`collision-calendar-${calendar.googleCalendarId}`}
                  >
                    {calendar.className}
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Mini Services
          </label>
          <div className="mt-1">
            {miniServices.length > 0 ? (
              miniServices.map((service) => (
                <div key={service.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`mini-service-${service.id}`}
                    checked={(editedData.mini_services || [])
                      .map((ms) => (typeof ms === 'object' ? ms.id : ms))
                      .includes(service.id)}
                    onChange={(e) => {
                      let updatedMiniServicesIds;
                      if (e.target.checked) {
                        updatedMiniServicesIds = [
                          ...(editedData.mini_services || []).map((ms) =>
                            typeof ms === 'object' ? ms.id : ms
                          ),
                          service.id,
                        ];
                      } else {
                        updatedMiniServicesIds = (
                          editedData.mini_services || []
                        )
                          .map((ms) => (typeof ms === 'object' ? ms.id : ms)) // normalize to IDs
                          .filter((id) => id !== service.id);
                      }
                      handleChange({
                        target: {
                          name: 'mini_services',
                          value: updatedMiniServicesIds,
                        },
                      });
                    }}
                    disabled={!isEditing}
                    className="mr-2"
                  />
                  <label htmlFor={`mini-service-${service.id}`}>
                    {service.name}
                  </label>
                </div>
              ))
            ) : (
              <p>No mini services available</p>
            )}
          </div>
        </div>
        {['club_member_rules', 'active_member_rules', 'manager_rules'].map(
          (ruleType) =>
            editedData[ruleType] && (
              <div key={ruleType} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  {ruleType.replace(/_/g, ' ').charAt(0).toUpperCase() +
                    ruleType.replace(/_/g, ' ').slice(1)}
                </h3>
                {Object.entries(editedData[ruleType]).map(([key, value]) => {
                  const fieldId = `${ruleType}-${key}`;
                  return (
                    <div key={key} className="mb-2">
                      <label
                        htmlFor={fieldId}
                        className="block text-sm font-medium text-gray-700"
                      >
                        {key.replace(/_/g, ' ')}
                      </label>
                      {key === 'night_time' ? (
                        <input
                          id={fieldId}
                          type="checkbox"
                          checked={value === true}
                          onChange={(e) =>
                            handleRulesChange(ruleType, key, e.target.checked)
                          }
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      ) : key === 'max_reservation_hours' ? (
                        <input
                          id={fieldId}
                          type="number"
                          value={value}
                          onChange={(e) =>
                            handleRulesChange(
                              ruleType,
                              key,
                              parseInt(e.target.value) || 0
                            )
                          }
                          readOnly={!isEditing}
                          className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                            isEditing ? 'bg-white' : 'bg-gray-100'
                          }`}
                        />
                      ) : typeof value === 'boolean' ? (
                        <input
                          id={fieldId}
                          type="checkbox"
                          checked={value}
                          onChange={(e) =>
                            handleRulesChange(ruleType, key, e.target.checked)
                          }
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      ) : (
                        <input
                          id={fieldId}
                          type="number"
                          value={value}
                          onChange={(e) =>
                            handleRulesChange(
                              ruleType,
                              key,
                              parseInt(e.target.value) || 0
                            )
                          }
                          readOnly={!isEditing}
                          className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                            isEditing ? 'bg-white' : 'bg-gray-100'
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )
        )}

        <div className="mt-6 flex justify-end space-x-3">
          <ActionButtons
            isEditing={isEditing}
            onSave={handleSave}
            onCancel={handleCancel}
            onEdit={handleEdit}
            editText="Edit Calendar"
            isDeleted={calendarBaseData.deleted_at !== null}
          />
        </div>
      </div>
    </UniversalLayout>
  );
};

export default EditCalendar;
