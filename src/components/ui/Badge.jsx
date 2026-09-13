const variantStyles = {
  default: 'bg-gray-100 text-gray-700',
  success: 'bg-green-50 text-green-700',
  warning: 'bg-orange-50 text-orange-600',
  error: 'bg-red-50 text-red-700',
  info: 'bg-blue-50 text-blue-700',
  primary: 'bg-primary-50 text-primary-600',
  accent: 'bg-accent-50 text-accent-600',
};

const sizeStyles = { sm: 'px-2 py-0.5 text-[0.65rem]', md: 'px-3 py-1 text-xs', lg: 'px-4 py-2 text-sm' };

export default function Badge({ children, variant = 'default', size = 'md', className = '' }) {
  return <span className={`inline-flex items-center gap-1 font-semibold capitalize rounded-full whitespace-nowrap ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>{children}</span>;
}

Badge.Status = function StatusBadge({ status }) {
  const variants = { planned: 'info', ongoing: 'warning', completed: 'success', submitted: 'default', 'under review': 'info', discussed: 'warning', 'in progress': 'warning', published: 'success', draft: 'default', upcoming: 'info', past: 'default', active: 'success', inactive: 'default' };
  return <Badge variant={variants[status?.toLowerCase()] || 'default'}>{status}</Badge>;
};
