import React from 'react';
import { Link } from 'react-router-dom';
import UniversalLayout from "../UniversalLayout";
import { Pencil, Trash2, Eye } from 'lucide-react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const EditTable = ({ name, data, nameAtr, idAtr, editLink, addLink, viewLink }) => {
    // TODO rework
    const columHeaders = [
        'Name',
        'Actions',
    ];

    const handleDelete = async (serviceId, hardRemove = false) => {
        if (hardRemove) {
            // Show confirmation dialog for hard delete
            const confirmed = window.confirm("Are you sure you want to permanently delete this item? This action cannot be undone.");
            if (!confirmed) return;
        }

        try {
            const response = await axios.delete(`/reservation_services/${serviceId}`, {
                params: { hard_remove: hardRemove },
            });

            if (response.status === 200) {
                // Refresh the page or update the state after successful deletion
                window.location.reload();
            }
        } catch (error) {
            console.error('Failed to delete service:', error);
            alert(`Failed to ${hardRemove ? 'permanently ' : ''}delete service. Please try again.`);
        }
    };


    return (
        <UniversalLayout centerContent headerTittle={name}>
            {data.length !== 0 ?
                <table className="w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-green-200 text-green-700">
                        <tr>
                            <th className="py-2 px-4 text-left w-1/4">
                                {columHeaders[0]}
                            </th>
                            <th className="py-2 px-4 text-center w-1/4">
                                {columHeaders[1]}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((rowData) => (
                            <tr key={rowData[idAtr]} className="border-b border-green-100 hover:bg-green-50">
                                <td key={rowData[nameAtr]} className="py-3 px-4 text-green-700">
                                    {rowData[nameAtr]}
                                </td>
                                <td className="py-3 px-4 pl-3 text-center">
                                    <div className="flex justify-center gap-2">
                                        <Link
                                            to={viewLink + rowData[nameAtr]}
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                        >
                                            <Eye className="w-4 h-4 mr-1" />
                                            View
                                        </Link>
                                        <Link
                                            to={editLink + rowData[nameAtr]}
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                                        >
                                            <Pencil className="w-4 h-4 mr-1" />
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(rowData[idAtr], false)}
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" />
                                            Soft Delete
                                        </button>
                                        <button
                                            onClick={() => handleDelete(rowData[idAtr], true)}
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" />
                                            Hard Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                :
                <div className="text-center text-green-800 text-xl">
                    There are no mini-services for this service {name}.
                    But you can add it.
                </div>
            }
            <div className="mt-6">
                <Link
                    to={addLink}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Add New {name}
                </Link>
            </div>
        </UniversalLayout>
    );
};

export default EditTable;