import React from 'react';
import {Link} from 'react-router-dom';
import UniversalLayout from "../UniversalLayout";

const EditTable = ({name, data, nameAtr, idAtr, editLink, addLink}) => {

    // TODO rework
    const columHeaders = [
        'Name',
        'Actions',
    ];

    return (
        <UniversalLayout centerContent whiteBackGreenContentBackground headerTittle={name}>
            {/*<h1 className="text-2xl font-bold text-green-800 mb-6">{name}</h1>*/}
            {data.length !== 0 ?
                <table className="w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-green-200 text-green-700">
                    <tr>
                        <th className="py-2 px-4 text-left">
                                    {columHeaders[0]}
                        </th>
                        <th className="py-2 text-center">
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
                            <td className="py-3 px-4 text-center">
                                <Link
                                    to={editLink + rowData[nameAtr]}
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-sm"
                                >
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                :
                <div className="text-center text-green-800 text-xl">There are no mini-services for this service {name}.
                    But you can add it.</div>
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