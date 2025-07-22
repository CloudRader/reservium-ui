import React from "react";
import constants from "../constants/Constants";
import UniversalLayout from "../layouts/UniversalLayout";
import useEditableForm from "../hooks/useEditableForm";
import SuccessErrorMessage from "./ui/SuccessErrorMessage";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import ActionButtons from "./ui/ActionButtons";

const EditService = ({ service: initialService, isEditMode = false }) => {
  const navigate = useNavigate();
  const serviceUpdateUrl = `${constants.serverURL}/reservation_services/${initialService.id}`;

  // Transform initial service data to match form field names
  const transformedInitialService = {
    name: initialService.serviceName,
    alias: initialService.linkName,
    web: initialService.wikiLink,
    contact_mail: initialService.contact_mail,
    public: initialService.public,
    lockers_id: initialService.lockers_id,
    access_group: initialService.access_group || "",
    room_id: initialService.room_id || null,
  };

  const {
    isEditing,
    editedData,
    message,
    handleEdit,
    handleSave,
    handleCancel,
    handleChange,
    loading,
  } = useEditableForm(
    transformedInitialService,
    serviceUpdateUrl,
    null,
    isEditMode
  );

  const handleNavigation = (path) => () =>
    navigate(`/manager/${path}/${editedData.alias}`);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UniversalLayout
      centerContent
      whiteBackGreenContentBackground
      headerTittle={`${isEditing ? "Edit" : "View"} Service: ${
        initialService.serviceName
      }`}
    >
      <div className="bg-white p-4 rounded-lg shadow">
        {message && <SuccessErrorMessage message={message} />}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={editedData.name}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Alias
          </label>
          <input
            type="text"
            name="alias"
            value={editedData.alias}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Web</label>
          <input
            type="text"
            name="web"
            value={editedData.web}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Contact Email
          </label>
          <input
            type="email"
            name="contact_mail"
            value={editedData.contact_mail}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Public
          </label>
          <input
            type="checkbox"
            name="public"
            checked={editedData.public}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Lockers IDs (comma-separated)
          </label>
          <input
            type="text"
            name="lockers_id"
            value={editedData.lockers_id}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            placeholder="Enter locker IDs separated by commas (e.g., 1, 2, 3)"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Access Group
          </label>
          <input
            type="text"
            name="access_group"
            value={editedData.access_group}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Room ID
          </label>
          <input
            type="number"
            name="room_id"
            value={editedData.room_id || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <ActionButtons
            isEditing={isEditing}
            onSave={handleSave}
            onCancel={handleCancel}
            onEdit={handleEdit}
            isDeleted={initialService.deleted_at !== null}
            additionalButtons={
              <>
                <Button
                  variant="blue"
                  onClick={handleNavigation("edit-calendars")}
                >
                  Calendars
                </Button>
                <Button
                  variant="purple"
                  onClick={handleNavigation("edit-mini-services")}
                >
                  Mini Services
                </Button>
              </>
            }
          />
        </div>
      </div>
    </UniversalLayout>
  );
};

export default EditService;
