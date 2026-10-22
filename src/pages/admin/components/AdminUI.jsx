/**
 * Small presentational primitives shared by the admin screens so every page
 * follows the same BFCN admin design system (token-driven, calm surfaces).
 */

/** Page intro row: title + description on the left, actions on the right. */
export function PageIntro({ title, description, actions }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h2 className="m-0 text-xl font-semibold tracking-tight text-gray-900">{title}</h2>
        {description && <p className="mt-1 mb-0 text-sm text-gray-500">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </div>
  );
}

const chipTones = {
  primary: 'bg-primary-50 text-primary-700',
  accent: 'bg-accent-50 text-accent-700',
  neutral: 'bg-gray-100 text-gray-600',
  danger: 'bg-red-50 text-red-700',
};

/** KPI / stat card. */
export function StatCard({ label, value, hint, icon: Icon, tone = 'primary' }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="m-0 text-[13px] font-medium text-gray-500">{label}</p>
        {Icon && (
          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${chipTones[tone] || chipTones.primary}`}>
            <Icon size={18} strokeWidth={1.9} />
          </span>
        )}
      </div>
      <p className="mt-2 mb-0 text-[28px] font-semibold leading-none tracking-tight tabular-nums text-gray-900">{value}</p>
      {hint && <p className="mt-2 mb-0 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

/** Bordered white panel with optional header. */
export function Panel({ title, description, actions, children, className = '', bodyClassName = 'p-5 md:p-6' }) {
  return (
    <section className={`rounded-2xl border border-gray-200 bg-white ${className}`}>
      {(title || actions) && (
        <header className="flex flex-col gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
          <div className="min-w-0">
            {title && <h3 className="m-0 text-[15px] font-semibold text-gray-900">{title}</h3>}
            {description && <p className="mt-0.5 mb-0 text-[13px] text-gray-500">{description}</p>}
          </div>
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

const pillTones = {
  success: 'bg-primary-50 text-primary-700 ring-primary-200',
  warning: 'bg-accent-50 text-accent-700 ring-accent-200',
  danger: 'bg-red-50 text-red-700 ring-red-200',
  neutral: 'bg-gray-100 text-gray-600 ring-gray-200',
};

/** Returns the class string for a small semantic status pill. */
export const pillClass = (tone = 'neutral') =>
  `inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset whitespace-nowrap ${pillTones[tone] || pillTones.neutral}`;

/** Uppercase form/detail section label. */
export function SectionLabel({ children, className = '' }) {
  return (
    <h4 className={`m-0 border-b border-gray-100 pb-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-gray-500 ${className}`}>
      {children}
    </h4>
  );
}

/** Definition-list item for detail views. */
export function DetailItem({ label, value, icon: Icon }) {
  return (
    <div className="min-w-0">
      <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-gray-500">
        {Icon && <Icon size={13} className="text-gray-400" />}
        {label}
      </dt>
      <dd className="m-0 mt-1 break-words text-[15px] text-gray-900">{value || '—'}</dd>
    </div>
  );
}
