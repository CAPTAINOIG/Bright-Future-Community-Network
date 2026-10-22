export const initialsOf = (name) =>
  (name || '')
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || '??';

export const getStatusBadge = (isActive) => {
  if (isActive === true) return 'inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full bg-primary-50 text-primary-700 ring-1 ring-inset ring-primary-200';
  return 'inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-200';
};

// Calm, token-driven tints for category/meta pills (evergreen, gold and neutral families).
export const softColor = (seed) => {
  const palette = [
    'bg-primary-50 text-primary-700 border-primary-200',
    'bg-primary-100 text-primary-800 border-primary-200',
    'bg-accent-50 text-accent-700 border-accent-200',
    'bg-accent-100 text-accent-700 border-accent-200',
    'bg-gray-100 text-gray-700 border-gray-200',
    'bg-gray-50 text-gray-600 border-gray-200',
  ];

  let hash = 0;
  const value = String(seed ?? '');

  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }

  return palette[hash % palette.length];
};
