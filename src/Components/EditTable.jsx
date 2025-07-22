import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import UniversalLayout from "../layouts/UniversalLayout";
import TableActions from "./TableActions";
import axios from "axios";
import constants from "../constants/Constants";

axios.defaults.withCredentials = true;

const EditTable = ({
  name,
  data,
  nameAtr,
  idAtr,
  editLink,
  addLink,
  viewLink,
  deleteLink,
  retrieveLink,
  columns = ["Name", "Actions"],
  refetch,
}) => {
  const handleRetrieve = async (itemId) => {
    try {
      const response = await axios.put(
        `${constants.serverURL}${retrieveLink}${itemId}`
      );
      if (response.status === 200) {
        await refetch();
      }
    } catch (error) {
      console.error("Failed to retrieve item:", error);
    }
  };

  const handleDelete = async (itemId, hardRemove = false) => {
    if (hardRemove) {
      const confirmed = window.confirm(
        "Are you sure you want to permanently delete this item? This action cannot be undone."
      );
      if (!confirmed) return;
    }

    try {
      const response = await axios.delete(
        `${constants.serverURL}${deleteLink}${itemId}?hard_remove=${hardRemove}`
      );

      if (response.status === 200) {
        await refetch();
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
      alert(
        `Failed to ${
          hardRemove ? "permanently " : ""
        }delete item. Please try again.`
      );
    }
  };

  const EmptyState = () => (
    <div className="text-center p-8 bg-white rounded-lg shadow-sm">
      <p className="text-green-800 text-xl mb-4">
        No {name.toLowerCase()} found
      </p>
      <p className="text-green-600 mb-4">
        Click the button below to add your first {name.toLowerCase()}
      </p>
    </div>
  );

  // Desktop version
  const DesktopTable = () => (
    <table className="hidden md:table w-full bg-white rounded-lg overflow-hidden">
      <thead className="bg-green-200">
        <tr>
          <th className="w-1/3 py-3 px-6 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
            {columns[0]}
          </th>
          <th className="w-2/3 py-3 px-6 text-center text-xs font-medium text-green-700 uppercase tracking-wider">
            {columns[1]}
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-green-100">
        {data.map((rowData) => (
          <tr
            key={rowData[idAtr]}
            className={`${
              rowData.deleted_at !== null ? "bg-gray-300" : ""
            } hover:bg-green-50`}
          >
            <td className="py-4 px-6 text-sm text-green-700">
              {rowData[nameAtr]}
            </td>
            <td className="py-4 px-6">
              <div className="flex justify-center">
                <TableActions
                  item={rowData}
                  viewLink={viewLink}
                  editLink={editLink}
                  onDelete={handleDelete}
                  onRetrieve={handleRetrieve}
                  nameAtr={nameAtr}
                  idAtr={idAtr}
                  isMobile={false}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // Mobile version
  const MobileTable = () => (
    <div className="md:hidden space-y-4">
      {data.map((rowData) => (
        <div key={rowData[idAtr]} className="bg-white rounded-lg shadow-sm p-4">
          <div className="font-medium text-green-700 text-lg mb-3">
            {rowData[nameAtr]}
          </div>
          <TableActions
            item={rowData}
            viewLink={viewLink}
            editLink={editLink}
            onDelete={handleDelete}
            onRetrieve={handleRetrieve}
            nameAtr={nameAtr}
            idAtr={idAtr}
            isMobile={true}
          />
        </div>
      ))}
    </div>
  );

  return (
    <UniversalLayout centerContent headerTittle={name}>
      <div className="w-full">
        {data.length > 0 ? (
          <>
            <DesktopTable />
            <MobileTable />
          </>
        ) : (
          <EmptyState />
        )}
      </div>
      <div className="mt-6">
        <Link
          to={addLink}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
        >
          Add New {name}
        </Link>
      </div>
    </UniversalLayout>
  );
};

EditTable.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  nameAtr: PropTypes.string.isRequired,
  idAtr: PropTypes.string.isRequired,
  editLink: PropTypes.string.isRequired,
  addLink: PropTypes.string.isRequired,
  viewLink: PropTypes.string.isRequired,
  deleteLink: PropTypes.string.isRequired,
  retrieveLink: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string),
  refetch: PropTypes.func.isRequired,
};

export default EditTable;
