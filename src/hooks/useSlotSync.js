import { useEffect } from 'react';

const useSlotSync = (selectedSlot, setFormData) => {
    useEffect(() => {
        if (selectedSlot) {
            const start = new Date(selectedSlot.start);
            const end = new Date(selectedSlot.end);
            const pad = (n) => n.toString().padStart(2, '0');
            setFormData(prev => ({
                ...prev,
                startDate: `${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}`,
                startTime: `${pad(start.getHours())}:${pad(start.getMinutes())}`,
                endDate: `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}`,
                endTime: `${pad(end.getHours())}:${pad(end.getMinutes())}`,
            }));
        }
    }, [selectedSlot, setFormData]);
};

export default useSlotSync; 