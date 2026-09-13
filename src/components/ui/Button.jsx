import { Link } from 'react-router-dom';
import { Button as AntButton } from 'antd';

const typeMap = { primary: 'primary', secondary: 'default', accent: 'primary', ghost: 'primary', white: 'default', danger: 'primary', 'white-outline': 'default' };
const dangerVariants = new Set(['danger']);
const sizeMap = { sm: 'small', md: 'middle', lg: 'large', xl: 'large' };

export default function Button({
  children, variant = 'primary', size = 'md', href, to, type = 'button',
  loading = false, disabled = false, fullWidth = false,
  icon: Icon, iconRight: IconRight, className = '', onClick, ...props
}) {
  const iconSize = size === 'sm' ? 14 : size === 'lg' || size === 'xl' ? 20 : 16;
  const content = <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap">{Icon && <Icon size={iconSize} />}{children}{IconRight && <IconRight size={iconSize} />}</span>;
  const buttonProps = { htmlType: type, type: typeMap[variant], size: sizeMap[size], loading, disabled, danger: dangerVariants.has(variant), block: fullWidth, className: `!inline-flex !items-center !justify-center whitespace-nowrap ${className}`, ...props };

  if (href) return <AntButton {...buttonProps} href={href} target="_blank" rel="noopener noreferrer">{content}</AntButton>;
  if (to) return <Link to={to} className="no-underline"><AntButton {...buttonProps}>{content}</AntButton></Link>;
  return <AntButton {...buttonProps} onClick={onClick}>{content}</AntButton>;
}
