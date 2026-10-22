import { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { SectionHeader, ScrollReveal, Button } from '../../components/ui';
import segun from '../Leadership/image/segun.jpeg'
import Drawer from '../../components/ui/Drawer';
import { VolunteerForm } from '../../components/forms';

const executives = [
  { id: 1, img: segun, name: 'Abdullahi Samsudeen O.', Alias: 'CaptainOIG', position: 'President', bio: 'A seasoned community leader with over 20 years of experience in grassroots mobilization. Instrumental in driving BFCN\'s mission since its founding.' },
  { id: 2, img: segun, name: 'Mrs. Folake Adeyemi', Alias: 'CaptainOIG', position: 'Vice Chairman', bio: 'Brings extensive experience in community development and women empowerment. A retired educator who leads BFCN\'s education programmes.' },
  { id: 3, img: segun, name: 'Engr. Tunde Bakare', Alias: 'CaptainOIG', position: 'Secretary General', bio: 'A civil engineer who oversees BFCN\'s administrative operations and project implementation with technical expertise.' },
  { id: 4, img: segun, name: 'Mr. Ibrahim Oladipo', Alias: 'CaptainOIG', position: 'Treasurer', bio: 'A certified accountant ensuring transparent and accountable management of BFCN\'s resources.' },
  { id: 5, img: segun, name: 'Dr. Amina Yusuf', Alias: 'CaptainOIG', position: 'Director of Programmes', bio: 'Holds a PhD in Community Development. Leads the design, implementation, and evaluation of all BFCN programmes.' },
  { id: 6, img: segun, name: 'Mr. Olalekan Adekunle', Alias: 'CaptainOIG', position: 'Youth Development Coordinator', bio: 'A dynamic youth leader and social entrepreneur coordinating BFCN\'s youth development initiatives.' },
  { id: 7, img: segun, name: 'Mrs. Bimpe Ogundimu', Alias: 'CaptainOIG', position: 'Welfare Coordinator', bio: 'Coordinates BFCN\'s humanitarian support programmes, ensuring vulnerable members receive needed assistance.' },
  { id: 8, img: segun, name: 'Mr. Saheed Adegoke', Alias: 'CaptainOIG', position: 'Public Relations Officer', bio: 'A communications professional managing BFCN\'s public image, media relations, and stakeholder engagement.' },
];

const LeaderCard = ({ leader }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="group flex flex-col bg-white border border-gray-200 rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[var(--shadow-lift)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
        <img
          src={leader.img}
          alt={leader.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col flex-1 p-6">
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent-600 mb-2">{leader.position}</span>
        <h3 className="font-serif text-[1.35rem] text-gray-900 leading-snug mb-1">{leader.name}</h3>
        <span className="block text-[13px] font-medium text-gray-500 mb-4">{leader.Alias}</span>
        <p className={`text-[15px] text-gray-600 leading-relaxed mb-4 ${expanded ? '' : 'line-clamp-3'}`}>{leader.bio}</p>
        <button
          type="button"
          className="mt-auto self-start inline-flex items-center gap-1 rounded-full text-sm font-semibold text-primary-700 bg-transparent border-none p-0 cursor-pointer hover:text-primary-800"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? <><ChevronUp size={16} /> Show less</> : <><ChevronDown size={16} /> Read more</>}
        </button>
      </div>
    </article>
  );
}

const Leadership = () => {
  const [showJoinDrawer, setShowJoinDrawer] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900">
        <div className="absolute -right-40 -top-40 w-[520px] h-[520px] rounded-full bg-primary-700/50 blur-3xl" aria-hidden="true" />
        <div className="container-main relative py-20 md:py-28">
          <ScrollReveal className="max-w-[760px]">
            <span className="eyebrow text-accent-300 mb-6"><span className="h-px w-8 bg-accent-300" />Our people</span>
            <h1 className="font-serif text-4xl md:text-6xl text-white leading-[1.05] mb-6">Leadership</h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-[620px] m-0">Meet the dedicated individuals who lead BFCN&apos;s mission.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-main">
          <ScrollReveal><SectionHeader align="left" label="Executive team" title="BFCN leadership" subtitle="Diverse expertise, passion, and commitment to community development." /></ScrollReveal>
          <ScrollReveal animation="stagger-children" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {executives.map((l) => <LeaderCard key={l.id} leader={l} />)}
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container-main">
          <ScrollReveal className="relative overflow-hidden rounded-[28px] bg-primary-800 px-6 py-14 md:px-16 md:py-20 text-center">
            <div className="absolute -right-32 -top-32 w-[420px] h-[420px] rounded-full bg-primary-700/50 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <span className="eyebrow text-accent-300 mb-5"><span className="h-px w-6 bg-accent-300" />Get involved<span className="h-px w-6 bg-accent-300" /></span>
              <h2 className="font-serif text-4xl md:text-[3.25rem] leading-[1.05] text-white mb-5">Join our team</h2>
              <p className="text-base md:text-lg text-white/70 max-w-[560px] mx-auto mb-10 leading-relaxed">Passionate about community development? We&apos;re always looking for dedicated individuals.</p>
              <Button onClick={() => setShowJoinDrawer(true)} variant="accent" size="lg" iconRight={ArrowRight}>Volunteer with us</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Drawer
        isOpen={showJoinDrawer}
        onClose={() => setShowJoinDrawer(false)}
        position="right"
        title={
          <div className="pr-6">
            <h2 className="font-serif text-xl m-0 text-gray-900">
              Volunteer Application Form
            </h2>
            <p className="text-xs text-gray-500 mt-1 mb-0 leading-relaxed">
              Your details are safe with us
            </p>
          </div>
        }
      >
        <VolunteerForm onClose={() => setShowJoinDrawer(false)} />
      </Drawer>
    </div>
  );
}

export default Leadership;
