import { Target, Eye, Heart, Shield, Users, Lightbulb, Handshake, TrendingUp, BookOpen, Award, ArrowRight } from 'lucide-react';
import { Button, SectionHeader, ScrollReveal } from '../../components/ui';

const values = [
  { icon: Shield, title: 'Integrity', description: 'We uphold the highest standards of honesty, accountability, and ethical conduct.' },
  { icon: Users, title: 'Community', description: 'We place our communities at the center of everything we do.' },
  { icon: TrendingUp, title: 'Empowerment', description: 'We equip individuals and communities with tools and confidence to drive development.' },
  { icon: Eye, title: 'Transparency', description: 'We operate with openness, ensuring stakeholders have access to information.' },
  { icon: Lightbulb, title: 'Innovation', description: 'We embrace creative approaches to solve community challenges.' },
  { icon: Handshake, title: 'Collaboration', description: 'We foster partnerships for greater community impact.' },
];

const timeline = [
  { year: '2020', title: 'The Beginning', description: 'BFCN was founded by passionate community members in Ogbomoso.' },
  { year: '2021', title: 'First Programmes', description: 'Launched education support and youth mentorship, reaching 200+ beneficiaries.' },
  { year: '2022', title: 'Community Growth', description: 'Expanded to 5 communities with skills training and infrastructure projects.' },
  { year: '2023', title: 'Strategic Partnerships', description: 'Formed partnerships with local government, NGOs, and private sector.' },
  { year: '2024', title: 'Major Milestones', description: 'Crossed 1,000 members, 20+ projects, launched Community Ideas Programme.' },
  { year: '2025', title: 'Expanding Reach', description: 'Extended to 12+ communities with focus on technology and agribusiness.' },
  { year: '2026', title: 'Forward Together', description: 'Ambitious plans for education, clean water, and youth entrepreneurship.' },
];

const About = () => {
  return (
    <div>
      <section className="relative py-24 bg-gradient-to-br from-primary-800 to-primary-600 overflow-hidden -mt-[72px] pt-[calc(72px+4rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,160,23,0.12)_0%,transparent_50%)]" />
        <div className="container-main relative z-10">
          <ScrollReveal className="text-center max-w-[700px] mx-auto">
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.1em] text-accent-400 mb-4">About Us</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Who We Are</h1>
            <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-[560px] mx-auto">A community-focused organization dedicated to sustainable development, youth empowerment, and grassroots transformation.</p>
          </ScrollReveal>
        </div>
        <div className="absolute bottom-[-1px] left-0 right-0 z-10 hero-wave"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" fill="white" /></svg></div>
      </section>
      <section className="py-16 md:py-20">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <ScrollReveal animation="reveal-left">
              <SectionHeader align="left" label="Our Identity" title="Bright Future Community Network" />
              <p className="text-base text-gray-600 leading-relaxed mb-4">Bright Future Community Network (BFCN) is a grassroots community development organization based in Ogbomoso, Oyo State, Nigeria. Founded on the belief that lasting change begins from within communities.</p>
              <p className="text-base text-gray-600 leading-relaxed mb-4">Our approach is rooted in the understanding that communities are the drivers of their own development. We create platforms and programmes that enable people to identify challenges and build capacity to solve them.</p>
              <p className="text-base text-gray-600 leading-relaxed">Through our network of volunteers, members, and partners, BFCN has impacted over 10,000 lives across 15+ communities and completed 30+ projects.</p>
            </ScrollReveal>
            <ScrollReveal animation="reveal-right">
              <div className="relative h-[360px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80"
                  alt="Community Development"
                  className="w-full h-full object-cover rounded-2xl"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden absolute inset-0 flex-col items-center justify-center gap-4 text-primary-300 text-sm font-medium"><Users size={64} /><span>Community Development</span></div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal animation="reveal-left" className="p-8 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 text-white text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-5"><Target size={32} /></div>
              <h3 className="font-serif text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-base text-white/90 leading-relaxed">To empower communities through sustainable development, youth initiatives, education, skills acquisition, and leadership development for lasting positive change.</p>
            </ScrollReveal>
            <ScrollReveal animation="reveal-right" className="p-8 rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 text-white text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-5"><Eye size={32} /></div>
              <h3 className="font-serif text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-base text-white/90 leading-relaxed">A society where every community is empowered, every young person has opportunity, and every individual can contribute to a brighter, equitable future.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-20">
        <div className="container-main">
          <ScrollReveal><SectionHeader label="Our Foundation" title="Core Values" subtitle="The principles that guide everything we do at BFCN." /></ScrollReveal>
          <ScrollReveal animation="stagger-children" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="text-center p-6 bg-white border border-gray-200 rounded-xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-50 text-primary-600 mb-4"><v.icon size={24} /></div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-main">
          <ScrollReveal><SectionHeader label="Our Journey" title="Our Story" subtitle="From a small group of passionate individuals to a thriving community network." /></ScrollReveal>
          <div className="relative max-w-[800px] mx-auto pl-8 md:pl-0">
            <div className="timeline-line" />
            {timeline.map((item, i) => (
              <ScrollReveal key={item.year} animation={i % 2 === 0 ? 'reveal-left' : 'reveal-right'}>
                <div className={`relative mb-8 pl-8 md:pl-0 ${i % 2 === 0 ? 'md:w-1/2 md:pr-10 md:text-right' : 'md:w-1/2 md:ml-[50%] md:pl-10'}`}>
                  <div className={`absolute z-10 ${i % 2 === 0 ? 'left-[-24px] md:left-auto md:right-[-52px]' : 'left-[-24px] md:left-[-52px]'}`}>
                    <span className="inline-flex items-center justify-center px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full whitespace-nowrap">{item.year}</span>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                    <h4 className="text-base font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed m-0">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 md:py-20 bg-primary-600">
        <div className="container-main text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Ready to Make a Difference?</h2>
            <p className="text-base text-white/85 max-w-[500px] mx-auto mb-8">Join our growing community of changemakers working to build a brighter future.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button to="/join" variant="white" size="lg" iconRight={ArrowRight}>Join BFCN</Button>
              <Button to="/leadership" variant="white-outline" size="lg">Meet Our Team</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

export default About;