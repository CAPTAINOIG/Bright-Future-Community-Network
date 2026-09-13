import { useState } from 'react';
import { ArrowRight, BookOpen, Briefcase, CheckCircle, Heart, Lightbulb, Target, TrendingUp, Users } from 'lucide-react';
import { Button, Card, Modal, Tag } from 'antd';
import { ScrollReveal, SectionHeader } from '../../components/ui';

const programmes = [
  { id: 1, icon: BookOpen, title: 'Education Support Programme', category: 'Education', color: '#1B5E20', description: 'Comprehensive educational support through scholarships, learning materials, tutoring, and infrastructure development.', objectives: ['Increase school enrollment and retention', 'Provide learning materials to underprivileged students', 'Support educational infrastructure', 'Facilitate academic mentoring'], beneficiaries: 'Students from primary school to university level.', activities: ['Scholarship disbursement', 'School supply drives', 'Tutoring sessions', 'Library establishment', 'School renovation'] },
  { id: 2, icon: Lightbulb, title: 'Youth Development Initiative', category: 'Youth', color: '#D4A017', description: 'Nurturing young people through mentorship, leadership training, career guidance, and personal development.', objectives: ['Equip youth with leadership skills', 'Provide career guidance', 'Foster civic engagement', 'Build self-confidence'], beneficiaries: 'Young people aged 15-35.', activities: ['Leadership bootcamps', 'Mentorship pairing', 'Career fairs', 'Youth conferences', 'Peer learning'] },
  { id: 3, icon: Briefcase, title: 'Skills & Entrepreneurship', category: 'Skills', color: '#1565c0', description: 'Empowering community members with practical skills and entrepreneurial knowledge for sustainable livelihoods.', objectives: ['Provide vocational training', 'Support small business development', 'Facilitate microfinance access', 'Build entrepreneurial capacity'], beneficiaries: 'Unemployed youth, women, and aspiring entrepreneurs.', activities: ['Tailoring workshops', 'Digital skills training', 'Agribusiness training', 'Business plan competitions', 'Startup mentoring'] },
  { id: 4, icon: Target, title: 'Leadership Development', category: 'Leadership', color: '#c62828', description: 'Building the next generation of community leaders through governance, conflict resolution, and civic engagement.', objectives: ['Develop governance skills', 'Train future leaders', 'Strengthen advocacy capacity', 'Promote participatory decision-making'], beneficiaries: 'Emerging community leaders and civic activists.', activities: ['Governance workshops', 'Policy advocacy training', 'Community dialogues', 'Leadership retreats', 'Civic campaigns'] },
  { id: 5, icon: Heart, title: 'Humanitarian & Welfare', category: 'Welfare', color: '#f57c00', description: 'Emergency relief, healthcare support, and welfare assistance for vulnerable community members.', objectives: ['Respond quickly to emergencies', 'Support vulnerable populations', 'Improve healthcare access', 'Provide food and material support'], beneficiaries: 'Widows, orphans, elderly, and persons with disabilities.', activities: ['Food distribution', 'Medical outreach', 'Emergency relief', 'Widow/orphan support', 'Health awareness'] },
  { id: 6, icon: TrendingUp, title: 'Community Empowerment', category: 'Community', color: '#6a1b9a', description: 'Sustainable community development through infrastructure, advocacy, and community organizing.', objectives: ['Improve infrastructure', 'Promote environmental sustainability', 'Strengthen community organizing', 'Advocate for development policies'], beneficiaries: 'Entire communities across Oyo State.', activities: ['Road/drainage projects', 'Cleanup campaigns', 'Town hall meetings', 'Policy advocacy', 'Community mapping'] },
];

const ProgrammeDetail = ({ programme }) => {
  const Icon = programme.icon;
  return (
    <div className="space-y-7">
      <div className="flex items-start gap-4 border-b border-[#e7ebe3] pb-6">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl" style={{ backgroundColor: `${programme.color}15`, color: programme.color }}><Icon size={28} /></div>
        <div><Tag color="green">{programme.category}</Tag><h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#17231d]">{programme.title}</h2></div>
      </div>
      <p className="text-base leading-7 text-[#53635b]">{programme.description}</p>
      <div className="grid gap-7 md:grid-cols-2">
        <section><h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#427456]"><Target size={16} /> Objectives</h3><ul className="space-y-3">{programme.objectives.map((objective) => <li key={objective} className="flex items-start gap-2 text-sm leading-6 text-[#53635b]"><CheckCircle size={16} className="mt-1 shrink-0 text-[#427456]" />{objective}</li>)}</ul></section>
        <section><h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#427456]"><Users size={16} /> Beneficiaries</h3><p className="text-sm leading-6 text-[#53635b]">{programme.beneficiaries}</p></section>
      </div>
      <section><h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#427456]"><Briefcase size={16} /> Key activities</h3><div className="flex flex-wrap gap-2">{programme.activities.map((activity) => <Tag key={activity} color="green">{activity}</Tag>)}</div></section>
    </div>
  );
}

const Programmes = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <section className="relative -mt-[72px] overflow-hidden bg-gradient-to-br from-primary-800 to-primary-600 pb-28 pt-[calc(72px+4rem)] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,160,23,0.12)_0%,transparent_50%)]" />
        <div className="container-main relative z-10"><ScrollReveal className="mx-auto max-w-[700px] text-center"><span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.1em] text-accent-400">What we do</span><h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl">Our programmes</h1><p className="mx-auto max-w-[560px] text-base text-white/85">Structured initiatives designed to address community needs and create lasting impact.</p></ScrollReveal></div>
        <div className="hero-wave absolute bottom-[-1px] left-0 right-0 z-10"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" fill="white" /></svg></div>
      </section>

      <section className="py-16 md:py-20"><div className="container-main"><ScrollReveal><SectionHeader label="Our focus areas" title="BFCN programmes" subtitle="Each programme is carefully designed with measurable outcomes." /></ScrollReveal><ScrollReveal animation="stagger-children" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programmes.map((programme) => { const Icon = programme.icon; return <Card key={programme.id} hoverable className="h-full cursor-pointer !rounded-2xl border-[#e1e7df]" onClick={() => setSelected(programme)}><div className="p-6"><div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl" style={{ backgroundColor: `${programme.color}15`, color: programme.color }}><Icon size={28} /></div><Tag color="green">{programme.category}</Tag><h3 className="mt-3 text-lg font-semibold text-[#17231d]">{programme.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-[#708078]">{programme.description}</p><Button type="link" className="mt-4 !px-0 !font-semibold !text-[#427456]" icon={<ArrowRight size={15} />} iconPosition="end">View details</Button></div></Card>; })}
      </ScrollReveal></div></section>

      <Modal open={Boolean(selected)} onCancel={() => setSelected(null)} footer={null} width={760} title={selected?.title}><>{selected && <ProgrammeDetail programme={selected} />}</></Modal>
    </div>
  );
}


export default Programmes;