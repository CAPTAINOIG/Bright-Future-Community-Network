import Button from './Button';
import { Inbox } from 'lucide-react';

export default function EmptyState({ icon: Icon, title = 'Nothing here yet', description, actionLabel, actionTo, onAction, className = '' }) {
  const DisplayIcon = Icon || Inbox;
  return (
    <div className={`flex flex-col items-center text-center py-14 px-6 ${className}`}>
      <div className="grid h-16 w-16 place-items-center rounded-full bg-primary-50 text-primary-700 ring-8 ring-primary-50/50 mb-6" aria-hidden="true">
        <DisplayIcon size={28} strokeWidth={1.6} />
      </div>
      <h3 className="font-serif text-[1.4rem] text-gray-900 mb-2 leading-snug">{title}</h3>
      {description && <p className="text-[15px] text-gray-600 leading-relaxed max-w-[420px] m-0">{description}</p>}
      {actionLabel && (actionTo || onAction) && (
        <div className="mt-7"><Button variant="primary" to={actionTo} onClick={onAction}>{actionLabel}</Button></div>
      )}
    </div>
  );
}
