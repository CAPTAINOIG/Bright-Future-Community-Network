import { Link } from 'react-router-dom';
import { Card as AntCard, Image as AntImage } from 'antd';

export default function Card({ children, variant = 'default', to, href, className = '', ...props }) {
  const base = 'group/card overflow-hidden !rounded-[20px] !border-gray-200 transition-all duration-300';
  const hoverEffects = variant === 'flat' ? '' : 'hover:-translate-y-1 hover:!shadow-[var(--shadow-lift)] hover:!border-gray-300';
  const elevated = variant === 'elevated' ? '!shadow-[var(--shadow-soft)]' : '';
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
  const padding = size === 'lg' ? 'px-8 py-7' : 'p-6';
  return <div className={`${padding} ${className}`} {...props}>{children}</div>;
};

Card.Tag = function CardTag({ children, className = '' }) {
  return <span className={`inline-block text-[11px] font-bold uppercase tracking-[0.14em] text-accent-600 mb-3 ${className}`}>{children}</span>;
};

Card.Title = function CardTitle({ children, as: Tag = 'h3', to, className = '' }) {
  return <Tag className={`font-serif text-[1.35rem] text-gray-900 mb-2 leading-snug ${className}`}>{to ? <Link to={to} className="text-inherit no-underline hover:text-primary-600">{children}</Link> : children}</Tag>;
};

Card.Text = function CardText({ children, className = '' }) {
  return <p className={`text-[15px] text-gray-600 leading-relaxed mb-4 last:mb-0 ${className}`}>{children}</p>;
};

Card.Meta = function CardMeta({ children, className = '' }) {
  return <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-gray-500 mt-5 pt-4 border-t border-gray-100 ${className}`}>{children}</div>;
};

Card.MetaItem = function CardMetaItem({ children, icon: Icon, className = '' }) {
  return <span className={`flex items-center gap-1 ${className}`}>{Icon && <Icon size={14} />}{children}</span>;
};

Card.Footer = function CardFooter({ children, className = '' }) {
  return <div className={`px-6 py-4 border-t border-gray-100 flex items-center justify-between ${className}`}>{children}</div>;
};
