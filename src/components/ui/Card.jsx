import { Link } from 'react-router-dom';
import { Card as AntCard, Image as AntImage } from 'antd';

export default function Card({ children, variant = 'default', to, href, className = '', ...props }) {
  const base = 'overflow-hidden !rounded-xl border-gray-200 transition-all duration-300';
  const hoverEffects = variant === 'flat' ? '' : 'hover:-translate-y-1 hover:shadow-xl';
  const elevated = variant === 'elevated' ? 'border-0 shadow-sm' : '';
  const classes = [base, hoverEffects, elevated, className].filter(Boolean).join(' ');

  const content = <AntCard className={classes} hoverable={variant !== 'flat'} styles={{ body: { padding: 0 } }} {...props}>{children}</AntCard>;
  if (to) return <Link to={to} className="block cursor-pointer text-inherit no-underline">{content}</Link>;
  if (href) return <a href={href} className="block text-inherit no-underline" target="_blank" rel="noopener noreferrer">{content}</a>;
  return content;
}

Card.Image = function CardImage({ src, alt, variant = '', className = '', ...props }) {
  const aspect = variant === 'square' ? 'aspect-square' : variant === 'tall' ? 'aspect-[3/4]' : 'aspect-[16/10]';
  return <AntImage src={src} alt={alt} preview className={`w-full ${aspect} object-cover block ${className}`} {...props} />;
};

Card.Body = function CardBody({ children, size = '', className = '', ...props }) {
  const padding = size === 'lg' ? 'px-8 py-6' : 'p-5';
  return <div className={`${padding} ${className}`} {...props}>{children}</div>;
};

Card.Tag = function CardTag({ children, className = '' }) {
  return <span className={`inline-block text-xs font-semibold uppercase tracking-widest text-primary-600 mb-2 ${className}`}>{children}</span>;
};

Card.Title = function CardTitle({ children, as: Tag = 'h3', to, className = '' }) {
  return <Tag className={`text-lg font-bold text-gray-900 mb-2 leading-snug ${className}`}>{to ? <Link to={to} className="text-inherit no-underline hover:text-primary-600">{children}</Link> : children}</Tag>;
};

Card.Text = function CardText({ children, className = '' }) {
  return <p className={`text-sm text-gray-600 leading-relaxed mb-4 last:mb-0 ${className}`}>{children}</p>;
};

Card.Meta = function CardMeta({ children, className = '' }) {
  return <div className={`flex items-center gap-3 text-xs text-gray-500 mt-4 pt-4 border-t border-gray-200 ${className}`}>{children}</div>;
};

Card.MetaItem = function CardMetaItem({ children, icon: Icon, className = '' }) {
  return <span className={`flex items-center gap-1 ${className}`}>{Icon && <Icon size={14} />}{children}</span>;
};

Card.Footer = function CardFooter({ children, className = '' }) {
  return <div className={`px-5 py-4 border-t border-gray-200 flex items-center justify-between ${className}`}>{children}</div>;
};
