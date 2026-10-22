import { Link } from 'react-router-dom';
import { Button as AntButton } from 'antd';

const typeMap = { primary: 'primary', secondary: 'default', accent: 'primary', ghost: 'text', white: 'default', danger: 'primary', 'white-outline': 'default' };
const dangerVariants = new Set(['danger']);
const sizeMap = { sm: 'small', md: 'middle', lg: 'large', xl: 'large' };

// Visual treatment per variant, layered over Ant's base button.
const variantClass = {
  primary: '',
  secondary: '!bg-white !text-gray-900 !border-gray-300 hover:!border-primary-600 hover:!text-primary-700',
  accent: '!bg-accent-400 !border-accent-400 !text-primary-900 hover:!bg-accent-300 hover:!border-accent-300',
  ghost: '!text-primary-700 hover:!bg-primary-50',
  white: '!bg-white !text-primary-900 !border-white hover:!bg-accent-50 hover:!border-accent-50',
  'white-outline': '!bg-transparent !text-white !border-white/50 hover:!border-white hover:!bg-white/10',
  danger: '',
};
const sizeClass = { sm: '!px-4', md: '!px-5', lg: '', xl: '!h-14 !px-8 !text-[15px]' };

export default function Button({
  children, variant = 'primary', size = 'md', href, to, type = 'button',
  loading = false, disabled = false, fullWidth = false,
  icon: Icon, iconRight: IconRight, className = '', onClick, ...props
}) {
  const iconSize = size === 'sm' ? 14 : size === 'lg' || size === 'xl' ? 18 : 16;
  const content = <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap">{Icon && <Icon size={iconSize} />}{children}{IconRight && <IconRight size={iconSize} className="transition-transform duration-200 group-hover:translate-x-0.5" />}</span>;
  const buttonProps = {
    htmlType: type, type: typeMap[variant], size: sizeMap[size], loading, disabled,
    danger: dangerVariants.has(variant), block: fullWidth,
    className: `group !inline-flex !items-center !justify-center whitespace-nowrap ${variantClass[variant] || ''} ${sizeClass[size] || ''} ${className}`,
    ...props,
  };

  if (href) return <AntButton {...buttonProps} href={href} target="_blank" rel="noopener noreferrer">{content}</AntButton>;
  if (to) return <Link to={to} className={`no-underline ${fullWidth ? 'block' : 'inline-block'}`} onClick={onClick}><AntButton {...buttonProps}>{content}</AntButton></Link>;
  return <AntButton {...buttonProps} onClick={onClick}>{content}</AntButton>;
}
