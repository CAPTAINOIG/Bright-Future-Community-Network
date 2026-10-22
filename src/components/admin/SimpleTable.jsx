
import { useEffect, useMemo, useState } from 'react';
import {
  ChevronUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';

const SimpleTable = ({
  data = [],
  columns = [],
  loading = false,
  pageSize = 10,
  emptyTitle = 'No records found',
  emptyDescription = 'Try adjusting your filters or check back later.',
  keyField = '_id',
}) => {
  const [sorting, setSorting] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);

  const safePageSize = Math.max(1, Number(pageSize) || 10);

  // Reset pagination when the dataset changes.
  useEffect(() => {
    setPageIndex(0);
  }, [data, safePageSize]);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sorting) return data;

    const { key, direction } = sorting;

    return [...data].sort((a, b) => {
      const aVal = a?.[key];
      const bVal = b?.[key];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      let result = 0;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        result = aVal - bVal;
      } else {
        result = String(aVal).localeCompare(
          String(bVal),
          undefined,
          { numeric: true, sensitivity: 'base' }
        );
      }

      return direction === 'asc' ? result : -result;
    });
  }, [data, sorting]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / safePageSize);
  const currentPage = Math.min(
    pageIndex,
    Math.max(0, totalPages - 1)
  );

  const paginatedData = sortedData.slice(
    currentPage * safePageSize,
    (currentPage + 1) * safePageSize
  );

  const startResult =
    sortedData.length === 0 ? 0 : currentPage * safePageSize + 1;

  const endResult = Math.min(
    (currentPage + 1) * safePageSize,
    sortedData.length
  );

  const toggleSort = (columnKey) => {
    if (!columnKey) return;

    setSorting((previous) => {
      if (previous?.key !== columnKey) {
        return { key: columnKey, direction: 'asc' };
      }

      if (previous.direction === 'asc') {
        return { key: columnKey, direction: 'desc' };
      }

      return null;
    });

    setPageIndex(0);
  };

  const getColumnKey = (column) =>
    column.accessorKey || column.id;

  const getCellValue = (column, row) => {
    if (column.cell) {
      return column.cell({ row: { original: row } });
    }

    const key = getColumnKey(column);
    return key ? row?.[key] : null;
  };

  // Loading state
  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5 md:px-6">
          <div className="space-y-2">
            <div className="h-4 w-36 animate-pulse rounded-md bg-gray-100" />
            <div className="h-3 w-52 animate-pulse rounded-md bg-gray-50" />
          </div>
          <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />
        </div>

        <div className="space-y-5 p-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-5"
            >
              <div className="h-9 w-9 shrink-0 animate-pulse rounded-xl bg-gray-100" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-1/3 animate-pulse rounded bg-gray-100" />
                <div className="h-3 w-1/5 animate-pulse rounded bg-gray-50" />
              </div>
              <div className="hidden h-7 w-20 animate-pulse rounded-full bg-gray-100 sm:block" />
              <div className="hidden h-3 w-16 animate-pulse rounded bg-gray-100 md:block" />
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 px-5 py-4 md:px-6">
          <p className="text-xs font-medium text-gray-400">
            Loading your records...
          </p>
        </div>
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
          <InboxIcon className="h-8 w-8 text-primary-600" strokeWidth={1.5} />
        </div>

        <h3 className="text-base font-semibold tracking-tight text-gray-900">
          {emptyTitle}
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[var(--shadow-soft)]">
      {/* Table heading */}
      <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
        <div>
          <h3 className="text-[15px] font-semibold tracking-tight text-gray-900">
            Records
          </h3>
          <p className="mt-0.5 text-[13px] text-gray-500">
            Manage and review your information
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-50 px-3 py-1 ring-1 ring-inset ring-primary-100">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />
          <span className="text-xs font-semibold tabular-nums text-primary-700">
            {sortedData.length.toLocaleString()} records
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-max border-collapse text-left">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((column) => {
                const columnKey = getColumnKey(column);
                const isSorted = sorting?.key === columnKey;

                return (
                  <th
                    key={columnKey}
                    scope="col"
                    className="border-b border-gray-200 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500 sm:px-6"
                  >
                    <div className="flex items-center gap-2">
                      <span className="whitespace-nowrap">
                        {column.header}
                      </span>

                      {column.enableSorting && (
                        <button
                          type="button"
                          onClick={() => toggleSort(columnKey)}
                          aria-label={`Sort by ${column.header}`}
                          aria-pressed={isSorted}
                          className={`inline-flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-600/30 ${
                            isSorted
                              ? 'bg-primary-100 text-primary-700'
                              : 'text-gray-400 hover:bg-gray-100 hover:text-primary-600'
                          }`}
                        >
                          {isSorted ? (
                            sorting.direction === 'asc' ? (
                              <ChevronUpIcon className="h-4 w-4" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4" />
                            )
                          ) : (
                            <ChevronUpDownIcon className="h-4 w-4" />
                          )}
                        </button>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {paginatedData.map((row, rowIndex) => (
              <tr
                key={row?.[keyField] ?? rowIndex}
                className="group transition-colors duration-150 hover:bg-gray-50"
              >
                {columns.map((column) => {
                  const columnKey = getColumnKey(column);

                  return (
                    <td
                      key={columnKey}
                      className="px-5 py-3.5 text-[13px] leading-5 text-gray-700 sm:px-6"
                    >
                      <div className="min-w-0">
                        {getCellValue(column, row)}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="flex flex-col gap-4 border-t border-gray-100 bg-white px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between md:px-6">
        <p className="text-xs leading-5 text-gray-500">
          Showing{' '}
          <span className="font-semibold text-gray-900">
            {startResult}–{endResult}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-gray-900">
            {sortedData.length.toLocaleString()}
          </span>{' '}
          results
        </p>

        <div className="flex items-center justify-between gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => setPageIndex((page) => Math.max(0, page - 1))}
            disabled={currentPage === 0}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 text-xs font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1">
            {Array.from(
              { length: totalPages },
              (_, index) => index
            )
              .filter(
                (index) =>
                  index === 0 ||
                  index === totalPages - 1 ||
                  Math.abs(index - currentPage) <= 1
              )
              .reduce((pages, index, position, visiblePages) => {
                if (
                  position > 0 &&
                  index - visiblePages[position - 1] > 1
                ) {
                  pages.push('ellipsis-' + index);
                }

                pages.push(index);
                return pages;
              }, [])
              .map((page) =>
                typeof page === 'string' ? (
                  <span
                    key={page}
                    className="flex h-9 w-7 items-center justify-center text-xs text-gray-400"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setPageIndex(page)}
                    aria-label={`Go to page ${page + 1}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                    className={`h-9 min-w-9 rounded-full px-2 text-xs font-semibold tabular-nums transition-colors ${
                      currentPage === page
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {page + 1}
                  </button>
                )
              )}
          </div>

          <button
            type="button"
            onClick={() =>
              setPageIndex((page) =>
                Math.min(Math.max(0, totalPages - 1), page + 1)
              )
            }
            disabled={currentPage >= totalPages - 1}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 text-xs font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span>Next</span>
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SimpleTable;