import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, Eye } from 'lucide-react';

const TableActions = ({ item, viewLink, editLink, onDelete, nameAtr, idAtr, isMobile }) => {
    const baseButtonClasses = "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";

    return (
        <div className={`flex flex-wrap gap-2 ${isMobile ? 'justify-start' : 'justify-center'}`}>
            <Link
                to={`${viewLink}${item[nameAtr]}`}
                className={`${baseButtonClasses} bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 ${isMobile ? 'w-full' : ''}`}
            >
                <Eye className="w-4 h-4 mr-1" />
                View
            </Link>
            <Link
                to={`${editLink}${item[nameAtr]}`}
                className={`${baseButtonClasses} bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 ${isMobile ? 'w-full' : ''}`}
            >
                <Pencil className="w-4 h-4 mr-1" />
                Edit
            </Link>
            <button
                onClick={() => onDelete(item[idAtr], false)}
                className={`${baseButtonClasses} bg-red-400 hover:bg-red-500 focus:ring-red-500 ${isMobile ? 'w-full' : ''}`}
            >
                <Trash2 className="w-4 h-4 mr-1" />
                Soft Delete
            </button>
            <button
                onClick={() => onDelete(item[idAtr], true)}
                className={`${baseButtonClasses} bg-red-600 hover:bg-red-700 focus:ring-red-500 ${isMobile ? 'w-full' : ''}`}
            >
                <Trash2 className="w-4 h-4 mr-1" />
                Hard Delete
            </button>
        </div>
    );
};

TableActions.propTypes = {
    item: PropTypes.object.isRequired,
    viewLink: PropTypes.string.isRequired,
    editLink: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    nameAtr: PropTypes.string.isRequired,
    idAtr: PropTypes.string.isRequired,
    isMobile: PropTypes.bool.isRequired
};

export default TableActions; 