import { useEffect } from 'react';

const useInitialFormData = (formFields, setFormData, formData) => {
    useEffect(() => {
        const initialData = formFields.reduce((acc, field) => {
            if (field.defaultValue !== undefined && (formData?.[field.name] === undefined)) {
                acc[field.name] = field.defaultValue;
            }
            return acc;
        }, {});
        if (Object.keys(initialData).length > 0) {
            setFormData(prev => ({ ...prev, ...initialData }));
        }
    }, []);
};

export default useInitialFormData; 