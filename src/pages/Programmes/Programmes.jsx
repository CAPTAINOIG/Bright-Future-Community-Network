import { useState } from 'react';
import { ArrowUpRight, BookOpen, Briefcase, CheckCircle, Heart, Lightbulb, Target, TrendingUp, Users } from 'lucide-react';
import { Modal } from 'antd';
import { ScrollReveal, SectionHeader } from '../../components/ui';

const programmes = [
  { id: 1, icon: BookOpen, title: 'Education Support Programme', category: 'Education', color: '#114a31', description: 'Comprehensive educational support through scholarships, learning materials, tutoring, and infrastructure development.', objectives: ['Increase school enrollment and retention', 'Provide learning materials to underprivileged students', 'Support educational infrastructure', 'Facilitate academic mentoring'], beneficiaries: 'Students from primary school to university level.', activities: ['Scholarship disbursement', 'School supply drives', 'Tutoring sessions', 'Library establishment', 'School renovation'] },
  { id: 2, icon: Lightbulb, title: 'Youth Development Initiative', category: 'Youth', color: '#d19b2a', description: 'Nurturing young people through mentorship, leadership training, career guidance, and personal development.', objectives: ['Equip youth with leadership skills', 'Provide career guidance', 'Foster civic engagement', 'Build self-confidence'], beneficiaries: 'Young people aged 15-35.', activities: ['Leadership bootcamps', 'Mentorship pairing', 'Career fairs', 'Youth conferences', 'Peer learning'] },
  { id: 3, icon: Briefcase, title: 'Skills & Entrepreneurship', category: 'Skills', color: '#1565c0', description: 'Empowering community members with practical skills and entrepreneurial knowledge for sustainable livelihoods.', objectives: ['Provide vocational training', 'Support small business development', 'Facilitate microfinance access', 'Build entrepreneurial capacity'], beneficiaries: 'Unemployed youth, women, and aspiring entrepreneurs.', activities: ['Tailoring workshops', 'Digital skills training', 'Agribusiness training', 'Business plan competitions', 'Startup mentoring'] },
  { id: 4, icon: Target, title: 'Leadership Development', category: 'Leadership', color: '#c62828', description: 'Building the next generation of community leaders through governance, conflict resolution, and civic engagement.', objectives: ['Develop governance skills', 'Train future leaders', 'Strengthen advocacy capacity', 'Promote participatory decision-making'], beneficiaries: 'Emerging community leaders and civic activists.', activities: ['Governance workshops', 'Policy advocacy training', 'Community dialogues', 'Leadership retreats', 'Civic campaigns'] },
  { id: 5, icon: Heart, title: 'Humanitarian & Welfare', category: 'Welfare', color: '#f57c00', description: 'Emergency relief, healthcare support, and welfare assistance for vulnerable community members.', objectives: ['Respond quickly to emergencies', 'Support vulnerable populations', 'Improve healthcare access', 'Provide food and material support'], beneficiaries: 'Widows, orphans, elderly, and persons with disabilities.', activities: ['Food distribution', 'Medical outreach', 'Emergency relief', 'Widow/orphan support', 'Health awareness'] },
  { id: 6, icon: TrendingUp, title: 'Community Empowerment', category: 'Community', color: '#6a1b9a', description: 'Sustainable community development through infrastructure, advocacy, and community organizing.', objectives: ['Improve infrastructure', 'Promote environmental sustainability', 'Strengthen community organizing', 'Advocate for development policies'], beneficiaries: 'Entire communities across Oyo State.', activities: ['Road/drainage projects', 'Cleanup campaigns', 'Town hall meetings', 'Policy advocacy', 'Community mapping'] },
];

const DetailHeading = ({ icon: Icon, children }) => (
  <h3 className="eyebrow text-primary-600 mb-4"><Icon size={14} />{children}</h3>
);

const ProgrammeDetail = ({ programme }) => {
  const Icon = programme.icon;
  return (
    <div className="space-y-8">
      <div className="flex items-start gap-4 border-b border-gray-200 pb-6">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary-50 text-primary-700"><Icon size={22} strokeWidth={1.75} /></span>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent-600">{programme.category}</span>
          <h2 className="font-serif mt-1 text-2xl md:text-[1.75rem] leading-snug text-gray-900 m-0">{programme.title}</h2>
        </div>
      </div>
      <p className="text-base leading-relaxed text-gray-600 m-0">{programme.description}</p>
      <div className="grid gap-8 md:grid-cols-2">
        <section>
          <DetailHeading icon={Target}>Objectives</DetailHeading>
          <ul className="list-none m-0 p-0 space-y-3">{programme.objectives.map((objective) => <li key={objective} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-600"><CheckCircle size={16} className="mt-1 shrink-0 text-primary-600" />{objective}</li>)}</ul>
        </section>
        <section>
          <DetailHeading icon={Users}>Beneficiaries</DetailHeading>
          <p className="text-[15px] leading-relaxed text-gray-600 m-0">{programme.beneficiaries}</p>
        </section>
      </div>
      <section>
        <DetailHeading icon={Briefcase}>Key activities</DetailHeading>
        <div className="flex flex-wrap gap-2">{programme.activities.map((activity) => <span key={activity} className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1.5 text-[13px] font-medium text-primary-700 ring-1 ring-inset ring-primary-200">{activity}</span>)}</div>
      </section>
    </div>
  );
}

const Programmes = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900">
        <div className="absolute -right-40 -top-40 w-[520px] h-[520px] rounded-full bg-primary-700/50 blur-3xl" aria-hidden="true" />
        <div className="container-main relative py-20 md:py-28">
          <ScrollReveal className="max-w-[760px]">
            <span className="eyebrow text-accent-300 mb-6"><span className="h-px w-8 bg-accent-300" />What we do</span>
            <h1 className="font-serif text-4xl md:text-6xl text-white leading-[1.05] mb-6">Our programmes</h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-[620px] m-0">Structured initiatives designed to address community needs and create lasting impact.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-main">
          <ScrollReveal><SectionHeader align="left" label="Our focus areas" title="BFCN programmes" subtitle="Each programme is carefully designed with measurable outcomes." /></ScrollReveal>
          <ScrollReveal animation="stagger-children" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programmes.map((programme, i) => {
              const Icon = programme.icon;
              return (
                <button
                  key={programme.id}
                  type="button"
                  onClick={() => setSelected(programme)}
                  aria-label={`View details for ${programme.title}`}
                  className="group flex h-full flex-col text-left p-7 md:p-8 bg-white border border-gray-200 rounded-[20px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[var(--shadow-lift)]"
                >
                  <div className="flex items-center justify-between w-full mb-8">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-700 group-hover:text-white"><Icon size={22} strokeWidth={1.75} /></span>
                    <span className="font-serif text-sm text-gray-400">0{i + 1}</span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent-600 mb-3">{programme.category}</span>
                  <h3 className="font-serif text-[1.35rem] leading-snug text-gray-900 mb-3">{programme.title}</h3>
                  <p className="line-clamp-3 text-[15px] leading-relaxed text-gray-600 mb-6 flex-1">{programme.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700">View details <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
                </button>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      <Modal open={Boolean(selected)} onCancel={() => setSelected(null)} footer={null} width={760} title={null}><>{selected && <ProgrammeDetail programme={selected} />}</></Modal>
    </div>
  );
}


export default Programmes;
