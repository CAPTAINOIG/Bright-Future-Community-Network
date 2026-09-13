import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SectionHeader, ScrollReveal, Button } from '../../components/ui';
import segun from '../Leadership/image/segun.jpeg'

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
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-center">
      {/* <div className="w-full aspect-square bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center"> */}
        {/* <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 text-white font-serif text-2xl font-bold"> */}
          {/* {leader.name.split(' ').map(n => n[0]).join('').slice(0, 2)} */}
          <img
            src={leader.img}
            alt={leader.name}
            className="w-full h-auto object-cover"
          />
        {/* </div> */}
      {/* </div> */}
      <div className="p-5">
        <h3 className="text-base font-bold text-gray-900 mb-1">{leader.name}</h3>
        <h3 className="block text-sm font-semibold text-gray-600 mb-3">{leader.Alias}</h3>
        <span className="block text-sm font-semibold text-primary-600 mb-3">{leader.position}</span>
        <p className={`text-sm text-gray-600 leading-relaxed text-left mb-3 ${expanded ? '' : 'line-clamp-3'}`}>{leader.bio}</p>
        <button className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 bg-transparent border-none cursor-pointer hover:text-primary-800" onClick={() => setExpanded(!expanded)}>
          {expanded ? <><ChevronUp size={14} /> Show Less</> : <><ChevronDown size={14} /> Read More</>}
        </button>
      </div>
    </div>
  );
}

const Leadership = () => {
  return (
    <div>
      <section className="relative py-24 bg-gradient-to-br from-primary-800 to-primary-600 overflow-hidden -mt-[72px] pt-[calc(72px+4rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,160,23,0.12)_0%,transparent_50%)]" />
        <div className="container-main relative z-10">
          <ScrollReveal className="text-center max-w-[700px] mx-auto">
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.1em] text-accent-400 mb-4">Our People</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Leadership</h1>
            <p className="text-base text-white/85 leading-relaxed max-w-[560px] mx-auto">Meet the dedicated individuals who lead BFCN&apos;s mission.</p>
          </ScrollReveal>
        </div>
        <div className="absolute bottom-[-1px] left-0 right-0 z-10 hero-wave"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" fill="white" /></svg></div>
      </section>
      <section className="py-16 md:py-20">
        <div className="container-main">
          <ScrollReveal><SectionHeader label="Executive Team" title="BFCN Leadership" subtitle="Diverse expertise, passion, and commitment to community development." /></ScrollReveal>
          <ScrollReveal animation="stagger-children" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {executives.map((l) => <LeaderCard key={l.id} leader={l} />)}
          </ScrollReveal>
        </div>
      </section>
      <section className="py-16 md:py-20 bg-primary-600">
        <div className="container-main text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl text-white mb-4">Join Our Team</h2>
            <p className="text-white/85 max-w-[500px] mx-auto mb-8">Passionate about community development? We&apos;re always looking for dedicated individuals.</p>
            <Button to="/volunteer" variant="white" size="lg">Volunteer With Us</Button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

export default Leadership;
