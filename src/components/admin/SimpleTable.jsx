
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
      <div className="overflow-hidden rounded-2xl border border-[#e5eae5] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#edf0eb] px-6 py-5">
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

        <div className="border-t border-[#edf0eb] px-6 py-4">
          <p className="text-xs font-medium text-[#829087]">
            Loading your records...
          </p>
        </div>
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#dce5dc] bg-white px-6 py-12 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#edf5ed]">
          <InboxIcon className="h-8 w-8 text-[#427456]" strokeWidth={1.5} />
        </div>

        <h3 className="text-base font-semibold tracking-tight text-[#17231d]">
          {emptyTitle}
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-[#829087]">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e3e9e2] bg-white shadow-[0_4px_24px_rgba(23,35,29,0.035)]">
      {/* Table heading */}
      <div className="flex flex-col gap-3 border-b border-[#e9eee8] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-[#17231d]">
            Records
          </h3>
          <p className="mt-1 text-xs text-[#829087]">
            Manage and review your information
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#dce9dd] bg-[#f1f7f0] px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#427456]" />
          <span className="text-xs font-semibold tabular-nums text-[#315e3e]">
            {sortedData.length.toLocaleString()} records
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-max border-collapse text-left">
          <thead>
            <tr className="bg-[#f8faf7]">
              {columns.map((column) => {
                const columnKey = getColumnKey(column);
                const isSorted = sorting?.key === columnKey;

                return (
                  <th
                    key={columnKey}
                    scope="col"
                    className="border-b border-[#e8ede7] px-5 py-4 text-[10px] font-bold uppercase tracking-[0.12em] text-[#718077] sm:px-6"
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
                          className={`inline-flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#427456]/30 ${
                            isSorted
                              ? 'bg-[#e5f0e5] text-[#315e3e]'
                              : 'text-[#a0aaa2] hover:bg-[#edf2eb] hover:text-[#427456]'
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

          <tbody className="divide-y divide-[#edf0eb]">
            {paginatedData.map((row, rowIndex) => (
              <tr
                key={row?.[keyField] ?? rowIndex}
                className="group transition-colors duration-150 hover:bg-[#f7faf6]"
              >
                {columns.map((column) => {
                  const columnKey = getColumnKey(column);

                  return (
                    <td
                      key={columnKey}
                      className="px-5 py-[18px] text-[13px] leading-5 text-[#46564b] sm:px-6"
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
      <div className="flex flex-col gap-4 border-t border-[#e8ede7] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-xs leading-5 text-[#829087]">
          Showing{' '}
          <span className="font-semibold text-[#34483a]">
            {startResult}–{endResult}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-[#34483a]">
            {sortedData.length.toLocaleString()}
          </span>{' '}
          results
        </p>

        <div className="flex items-center justify-between gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => setPageIndex((page) => Math.max(0, page - 1))}
            disabled={currentPage === 0}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#e0e7df] bg-white px-3 text-xs font-semibold text-[#46564b] transition-all hover:border-[#b8cdb9] hover:bg-[#f7faf6] disabled:cursor-not-allowed disabled:opacity-40"
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
                    className="flex h-9 w-7 items-center justify-center text-xs text-[#829087]"
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
                    className={`h-9 min-w-9 rounded-lg px-2 text-xs font-semibold transition-all ${
                      currentPage === page
                        ? 'bg-[#244b34] text-white shadow-sm'
                        : 'text-[#718077] hover:bg-[#f0f5ef] hover:text-[#244b34]'
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
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#e0e7df] bg-white px-3 text-xs font-semibold text-[#46564b] transition-all hover:border-[#b8cdb9] hover:bg-[#f7faf6] disabled:cursor-not-allowed disabled:opacity-40"
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