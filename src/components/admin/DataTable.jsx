import { Table } from 'antd';
import { EmptyState, Loader } from '../ui';

export default function DataTable({
  columns = [],
  data = [],
  keyField = 'id',
  loading = false,
  emptyIcon,
  emptyTitle = 'No records found',
  emptyDescription,
  emptyActionLabel,
  emptyAction,
  className = '',
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  headerRowClassName = '',
  pageSize = 8,
  pagination = true,
  onTableChange,
}) {
  if (loading) return <Loader text="Loading data..." />;

  if (data.length === 0) {
    return (
      <EmptyState
        icon={emptyIcon}
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={emptyActionLabel}
        onAction={emptyAction}
      />
    );
  }

  const tableColumns = columns.map((column) => ({
    ...column,
    dataIndex: column.key,
    title: column.title,
    sorter: column.sortable ? (column.sorter || true) : column.sorter,
    sortDirections: column.sortable ? ['ascend', 'descend'] : undefined,
    render: column.render ? (value, row, index) => column.render(row, index) : undefined,
    className: column.className,
  }));

  const tablePagination = pagination ? {
    pageSize,
    showSizeChanger: true,
    pageSizeOptions: ['8', '16', '32', '64'],
    showQuickJumper: true,
    showTotal: (total, range) => `${range[0]}–${range[1]} of ${total} records`,
    position: ['bottomRight'],
  } : false;

  return (
    <div className={`overflow-hidden rounded-2xl border border-gray-200 bg-white ${className}`}>
      <Table
        rowKey={keyField}
        columns={tableColumns}
        dataSource={data}
        pagination={tablePagination}
        scroll={{ x: 'max-content' }}
        size="middle"
        showSorterTooltip={{ target: 'sorter-icon' }}
        onChange={onTableChange}
        rowClassName={(row) => selectedIds.includes(row[keyField]) ? 'bg-primary-50' : ''}
        rowSelection={selectable ? {
          selectedRowKeys: selectedIds,
          onChange: onSelectionChange,
          columnWidth: 52,
        } : undefined}
        className={headerRowClassName}
      />
      <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-5 py-3 text-xs text-gray-500">
        <span><span className="font-semibold text-gray-700">{data.length}</span> matching record{data.length === 1 ? '' : 's'}</span>
        <span className="hidden sm:inline">Use column headers to sort</span>
      </div>
    </div>
  );
}
