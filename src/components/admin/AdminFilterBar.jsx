import { Button, Input, Select, Space } from 'antd';
import { Download, Search, SlidersHorizontal } from 'lucide-react';

/** Consistent Ant Design search, filter, and export controls for admin collections. */
export default function AdminFilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search records...',
  filters = [],
  onExport,
  extra,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-5">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <Input
          allowClear
          size="large"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
          prefix={<Search size={18} className="text-gray-400" />}
          className="min-w-0 flex-1"
        />
        <Space wrap size={[12, 12]}>
          {filters.map((filter) => (
            <Select
              key={filter.key}
              size="large"
              value={filter.value}
              onChange={filter.onChange}
              className="min-w-40"
              aria-label={filter.label}
              options={filter.options.map((option) => typeof option === 'string' ? { value: option, label: option === 'All' ? `All ${filter.label}` : option } : option)}
            />
          ))}
          {extra}
          {onExport && <Button size="large" icon={<Download size={17} />} onClick={onExport}>Export</Button>}
          {filters.length > 2 && <Button size="large" type="text" icon={<SlidersHorizontal size={17} />} aria-label="More filters" />}
        </Space>
      </div>
    </div>
  );
}
