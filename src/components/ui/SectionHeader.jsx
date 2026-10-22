export default function SectionHeader({ title, subtitle, label, align = 'center', light = false, className = '' }) {
  const centered = align === 'center';

  return (
    <div className={`mb-12 md:mb-14 ${centered ? 'text-center' : 'text-left'} ${className}`}>
      {label && (
        <span className={`eyebrow mb-4 ${light ? 'text-accent-300' : 'text-primary-600'}`}>
          <span className={`h-px w-6 ${light ? 'bg-accent-300' : 'bg-accent-400'}`} aria-hidden="true" />
          {label}
          {centered && <span className={`h-px w-6 ${light ? 'bg-accent-300' : 'bg-accent-400'}`} aria-hidden="true" />}
        </span>
      )}
      <h2 className={`font-serif text-[2rem] md:text-[2.75rem] leading-[1.08] mb-4 ${light ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
      {subtitle && <p className={`text-base md:text-lg leading-relaxed max-w-[620px] ${centered ? 'mx-auto' : ''} ${light ? 'text-white/75' : 'text-gray-600'}`}>{subtitle}</p>}
    </div>
  );
}
