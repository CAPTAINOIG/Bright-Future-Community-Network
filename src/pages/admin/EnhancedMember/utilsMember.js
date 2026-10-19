export const initialsOf = (name) =>
  (name || '')
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || '??';

  export const getStatusBadge = (isActive) => {
    if (isActive === true) return 'px-3 py-1 text-xs font-medium rounded-full border bg-green-100 text-green-800 border-green-200';
    return 'px-3 py-1 text-xs font-medium rounded-full border bg-gray-100 text-gray-800 border-gray-200';
  };

export const softColor = (seed) => {
  const palette = [
    // Green — success, active, growth
    'bg-[#d9ece0] text-[#427456] border-[#c4dfcd]',
    'bg-[#e2f0e5] text-[#276749] border-[#c6e2ce]',
    'bg-[#d1fae5] text-[#065f46] border-[#a7f3d0]',

    // Purple & violet — premium, creative
    'bg-[#e6e1f4] text-[#564189] border-[#d4cbec]',
    'bg-[#ede9fe] text-[#6d28d9] border-[#ddd6fe]',
    'bg-[#f3e8ff] text-[#7e22ce] border-[#e9d5ff]',

    // Orange & amber — attention, pending
    'bg-[#f8e5d6] text-[#8a5a2b] border-[#f1cfb2]',
    'bg-[#fef3c7] text-[#92400e] border-[#fde68a]',
    'bg-[#ffedd5] text-[#9a3412] border-[#fed7aa]',

    // Blue — information, professional
    'bg-[#dce8f7] text-[#2f5a8e] border-[#c2d7f0]',
    'bg-[#dbeafe] text-[#1e40af] border-[#bfdbfe]',
    'bg-[#e0f2fe] text-[#075985] border-[#bae6fd]',
    'bg-[#e0e7ff] text-[#3730a3] border-[#c7d2fe]',

    // Red & rose — errors, urgent items
    'bg-[#f7e0e0] text-[#8f3a3a] border-[#efc6c6]',
    'bg-[#ffe4e6] text-[#9f1239] border-[#fecdd3]',
    'bg-[#fce7f3] text-[#9d174d] border-[#fbcfe8]',

    // Olive & lime — balanced, natural
    'bg-[#eaf4d7] text-[#556b2f] border-[#d7e9bb]',
    'bg-[#ecfccb] text-[#3f6212] border-[#d9f99d]',

    // Teal — modern, refined
    'bg-[#ccfbf1] text-[#115e59] border-[#99f6e4]',
    'bg-[#dff5f2] text-[#0f766e] border-[#bce8e2]',

    // Cyan — fresh, technical
    'bg-[#cffafe] text-[#155e75] border-[#a5f3fc]',

    // Slate — neutral, executive
    'bg-[#e2e8f0] text-[#334155] border-[#cbd5e1]',
    'bg-[#f1f5f9] text-[#475569] border-[#e2e8f0]',

    // Stone — understated and mature
    'bg-[#f5f5f4] text-[#57534e] border-[#e7e5e4]',

    // Brown — warm, earthy
    'bg-[#f3e8df] text-[#78543d] border-[#e5d2c2]',
  ];

  let hash = 0;
  const value = String(seed ?? '');

  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }

  return palette[hash % palette.length];
};
