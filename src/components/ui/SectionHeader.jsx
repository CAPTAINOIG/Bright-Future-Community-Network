export default function SectionHeader({ title, subtitle, label, align = 'center', light = false, className = '' }) {
  const alignment = align === 'center' ? 'text-center' : 'text-left';
  const subtitleAlign = align === 'center' ? 'mx-auto' : '';
  const accentAlign = align === 'center' ? 'mx-auto' : '';

  return (
    <div className={`mb-12 ${alignment} ${className}`}>
      {label && <span className={`inline-block text-sm font-semibold uppercase tracking-[0.1em] mb-3 ${light ? 'text-accent-200' : 'text-accent-400'}`}>{label}</span>}
      <h2 className={`font-serif text-3xl md:text-4xl font-bold leading-tight mb-4 ${light ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
      <div className={`w-15 h-1 bg-gradient-to-r from-primary-600 to-accent-400 rounded-full mb-4 ${accentAlign}`} />
      {subtitle && <p className={`text-base md:text-lg leading-relaxed max-w-[640px] ${subtitleAlign} ${light ? 'text-white/80' : 'text-gray-600'}`}>{subtitle}</p>}
    </div>
  );
}
