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

export default function Transparency() {
  return (
    <div>
      <section className="relative py-24 bg-gradient-to-br from-primary-800 to-primary-600 overflow-hidden -mt-[72px] pt-[calc(72px+4rem)]"><div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,160,23,0.12)_0%,transparent_50%)]" /><div className="container-main relative z-10"><ScrollReveal className="text-center max-w-[700px] mx-auto"><span className="inline-block text-sm font-semibold uppercase tracking-[0.1em] text-accent-400 mb-4">Accountability</span><h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Transparency</h1><p className="text-base text-white/85 max-w-[560px] mx-auto">See our impact, reports, and how resources are used.</p></ScrollReveal></div><div className="absolute bottom-[-1px] left-0 right-0 z-10 hero-wave"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" fill="white" /></svg></div></section>

      {/* Stats */}
      <section className="py-12 md:py-16"><div className="container-main">
        <ScrollReveal animation="stagger-children" className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {impactStats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center p-6 rounded-xl bg-white border border-gray-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 mb-4"><s.icon size={28} /></div>
              <span className="font-serif text-3xl font-bold text-primary-600 leading-none mb-2">{s.value}</span>
              <span className="text-sm text-gray-600 font-medium">{s.label}</span>
            </div>
          ))}
        </ScrollReveal>
      </div></section>

      {/* Reports */}
      <section className="py-16 md:py-20 bg-gray-50"><div className="container-main">
        <ScrollReveal><SectionHeader label="Reports" title="Programme & Impact Reports" subtitle="Download our reports to learn about our work and impact." /></ScrollReveal>
        <ScrollReveal className="flex flex-col gap-3 max-w-[800px] mx-auto">
          {reports.map((r, i) => (
            <div key={i} className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary-50 text-primary-600 shrink-0"><FileText size={24} /></div>
              <div className="flex-1"><span className="text-xs font-semibold text-accent-400 uppercase tracking-wider">{r.type}</span><h4 className="text-base font-bold my-1">{r.title}</h4><span className="text-xs text-gray-500">{r.date}</span></div>
              <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 bg-white text-primary-600 cursor-pointer hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all"><Download size={18} /></button>
            </div>
          ))}
        </ScrollReveal>
      </div></section>

      {/* Outcomes */}
      <section className="py-16 md:py-20"><div className="container-main">
        <ScrollReveal><SectionHeader label="Results" title="Project Outcomes" subtitle="Measurable results from our completed projects." /></ScrollReveal>
        <ScrollReveal animation="stagger-children" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectOutcomes.map((item, i) => (
            <div key={i} className="p-6 bg-white border border-gray-200 rounded-xl border-t-4 border-t-primary-600">
              <h4 className="text-lg font-bold mb-4">{item.project}</h4>
              <ul className="list-none p-0 flex flex-col gap-3">{item.outcomes.map((o, j) => <li key={j} className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle size={16} className="text-green-700 shrink-0" />{o}</li>)}</ul>
            </div>
          ))}
        </ScrollReveal>
      </div></section>
    </div>
  );
}
