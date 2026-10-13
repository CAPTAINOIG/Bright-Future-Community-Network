import { useState } from 'react';
import { ChevronUpDownIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export default function SimpleTable({
  data = [],
  columns = [],
  loading = false,
  pageSize = 10,
  emptyTitle = 'No data found',
  emptyDescription = 'Try adjusting your filters.',
  keyField = '_id',
}) {
  const [sorting, setSorting] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);

  // Handle sorting
  const sortedData = sorting
    ? [...data].sort((a, b) => {
        const aVal = a[sorting.key];
        const bVal = b[sorting.key];
        
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        
        if (typeof aVal === 'string') {
          return sorting.direction === 'asc'
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        
        return sorting.direction === 'asc' ? aVal - bVal : bVal - aVal;
      })
    : data;

  // Handle pagination
  const paginatedData = sortedData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
  const totalPages = Math.ceil(sortedData.length / pageSize);

  const toggleSort = (columnKey) => {
    if (sorting?.key === columnKey) {
      setSorting(
        sorting.direction === 'asc'
          ? { key: columnKey, direction: 'desc' }
          : null
      );
    } else {
      setSorting({ key: columnKey, direction: 'asc' });
    }
    setPageIndex(0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 mb-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-[#427456]"></div>
          </div>
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
            <svg
              className="h-8 w-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-900">{emptyTitle}</p>
          <p className="text-xs text-gray-600 mt-1">{emptyDescription}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {columns.map((column) => (
                <th
                  key={column.accessorKey || column.id}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  <div className="flex items-center gap-2">
                    <span>{column.header}</span>
                    {column.enableSorting && (
                      <button
                        onClick={() => toggleSort(column.accessorKey || column.id)}
                        className="inline-flex items-center justify-center p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        {sorting?.key === (column.accessorKey || column.id) ? (
                          sorting.direction === 'asc' ? (
                            <ChevronUpIcon className="h-4 w-4 text-[#427456]" />
                          ) : (
                            <ChevronDownIcon className="h-4 w-4 text-[#427456]" />
                          )
                        ) : (
                          <ChevronUpDownIcon className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr
                key={row[keyField] || rowIndex}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {columns.map((column) => (
                  <td
                    key={column.accessorKey || column.id}
                    className="px-6 py-4 text-sm text-gray-900"
                  >
                    {column.cell ? column.cell({ row: { original: row } }) : row[column.accessorKey]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Page <span className="font-semibold">{pageIndex + 1}</span> of{' '}
          <span className="font-semibold">{totalPages || 1}</span>
          {' | '}
          <span className="font-semibold">{paginatedData.length}</span> results
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPageIndex(Math.max(0, pageIndex - 1))}
            disabled={pageIndex === 0}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => setPageIndex(Math.min(totalPages - 1, pageIndex + 1))}
            disabled={pageIndex >= totalPages - 1}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
