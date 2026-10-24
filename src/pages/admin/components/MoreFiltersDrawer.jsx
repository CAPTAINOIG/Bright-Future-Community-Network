import { Button, Select, Tag } from 'antd';
import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import { Drawer } from '../../../components/ui';

const normalizeOption = (option) =>
  typeof option === 'string' ? { value: option, label: option } : option;

/**
 * MoreFiltersDrawer Component
 * A reusable drawer for advanced filtering that works with both Member and Volunteer pages
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the drawer is open
 * @param {Function} props.onClose - Callback when drawer closes
 * @param {Array} props.filters - Array of filter configurations
 * @param {Object} props.filterValues - Current filter values (key-value pairs, 'All' means unset)
 * @param {Function} props.onFilterChange - Callback when a filter value changes
 * @param {Function} props.onReset - Callback to reset all filters
 * @param {string} props.title - Drawer title
 * @param {string} props.subtitle - Drawer subtitle
 * @param {number} props.activeFilterCount - Number of active filters for display
 * @param {number} props.resultCount - Optional number of matching records, shown on the apply button
 * @param {string} props.resultLabel - Noun for the result count (e.g. "members")
 *
 * Filter configuration object should have:
 * {
 *   key: string (unique identifier for the filter)
 *   label: string (display label)
 *   placeholder: string (placeholder text when "All" is selected)
 *   options: Array<string | { value, label }> (available options)
 *   description: string (optional description)
 * }
 */
export const MoreFiltersDrawer = ({
  isOpen,
  onClose,
  filters = [],
  filterValues = {},
  onFilterChange,
  onReset,
  title = 'Advanced Filters',
  subtitle = 'Refine your search with additional filters',
  activeFilterCount = 0,
  resultCount,
  resultLabel = 'results',
}) => {
  const activeFilters = filters
    .map((filter) => {
      const value = filterValues[filter.key];
      if (!value || value === 'All') return null;
      const option = (filter.options || []).map(normalizeOption).find((o) => o.value === value);
      return { key: filter.key, label: filter.label, value: option?.label ?? value };
    })
    .filter(Boolean);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      position="right"
      width={420}
      title={title}
      subtitle={subtitle}
      footer={
        <>
          <Button size="large" icon={<RotateCcw size={16} />} onClick={onReset} disabled={activeFilterCount === 0}>
            Reset
          </Button>
          <Button type="primary" size="large" onClick={onClose}>
            {typeof resultCount === 'number'
              ? `Show ${resultCount.toLocaleString()} ${resultLabel}`
              : 'Apply filters'}
          </Button>
        </>
      }
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-50 text-primary-700">
              <SlidersHorizontal size={16} />
            </span>
            <div>
              <p className="m-0 text-sm font-semibold text-gray-900">
                {activeFilterCount > 0
                  ? `${activeFilterCount} filter${activeFilterCount === 1 ? '' : 's'} applied`
                  : 'No filters applied'}
              </p>
              <p className="m-0 text-xs text-gray-500">Changes apply instantly to the table</p>
            </div>
          </div>
          {activeFilterCount > 0 && (
            <Button type="link" size="small" onClick={onReset} className="px-0!">
              Clear all
            </Button>
          )}
        </div>

        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <Tag
                key={filter.key}
                closable
                onClose={(event) => {
                  event.preventDefault();
                  onFilterChange(filter.key, 'All');
                }}
                className="m-0! rounded-full! border-primary-200! bg-primary-50! px-3! py-1! text-xs! text-primary-700!"
              >
                <span className="text-primary-600/80">{filter.label}:</span>{' '}
                <span className="font-semibold">{filter.value}</span>
              </Tag>
            ))}
          </div>
        )}

        {filters.length > 0 ? (
          <div className="space-y-3">
            {filters.map((filter) => {
              const value = filterValues[filter.key];
              const options = (filter.options || []).map(normalizeOption);

              return (
                <div key={filter.key} className="rounded-2xl border border-gray-200 bg-white p-4">
                  <div className="mb-3 flex items-baseline justify-between gap-3">
                    <label htmlFor={`more-filter-${filter.key}`} className="text-sm font-semibold text-gray-900">
                      {filter.label}
                    </label>
                    <span className="text-xs tabular-nums text-gray-400">
                      {options.length} option{options.length === 1 ? '' : 's'}
                    </span>
                  </div>
                  <Select
                    id={`more-filter-${filter.key}`}
                    size="large"
                    className="w-full"
                    allowClear
                    showSearch={{ optionFilterProp: 'label' }}
                    placeholder={filter.placeholder}
                    value={!value || value === 'All' ? undefined : value}
                    onChange={(next) => onFilterChange(filter.key, next ?? 'All')}
                    options={options}
                    notFoundContent={<span className="text-xs text-gray-500">No options available</span>}
                  />
                  {filter.description && (
                    <p className="mt-2 mb-0 text-xs text-gray-500">{filter.description}</p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No filters available</p>
        )}
      </div>
    </Drawer>
  );
};

export default MoreFiltersDrawer;
