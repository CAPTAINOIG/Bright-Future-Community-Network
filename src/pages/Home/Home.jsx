import { Users, BookOpen, Briefcase, Calendar, ArrowRight, ArrowUpRight, MapPin, Clock, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, SectionHeader, Card, ScrollReveal, Badge, Drawer } from '../../components/ui';
import { events, impactQuotes, news, programmes, projects, stats } from './dummy';
import { JoinForm } from '../../components/forms';
import { useState } from 'react';
import heroVideo from '../../assets/video.mp4';

const MediaImage = ({ src, alt, Fallback }) => (
  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
    {src ? (
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-[1.04]"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextSibling.style.display = 'flex';
        }}
      />
    ) : null}
    <div className={`${src ? 'hidden' : 'flex'} absolute inset-0 items-center justify-center text-primary-300`}><Fallback size={40} strokeWidth={1.5} /></div>
  </div>
);

const Home = () => {
  const [showJoinDrawer, setShowJoinDrawer] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-end overflow-hidden -mt-[72px] pt-[72px] bg-primary-900">
        <div className="absolute inset-0 z-0">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center 20%' }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/70 to-primary-900/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 via-primary-900/30 to-transparent" />
        </div>

        <div className="container-main relative z-10 pb-16 md:pb-24 pt-24">
          <ScrollReveal className="max-w-[760px]">
            <span className="eyebrow text-accent-300 mb-6"><span className="h-px w-8 bg-accent-300" />Ogbomoso · Oyo State · Nigeria</span>
            <h1 className="font-serif text-[2.75rem] sm:text-6xl lg:text-[5.25rem] text-white leading-[1.02] mb-7">
              Building a brighter future, <em className="italic text-accent-300 font-normal">together.</em>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-[580px] mb-10 leading-relaxed">
              Bright Future Community Network empowers communities through education, youth development, enterprise and grassroots leadership.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setShowJoinDrawer(true)} variant="accent" size="lg" iconRight={ArrowRight}>Join BFCN</Button>
              <Button to="/programmes" variant="white-outline" size="lg">Explore our programmes</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Impact numbers */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-main">
          <ScrollReveal animation="stagger-children" className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
            {stats.map((s, i) => (
              <div key={s.label} className={`py-10 md:py-14 px-4 md:px-8 ${i % 2 === 0 ? 'pl-0' : ''} lg:pl-8 lg:first:pl-0 ${i >= 2 ? 'border-t lg:border-t-0 border-gray-100' : ''}`}>
                <span className="block font-serif text-4xl md:text-5xl text-primary-800 leading-none mb-3">{s.value}</span>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-600"><s.icon size={16} className="text-accent-500" />{s.label}</span>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Programmes */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container-main">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
            <ScrollReveal className="lg:sticky lg:top-28 self-start">
              <SectionHeader align="left" label="What we do" title="Six programmes, one shared purpose." subtitle="Structured, long-term initiatives that respond to what our communities need most — and equip people to lead change themselves." className="!mb-8" />
              <Button to="/programmes" variant="secondary" iconRight={ArrowRight}>All programmes</Button>
            </ScrollReveal>
            <ScrollReveal animation="stagger-children" className="grid sm:grid-cols-2 gap-px bg-gray-200 rounded-[20px] overflow-hidden border border-gray-200">
              {programmes.map((p, i) => (
                <Link key={p.title} to="/programmes" className="group flex flex-col p-7 md:p-8 bg-white no-underline hover:bg-primary-50/50 transition-colors">
                  <div className="flex items-center justify-between mb-8">
                    <span className="grid place-items-center w-12 h-12 rounded-full bg-primary-50 text-primary-700 group-hover:bg-primary-700 group-hover:text-white transition-colors"><p.icon size={22} strokeWidth={1.75} /></span>
                    <span className="font-serif text-sm text-gray-400">0{i + 1}</span>
                  </div>
                  <h3 className="font-serif text-[1.4rem] text-gray-900 mb-3">{p.title}</h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed mb-6 flex-1">{p.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700">Learn more <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
                </Link>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 md:py-28">
        <div className="container-main">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <SectionHeader align="left" label="Our impact" title="Latest projects" subtitle="From community libraries to clean water — work that creates lasting change." className="!mb-0" />
            <Button to="/projects" variant="secondary" iconRight={ArrowRight} className="shrink-0">View all projects</Button>
          </div>
          <ScrollReveal animation="stagger-children" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <Card key={p.id} variant="elevated">
                <MediaImage src={p.image} alt={p.title} Fallback={Briefcase} />
                <Card.Body>
                  <div className="mb-4"><Badge.Status status={p.status} /></div>
                  <Card.Title>{p.title}</Card.Title>
                  <Card.Text>{p.description}</Card.Text>
                  <Card.Meta><Card.MetaItem icon={Users}>{p.beneficiaries}</Card.MetaItem></Card.Meta>
                </Card.Body>
              </Card>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Events */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container-main">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <SectionHeader align="left" label="Join us" title="Upcoming events" subtitle="Workshops, outreaches and gatherings across our communities." className="!mb-0" />
            <Button to="/events" variant="secondary" iconRight={ArrowRight} className="shrink-0">All events</Button>
          </div>
          <ScrollReveal className="flex flex-col bg-white rounded-[20px] border border-gray-200 divide-y divide-gray-100 overflow-hidden">
            {events.map((e) => (
              <Link key={e.id} to="/events" className="group grid grid-cols-[64px_1fr] md:grid-cols-[88px_1fr_auto] items-center gap-5 md:gap-8 p-5 md:p-7 no-underline hover:bg-gray-50 transition-colors">
                <div className="flex flex-col items-center justify-center aspect-square rounded-2xl bg-primary-50 text-primary-800">
                  <span className="font-serif text-2xl md:text-3xl leading-none">{e.date.split(' ')[1]?.replace(',', '')}</span>
                  <span className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-accent-600">{e.date.split(' ')[0]?.slice(0, 3)}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-xl text-gray-900 mb-1.5 group-hover:text-primary-700 transition-colors">{e.title}</h3>
                  <p className="text-[15px] text-gray-600 mb-3 line-clamp-2">{e.description}</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-[13px] font-medium text-gray-500"><span className="inline-flex items-center gap-1.5"><Clock size={14} /> {e.time}</span><span className="inline-flex items-center gap-1.5"><MapPin size={14} /> {e.venue}</span></div>
                </div>
                <span className="hidden md:grid place-items-center w-11 h-11 rounded-full border border-gray-200 text-gray-500 group-hover:bg-primary-700 group-hover:border-primary-700 group-hover:text-white transition-colors"><ArrowUpRight size={18} /></span>
              </Link>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* News */}
      <section className="py-20 md:py-28">
        <div className="container-main">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <SectionHeader align="left" label="Stay informed" title="News & stories" subtitle="Updates from BFCN programmes, projects and community life." className="!mb-0" />
            <Button to="/news" variant="secondary" iconRight={ArrowRight} className="shrink-0">Read the newsroom</Button>
          </div>
          <ScrollReveal animation="stagger-children" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((a) => (
              <Card key={a.id} variant="elevated" to="/news">
                <MediaImage src={a.image} alt={a.title} Fallback={BookOpen} />
                <Card.Body>
                  <Card.Tag>{a.category}</Card.Tag>
                  <Card.Title>{a.title}</Card.Title>
                  <Card.Text>{a.excerpt}</Card.Text>
                  <Card.Meta><Card.MetaItem icon={Calendar}>{a.date}</Card.MetaItem></Card.Meta>
                </Card.Body>
              </Card>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-primary-800 relative overflow-hidden">
        <div className="absolute -right-40 -top-40 w-[520px] h-[520px] rounded-full bg-primary-700/50 blur-3xl" aria-hidden="true" />
        <div className="container-main relative">
          <ScrollReveal><SectionHeader light label="Real stories" title="In their own words" subtitle="People whose lives have been changed through BFCN programmes." /></ScrollReveal>
          <ScrollReveal animation="stagger-children" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {impactQuotes.map((item) => (
              <figure key={item.name} className="m-0 flex flex-col p-8 md:p-10 rounded-[20px] bg-white/[0.06] border border-white/10">
                <Quote size={32} className="text-accent-300 mb-6" strokeWidth={1.5} />
                <blockquote className="m-0 font-serif text-xl md:text-[1.4rem] text-white leading-snug mb-8 flex-1">{item.quote}</blockquote>
                <figcaption className="flex items-center gap-3">
                  <div className="grid place-items-center w-11 h-11 rounded-full bg-accent-400 text-primary-900 font-bold">{item.name.charAt(0)}</div>
                  <div>
                    <strong className="block text-white text-sm font-semibold">{item.name}</strong>
                    <span className="block text-white/55 text-[13px]">{item.role}</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="container-main">
          <ScrollReveal className="relative overflow-hidden rounded-[28px] bg-accent-50 border border-accent-100 px-6 py-14 md:px-16 md:py-20 text-center">
            <span className="eyebrow text-accent-700 mb-5"><span className="h-px w-6 bg-accent-400" />Get involved<span className="h-px w-6 bg-accent-400" /></span>
            <h2 className="font-serif text-4xl md:text-[3.25rem] leading-[1.05] text-gray-900 mb-5 max-w-[720px] mx-auto">Be part of the change.</h2>
            <p className="text-base md:text-lg text-gray-600 mb-10 leading-relaxed max-w-[560px] mx-auto">Join, volunteer, or support our programmes — every contribution builds a stronger community.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button to="/join" variant="primary" size="lg" iconRight={ArrowRight}>Join BFCN today</Button>
              <Button to="/volunteer" variant="secondary" size="lg">Volunteer with us</Button>
              <Button to="/support" variant="ghost" size="lg">Support our work</Button>
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
};

export default Home;
