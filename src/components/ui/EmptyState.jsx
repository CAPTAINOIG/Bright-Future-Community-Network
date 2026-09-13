import Button from './Button';
import { Empty } from 'antd';

export default function EmptyState({ icon: Icon, title = 'Nothing here yet', description, actionLabel, actionTo, onAction, className = '' }) {
  return (
    <div className={`py-12 px-6 ${className}`}><Empty image={Icon ? <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary-50 text-primary-600"><Icon size={40} strokeWidth={1.5} /></div> : Empty.PRESENTED_IMAGE_SIMPLE} description={<><h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>{description && <p className="text-sm text-gray-600">{description}</p>}{actionLabel && (actionTo || onAction) && <div className="mt-5"><Button variant="primary" to={actionTo} onClick={onAction}>{actionLabel}</Button></div>}</>} /></div>
  );
}
