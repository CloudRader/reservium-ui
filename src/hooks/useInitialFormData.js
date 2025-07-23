import { useEffect } from 'react';

const useInitialFormData = (formFields, setFormData) => {
    useEffect(() => {
        const initialData = formFields.reduce((acc, field) => {
            if (field.defaultValue !== undefined && acc[field.name] === undefined) {
                acc[field.name] = field.defaultValue;
            }
            return acc;
        }, {});
        setFormData(initialData);
    }, [formFields, setFormData]);
};

export default useInitialFormData; 