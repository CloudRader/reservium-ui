// Utility functions for useReservationFormLogic

export const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
};

export const validateField = (field, value) => {
    if (field.validation && !field.validation(value)) {
        return `Invalid value for ${field.labelText}`;
    }
    return null;
};

export const preparePayload = (formData) => {
    return {
        start_datetime: `${formData.startDate}T${formData.startTime}`,
        end_datetime: `${formData.endDate}T${formData.endTime}`,
        purpose: formData.purpose,
        guests: parseInt(formData.guests, 10),
        reservation_type: formData.type,
        email: formData.email,
        additional_services: formData.additionalServices || [],
    };
}; 