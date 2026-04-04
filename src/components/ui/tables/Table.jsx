import React from 'react';
import PropTypes from 'prop-types';

/**
 * Universal table component with responsive card view support
 * @param {Object} props
 * @param {Array} props.data - Array of data items to display
 * @param {Array} props.columns - Column configuration array
 * @param {Function} props.renderMobileCard - Function to render mobile card view
 * @param {boolean} props.isMobile - Whether to show mobile card view
 * @param {string} props.emptyMessage - Message to show when no data
 * @param {string} props.className - Additional CSS classes
 */
const Table = ({
  data,
  columns,
  renderMobileCard,
  isMobile = false,
  emptyMessage = 'No data to display.',
  className = '',
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-green-600 text-center py-8">
          {emptyMessage}
        </p>
      </div>
    );
  }

  if (isMobile && renderMobileCard) {
    return (
      <div className="space-y-3">
        {data.map((item, index) => renderMobileCard(item, index))}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-green-100">
          {/* Column widths */}
          {columns.some((col) => col.width) && (
            <colgroup>
              {columns.map((col, index) => (
                <col key={index} style={{ width: col.width }} />
              ))}
            </colgroup>
          )}

          {/* Table header */}
          <thead className="bg-green-200">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table body */}
          <tbody className="bg-white divide-y divide-green-100">
            {data.map((item, rowIndex) => (
              <tr
                key={item.id || rowIndex}
                className="hover:bg-green-50"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={col.cellClassName || 'px-6 py-4 whitespace-nowrap'}
                  >
                    {col.render ? col.render(item, rowIndex) : item[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      header: PropTypes.string.isRequired,
      width: PropTypes.string,
      cellClassName: PropTypes.string,
      render: PropTypes.func,
    })
  ).isRequired,
  renderMobileCard: PropTypes.func,
  isMobile: PropTypes.bool,
  emptyMessage: PropTypes.string,
  className: PropTypes.string,
};

export default Table;
