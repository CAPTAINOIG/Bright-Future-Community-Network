export const getStatusBadge = (status) => {
  const colors = {
    Approved: 'bg-primary-50 text-primary-700 ring-primary-200',
    Pending: 'bg-accent-50 text-accent-700 ring-accent-200',
    Rejected: 'bg-red-50 text-red-700 ring-red-200',
  };
  return `inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full ring-1 ring-inset ${colors[status] ?? 'bg-gray-100 text-gray-600 ring-gray-200'}`;
};

export const initialsOf = (name) =>
  (name || '')
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || '??';
