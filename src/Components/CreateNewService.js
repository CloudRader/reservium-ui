import React, { useEffect } from 'react';
import constants from '../Constants';
import UniversalLayout from "../UniversalLayout";
import SuccessErrorMessage from '../components/SuccessErrorMessage';
import useCreateFormLogic from "../hooks/useCreateFormLogic";

const CreateNewService = () => {
    const {
        formFields,
        formData,
        message,
        setFormFields,
        handleChange,
        handleSubmit,
        renderField,
    } = useCreateFormLogic([], `${constants.serverURL}/reservation_services/create_reservation_service`);

    useEffect(() => {
        setFormFields([
            {
                name: 'name',
                type: 'text',
                labelText: 'Service Name',
                labelColor: 'text-success',
                validation: (value) => !!value,
            },
            {
                name: 'alias',
                type: 'text',
                labelText: 'Alias',
                labelColor: 'text-success',
                validation: (value) => !!value,
            },
            {
                name: 'web',
                type: 'text',
                labelText: 'Web',
                labelColor: 'text-success',
            },
            {
                name: 'contact_mail',
                type: 'email',
                labelText: 'Contact Email',
                labelColor: 'text-success',
                validation: (value) => /\S+@\S+\.\S+/.test(value),
            },
            {
                name: 'public',
                type: 'checkbox',
                sybType: 'oneCheckbox',
                labelText: 'Public',
                labelColor: 'text-success',
                options: [{value: 'true', label: 'True'}],
            },
        ]);
    }, [setFormFields]);

    return (
        <UniversalLayout centerContent whiteBackGreenContentBackground>
            <div className="max-w-2xl w-full bg-gradient-to-r from-green-50 to-green-100 shadow-md p-6 rounded-lg">
                <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
                    Create New Service
                </h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {formFields.map((field) => (
                        <div key={field.name}>
                            <label htmlFor={field.name} className="block text-sm font-medium text-green-700 mb-1">
                                {field.labelText}
                            </label>
                            {renderField(field)}
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Create Service
                    </button>
                </form>

                {message && <SuccessErrorMessage message={message} />}
            </div>
        </UniversalLayout>
    );
};

export default CreateNewService;