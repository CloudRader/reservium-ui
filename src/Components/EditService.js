import React from 'react';
import constants from "../Constants";
import UniversalLayout from "../UniversalLayout";
import useEditableForm from "../hooks/useEditableForm";
import SuccessErrorMessage from "./SuccessErrorMessage";

const EditService = ({ service: initialService }) => {
    const serviceUpdateUrl = `${constants.serverURL}/reservation_services/${initialService.id}`;
    const {
        isEditing,
        editedData,
        message,
        handleEdit,
        handleSave,
        handleCancel,
        handleChange,
        loading,
    } = useEditableForm(initialService, serviceUpdateUrl);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <UniversalLayout centerContent whiteBackGreenContentBackground>
            <h1 className="text-2xl font-bold text-green-800 mb-6">
                {isEditing ? 'Edit' : 'View'} Service: {editedData.name}
            </h1>
            <div className="bg-white p-4 rounded-lg shadow">
                {message && <SuccessErrorMessage message={message} />}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">ID</label>
                    <input
                        type="text"
                        name="id"
                        value={editedData.id}
                        readOnly
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={editedData.name}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                            isEditing ? 'bg-white' : 'bg-gray-100'
                        }`}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Alias</label>
                    <input
                        type="text"
                        name="alias"
                        value={editedData.alias}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                            isEditing ? 'bg-white' : 'bg-gray-100'
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
                            isEditing ? 'bg-white' : 'bg-gray-100'
                        }`}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                    <input
                        type="email"
                        name="contact_mail"
                        value={editedData.contact_mail}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                            isEditing ? 'bg-white' : 'bg-gray-100'
                        }`}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Public</label>
                    <input
                        type="checkbox"
                        name="public"
                        checked={editedData.public}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="mt-1 focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                    />
                </div>
                {/* Add more fields for calendars and mini_services if needed */}
                <div className="mt-6 flex justify-end space-x-3">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleEdit}
                            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Edit Service
                        </button>
                    )}
                </div>
            </div>
        </UniversalLayout>
    );
};

export default EditService;