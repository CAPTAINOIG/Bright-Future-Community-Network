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
    <div className={`overflow-hidden rounded-xl border border-[#dfe3d9] bg-white shadow-sm ${className}`}>
      <Table
        rowKey={keyField}
        columns={tableColumns}
        dataSource={data}
        pagination={tablePagination}
        scroll={{ x: 'max-content' }}
        size="middle"
        showSorterTooltip={{ target: 'sorter-icon' }}
        onChange={onTableChange}
        rowClassName={(row) => selectedIds.includes(row[keyField]) ? 'bg-[#edf5ed]' : ''}
        rowSelection={selectable ? {
          selectedRowKeys: selectedIds,
          onChange: onSelectionChange,
          columnWidth: 52,
        } : undefined}
        className={headerRowClassName}
      />
      <div className="flex items-center justify-between border-t border-[#edf0eb] bg-[#fafbf9] px-4 py-3 text-xs text-[#708078]">
        <span><span className="font-semibold text-[#34443a]">{data.length}</span> matching record{data.length === 1 ? '' : 's'}</span>
        <span className="hidden sm:inline">Use column headers to sort</span>
      </div>
    </div>
  );
}
