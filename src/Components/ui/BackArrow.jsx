import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackArrow = ({ className = '' }) => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <button
            onClick={goBack}
            className={`p-2 rounded-full text-green-600 hover:bg-green-100 transition-colors duration-200 ${className}`}
            aria-label="Go back"
        >
            <ArrowLeft size={24} />
        </button>
    );
};

export default BackArrow;