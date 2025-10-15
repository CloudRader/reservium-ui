import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({
  currentPage,
  onPageChange,
  hasMore,
  isLoading,
  totalPages,
}) => {
  const maxVisiblePages = 5;
  // Use exact total when provided; otherwise, only expose at most one future page when hasMore
  const effectiveTotalPages =
    typeof totalPages === 'number' && totalPages > 0
      ? totalPages
      : currentPage + (hasMore ? 1 : 0);

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(
      effectiveTotalPages,
      startPage + maxVisiblePages - 1
    );

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 mt-6 mb-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="px-4 py-2 bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 border border-gray-300 dark:border-gray-600 rounded hover:bg-green-50 dark:hover:bg-gray-600 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        ← Previous
      </button>

      {pageNumbers[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            disabled={isLoading}
            className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded hover:bg-green-50 dark:hover:bg-gray-600 transition-colors"
          >
            1
          </button>
          {pageNumbers[0] > 2 && (
            <span className="text-gray-500 dark:text-gray-400">...</span>
          )}
        </>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={isLoading}
          className={`px-4 py-2 border rounded transition-colors ${
            page === currentPage
              ? 'bg-green-600 text-white border-green-600 font-semibold'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-green-50 dark:hover:bg-gray-600'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {page}
        </button>
      ))}

      {pageNumbers[pageNumbers.length - 1] < effectiveTotalPages && (
        <span className="text-gray-500 dark:text-gray-400">...</span>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasMore || isLoading}
        className="px-4 py-2 bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 border border-gray-300 dark:border-gray-600 rounded hover:bg-green-50 dark:hover:bg-gray-600 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        Next →
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  totalPages: PropTypes.number,
};

Pagination.defaultProps = {
  isLoading: false,
};

export default Pagination;
