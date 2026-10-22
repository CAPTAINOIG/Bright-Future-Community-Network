const variantStyles = {
  default: 'bg-gray-100 text-gray-700 ring-gray-200',
  success: 'bg-primary-50 text-primary-700 ring-primary-200',
  warning: 'bg-accent-50 text-accent-700 ring-accent-200',
  error: 'bg-red-50 text-red-700 ring-red-200',
  info: 'bg-sky-50 text-sky-800 ring-sky-200',
  primary: 'bg-primary-50 text-primary-700 ring-primary-200',
  accent: 'bg-accent-50 text-accent-700 ring-accent-200',
};

const sizeStyles = { sm: 'px-2 py-0.5 text-[0.68rem]', md: 'px-2.5 py-1 text-xs', lg: 'px-4 py-1.5 text-sm' };

export default function Badge({ children, variant = 'default', size = 'md', className = '' }) {
  return <span className={`inline-flex items-center gap-1.5 font-semibold capitalize rounded-full whitespace-nowrap ring-1 ring-inset ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>{children}</span>;
}

Badge.Status = function StatusBadge({ status }) {
  const variants = { planned: 'info', ongoing: 'warning', completed: 'success', submitted: 'default', 'under review': 'info', discussed: 'warning', 'in progress': 'warning', published: 'success', draft: 'default', upcoming: 'info', past: 'default', active: 'success', inactive: 'default' };
  return <Badge variant={variants[status?.toLowerCase()] || 'default'}>{status}</Badge>;
};
