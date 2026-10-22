import { FileText, Download, Users, Briefcase, TrendingUp, CheckCircle } from 'lucide-react';
import { SectionHeader, ScrollReveal } from '../../components/ui';

const impactStats = [
  { icon: Users, value: '2,500+', label: 'Members' },
  { icon: Briefcase, value: '30+', label: 'Projects' },
  { icon: TrendingUp, value: '10,000+', label: 'Lives Impacted' },
  { icon: CheckCircle, value: '6', label: 'Active Programmes' },
];

const reports = [
  { title: 'BFCN Annual Report 2025', type: 'Programme Report', date: 'January 2026' },
  { title: 'Community Impact Assessment 2025', type: 'Impact Report', date: 'February 2026' },
  { title: 'Youth Development Programme Report', type: 'Programme Report', date: 'March 2026' },
  { title: 'Financial Transparency Report 2025', type: 'Financial Report', date: 'January 2026' },
];

const projectOutcomes = [
  { project: 'Youth Skills Workshop', outcomes: ['120 youth trained', '35 businesses started', '15 employed'] },
  { project: 'School Renovation', outcomes: ['3 schools renovated', '800 students benefited', '6 sanitation facilities'] },
  { project: 'Women Empowerment', outcomes: ['50 women enrolled', '3 skill areas covered', '20 businesses started'] },
];

const Transparency = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900">
        <div className="absolute -right-40 -top-40 w-[520px] h-[520px] rounded-full bg-primary-700/50 blur-3xl" aria-hidden="true" />
        <div className="container-main relative py-20 md:py-28">
          <ScrollReveal className="max-w-[760px]">
            <span className="eyebrow text-accent-300 mb-6"><span className="h-px w-8 bg-accent-300" />Accountability</span>
            <h1 className="font-serif text-4xl md:text-6xl text-white leading-[1.05] mb-6">Transparency</h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-[620px] m-0">See our impact, reports, and how resources are used.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Impact numbers */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-main">
          <ScrollReveal animation="stagger-children" className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
            {impactStats.map((s, i) => (
              <div key={s.label} className={`py-10 md:py-14 px-4 md:px-8 ${i % 2 === 0 ? 'pl-0' : ''} lg:pl-8 lg:first:pl-0 ${i >= 2 ? 'border-t lg:border-t-0 border-gray-100' : ''}`}>
                <span className="block font-serif text-4xl md:text-5xl text-primary-800 leading-none mb-3">{s.value}</span>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-600"><s.icon size={16} className="text-accent-500" />{s.label}</span>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Reports */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container-main">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
            <ScrollReveal className="lg:sticky lg:top-28 self-start">
              <SectionHeader align="left" label="Reports" title="Programme & impact reports" subtitle="Download our reports to learn about our work and impact." className="!mb-0" />
            </ScrollReveal>
            <ScrollReveal className="flex flex-col bg-white rounded-[20px] border border-gray-200 divide-y divide-gray-100 overflow-hidden">
              {reports.map((r, i) => (
                <div key={i} className="group flex items-center gap-4 md:gap-5 p-5 md:p-6 hover:bg-gray-50/70 transition-colors">
                  <span className="grid place-items-center w-12 h-12 rounded-full bg-primary-50 text-primary-700 shrink-0"><FileText size={20} strokeWidth={1.75} /></span>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-accent-600">{r.type}</span>
                    <h3 className="font-serif text-lg md:text-xl text-gray-900 leading-snug my-1">{r.title}</h3>
                    <span className="block text-[13px] font-medium text-gray-500">{r.date}</span>
                  </div>
                  <button type="button" aria-label={`Download ${r.title}`} className="grid place-items-center w-11 h-11 shrink-0 rounded-full border border-gray-200 bg-white text-gray-600 cursor-pointer hover:bg-primary-700 hover:text-white hover:border-primary-700 transition-colors"><Download size={18} /></button>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-20 md:py-28">
        <div className="container-main">
          <ScrollReveal><SectionHeader align="left" label="Results" title="Project outcomes" subtitle="Measurable results from our completed projects." /></ScrollReveal>
          <ScrollReveal animation="stagger-children" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectOutcomes.map((item, i) => (
              <div key={i} className="flex flex-col p-7 md:p-8 bg-white border border-gray-200 rounded-[20px] transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[var(--shadow-lift)]">
                <span className="font-serif text-sm text-gray-400 mb-6">0{i + 1}</span>
                <h3 className="font-serif text-[1.35rem] text-gray-900 mb-5">{item.project}</h3>
                <ul className="list-none m-0 p-0 flex flex-col gap-3 pt-5 border-t border-gray-100">{item.outcomes.map((o, j) => <li key={j} className="flex items-start gap-2.5 text-[15px] text-gray-600 leading-snug"><CheckCircle size={16} className="mt-0.5 text-primary-600 shrink-0" />{o}</li>)}</ul>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

export default Transparency;
