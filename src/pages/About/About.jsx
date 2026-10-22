import { Target, Eye, Shield, Users, Lightbulb, Handshake, TrendingUp, ArrowRight } from 'lucide-react';
import { Button, SectionHeader, ScrollReveal, Drawer } from '../../components/ui';
import { useState } from 'react';
import { JoinForm } from '../../components/forms';

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
  const [showJoinDrawer, setShowJoinDrawer] = useState(false)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900">
        <div className="absolute -right-40 -top-40 w-[520px] h-[520px] rounded-full bg-primary-700/50 blur-3xl" aria-hidden="true" />
        <div className="container-main relative py-20 md:py-28">
          <ScrollReveal className="max-w-[760px]">
            <span className="eyebrow text-accent-300 mb-6"><span className="h-px w-8 bg-accent-300" />About us</span>
            <h1 className="font-serif text-4xl md:text-6xl text-white leading-[1.05] mb-6">Who we are</h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-[620px] m-0">A community-focused organization dedicated to sustainable development, youth empowerment, and grassroots transformation.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Identity */}
      <section className="py-20 md:py-28">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
            <ScrollReveal animation="reveal-left">
              <SectionHeader align="left" label="Our identity" title="Bright Future Community Network" className="!mb-8" />
              <div className="max-w-[620px] space-y-5 text-base text-gray-600 leading-relaxed">
                <p className="m-0">Bright Future Community Network (BFCN) is a grassroots community development organization based in Ogbomoso, Oyo State, Nigeria. Founded on the belief that lasting change begins from within communities.</p>
                <p className="m-0">Our approach is rooted in the understanding that communities are the drivers of their own development. We create platforms and programmes that enable people to identify challenges and build capacity to solve them.</p>
                <p className="m-0">Through our network of volunteers, members, and partners, BFCN has impacted over 10,000 lives across 15+ communities and completed 30+ projects.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="reveal-right">
              <div className="relative aspect-[4/3] lg:aspect-[4/5] rounded-[20px] overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80"
                  alt="Community Development"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden absolute inset-0 flex-col items-center justify-center gap-4 text-primary-300 text-sm font-medium"><Users size={56} strokeWidth={1.5} /><span>Community Development</span></div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal animation="reveal-left" className="relative overflow-hidden p-8 md:p-12 rounded-[20px] bg-primary-800 text-white">
              <div className="absolute -right-24 -bottom-24 w-[280px] h-[280px] rounded-full bg-primary-700/60 blur-3xl" aria-hidden="true" />
              <div className="relative">
                <span className="grid place-items-center w-12 h-12 rounded-full bg-white/10 text-accent-300 mb-8"><Target size={22} strokeWidth={1.75} /></span>
                <h3 className="font-serif text-[1.75rem] md:text-3xl text-white mb-4">Our mission</h3>
                <p className="text-base text-white/75 leading-relaxed m-0">To empower communities through sustainable development, youth initiatives, education, skills acquisition, and leadership development for lasting positive change.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="reveal-right" className="p-8 md:p-12 rounded-[20px] bg-accent-50 border border-accent-100">
              <span className="grid place-items-center w-12 h-12 rounded-full bg-white text-accent-600 mb-8"><Eye size={22} strokeWidth={1.75} /></span>
              <h3 className="font-serif text-[1.75rem] md:text-3xl text-gray-900 mb-4">Our vision</h3>
              <p className="text-base text-gray-600 leading-relaxed m-0">A society where every community is empowered, every young person has opportunity, and every individual can contribute to a brighter, equitable future.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28">
        <div className="container-main">
          <ScrollReveal><SectionHeader align="left" label="Our foundation" title="Core values" subtitle="The principles that guide everything we do at BFCN." /></ScrollReveal>
          <ScrollReveal animation="stagger-children" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 rounded-[20px] overflow-hidden border border-gray-200">
            {values.map((v, i) => (
              <div key={v.title} className="group flex flex-col p-7 md:p-8 bg-white hover:bg-primary-50/50 transition-colors">
                <div className="flex items-center justify-between mb-8">
                  <span className="grid place-items-center w-12 h-12 rounded-full bg-primary-50 text-primary-700 group-hover:bg-primary-700 group-hover:text-white transition-colors"><v.icon size={22} strokeWidth={1.75} /></span>
                  <span className="font-serif text-sm text-gray-400">0{i + 1}</span>
                </div>
                <h3 className="font-serif text-[1.35rem] text-gray-900 mb-3">{v.title}</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed m-0">{v.description}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container-main">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
            <ScrollReveal className="lg:sticky lg:top-28 self-start">
              <SectionHeader align="left" label="Our journey" title="Our story" subtitle="From a small group of passionate individuals to a thriving community network." className="!mb-0" />
            </ScrollReveal>
            <ol className="relative list-none m-0 p-0 ml-2 border-l border-gray-300">
              {timeline.map((item) => (
                <ScrollReveal as="li" key={item.year} className="relative pl-8 md:pl-10 pb-10 last:pb-0">
                  <span className="absolute -left-[7px] top-2 w-[13px] h-[13px] rounded-full bg-gray-50 border-2 border-accent-400" aria-hidden="true" />
                  <span className="block font-serif text-3xl md:text-4xl text-primary-800 leading-none mb-3">{item.year}</span>
                  <h3 className="text-base font-semibold text-gray-900 mb-1.5">{item.title}</h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed m-0 max-w-[560px]">{item.description}</p>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-primary-800 relative overflow-hidden">
        <div className="absolute -left-40 -bottom-40 w-[520px] h-[520px] rounded-full bg-primary-700/50 blur-3xl" aria-hidden="true" />
        <div className="container-main relative text-center">
          <ScrollReveal>
            <span className="eyebrow text-accent-300 mb-5"><span className="h-px w-6 bg-accent-300" />Get involved<span className="h-px w-6 bg-accent-300" /></span>
            <h2 className="font-serif text-4xl md:text-[3.25rem] leading-[1.05] text-white mb-5 max-w-[720px] mx-auto">Ready to make a difference?</h2>
            <p className="text-base md:text-lg text-white/70 max-w-[560px] mx-auto mb-10 leading-relaxed">Join our growing community of changemakers working to build a brighter future.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button onClick={() => setShowJoinDrawer(true)} variant="accent" size="lg" iconRight={ArrowRight}>Join BFCN</Button>
              <Button to="/leadership" variant="white-outline" size="lg">Meet our team</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Drawer
        title="Join Bright Future Community Network"
        placement="right"
        onClose={() => setShowJoinDrawer(false)}
        open={showJoinDrawer}
        width={600}
      >
        <JoinForm onClose={() => setShowJoinDrawer(false)} />
      </Drawer>
    </div>
  );
}

export default About;
