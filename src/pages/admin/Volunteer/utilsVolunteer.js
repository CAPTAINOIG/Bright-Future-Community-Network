export const getStatusBadge = (status) => {
  const colors = {
    Approved: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Rejected: 'bg-red-100 text-red-800',
  };
  return `px-2 py-1 text-xs font-medium rounded-full ${colors[status] ?? 'bg-gray-100 text-gray-800'}`;
};

export const initialsOf = (name) =>
  (name || '')
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || '??';
