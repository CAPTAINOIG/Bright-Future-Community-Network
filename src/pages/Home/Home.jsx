import { Users, BookOpen, Briefcase, Calendar, ArrowRight, MapPin, Clock, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, SectionHeader, Card, ScrollReveal, Badge } from '../../components/ui';
import { events, impactQuotes, news, programmes, projects, stats } from './dummy';

const Home = () => {
  return (
    <div>
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-primary-800 via-primary-600 to-primary-700 overflow-hidden -mt-[72px] pt-[72px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,160,23,0.15)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05)_0%,transparent_40%)]" />
        <div className="absolute inset-0 hero-pattern" />
        <div className="container-main relative z-10 py-16 pb-24">
          <ScrollReveal className="text-center max-w-[800px] mx-auto">
            <div className="inline-flex items-center justify-center mb-8">
              <img src="/images/bfcn-logo.png" alt="BFCN Logo" className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-full object-contain border-4 border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] bg-white" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-[1.1]">
              Bright Future <span className="text-accent-300">Community</span> Network
            </h1>
            <p className="inline-block text-lg font-bold uppercase tracking-[0.1em] text-accent-400 mb-6 px-6 py-2 border-2 border-accent-400/40 rounded-full">Forward Together</p>
            <p className="text-base md:text-lg text-white/85 max-w-[600px] mx-auto mb-8 leading-relaxed">
              Empowering communities through sustainable development, youth empowerment, education, and grassroots leadership in Ogbomoso and across Oyo State, Nigeria.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button to="/join" variant="white" size="lg" iconRight={ArrowRight}>Join BFCN</Button>
              <Button to="/programmes" variant="white-outline" size="lg">Our Programmes</Button>
              <Button to="/volunteer" variant="ghost" size="lg" className="!text-white/90 hover:!bg-white/10">Get Involved</Button>
            </div>
          </ScrollReveal>
        </div>
        <div className="absolute bottom-[-1px] left-0 right-0 z-10 hero-wave">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" fill="white" /></svg>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="container-main">
          <ScrollReveal animation="stagger-children" className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center p-6 rounded-xl bg-white border border-gray-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 mb-4"><s.icon size={28} /></div>
                <span className="font-serif text-3xl font-bold text-primary-600 leading-none mb-2">{s.value}</span>
                <span className="text-sm text-gray-600 font-medium">{s.label}</span>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-main">
          <ScrollReveal><SectionHeader label="What We Do" title="Our Programmes" subtitle="We drive meaningful change through structured programmes that address community needs and empower people for a brighter future." /></ScrollReveal>
          <ScrollReveal animation="stagger-children" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programmes.map((p) => (
              <div key={p.title} className="p-6 bg-white rounded-xl border border-gray-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl mb-4" style={{ backgroundColor: `${p.color}15`, color: p.color }}><p.icon size={28} /></div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{p.description}</p>
                <Link to="/programmes" className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 no-underline hover:gap-2 transition-all">Learn More <ChevronRight size={16} /></Link>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>
      <section className="py-16 md:py-20">
        <div className="container-main">
          <ScrollReveal><SectionHeader label="Our Impact" title="Latest Projects" subtitle="From community libraries to clean water, our projects create lasting change." /></ScrollReveal>
          <ScrollReveal animation="stagger-children" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <Card key={p.id} variant="elevated">
                <div className="h-[200px] overflow-hidden rounded-t-xl bg-gradient-to-br from-primary-50 to-primary-100">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover rounded-t-xl transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`${p.image ? 'hidden' : 'flex'} items-center justify-center h-full text-primary-300`}><Briefcase size={40} /></div>
                </div>
                <Card.Body>
                  <div className="mb-3"><Badge.Status status={p.status} /></div>
                  <Card.Title>{p.title}</Card.Title>
                  <Card.Text>{p.description}</Card.Text>
                  <Card.Meta><Card.MetaItem icon={Users}>{p.beneficiaries}</Card.MetaItem></Card.Meta>
                </Card.Body>
              </Card>
            ))}
          </ScrollReveal>
          <div className="text-center mt-8"><Button to="/projects" variant="secondary" iconRight={ArrowRight}>View All Projects</Button></div>
        </div>
      </section>
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-main">
          <ScrollReveal><SectionHeader label="Join Us" title="Upcoming Events" subtitle="Be part of our community events, workshops, and activities." /></ScrollReveal>
          <ScrollReveal className="flex flex-col gap-4">
            {events.map((e) => (
              <div key={e.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-5 p-5 bg-white border border-gray-200 rounded-xl hover:translate-x-1 hover:shadow-md transition-all duration-300">
                <div className="flex md:flex-col items-center justify-center gap-2 md:gap-0 min-w-[60px] md:h-16 px-3 py-2 bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-lg shrink-0">
                  <span className="text-xl font-bold leading-none">{e.date.split(' ')[1]?.replace(',', '')}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider">{e.date.split(' ')[0]?.slice(0, 3)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-gray-900 mb-1">{e.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{e.description}</p>
                  <div className="flex gap-4 text-xs text-gray-500"><span className="inline-flex items-center gap-1"><Clock size={14} /> {e.time}</span><span className="inline-flex items-center gap-1"><MapPin size={14} /> {e.venue}</span></div>
                </div>
                <Button to="/events" variant="ghost" size="sm" iconRight={ChevronRight}>Details</Button>
              </div>
            ))}
          </ScrollReveal>
          <div className="text-center mt-8"><Button to="/events" variant="secondary" iconRight={ArrowRight}>View All Events</Button></div>
        </div>
      </section>
      <section className="py-16 md:py-20">
        <div className="container-main">
          <ScrollReveal><SectionHeader label="Stay Informed" title="Latest News" subtitle="Updates from BFCN programmes, projects, and community activities." /></ScrollReveal>
          <ScrollReveal animation="stagger-children" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((a) => (
              <Card key={a.id} variant="elevated" to="/news">
                <div className="h-[200px] overflow-hidden rounded-t-xl bg-gradient-to-br from-primary-50 to-primary-100">
                  {a.image ? (
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-full h-full object-cover rounded-t-xl transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`${a.image ? 'hidden' : 'flex'} items-center justify-center h-full text-primary-300`}><BookOpen size={36} /></div>
                </div>
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
      <section className="py-16 md:py-20 bg-primary-600">
        <div className="container-main">
          <ScrollReveal><SectionHeader light label="Real Stories" title="Community Impact" subtitle="Hear from the people whose lives have been transformed through BFCN programmes." /></ScrollReveal>
          <ScrollReveal animation="stagger-children" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {impactQuotes.map((item, i) => (
              <div key={i} className="p-8 bg-white/10 backdrop-blur-lg border border-white/15 rounded-xl">
                <div className="flex gap-1 text-accent-400 mb-4">{[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}</div>
                <blockquote className="text-base text-white/90 leading-relaxed italic mb-6">&ldquo;{item.quote}&rdquo;</blockquote>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-11 h-11 rounded-full bg-accent-400 text-white font-bold text-lg">{item.name.charAt(0)}</div>
                  <div>
                    <strong className="block text-white text-sm font-semibold">{item.name}</strong>
                    <span className="block text-white/60 text-xs">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50">
        <div className="container-main">
          <ScrollReveal className="text-center max-w-[700px] mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">Be Part of the Change</h2>
            <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">Whether you want to join, volunteer, or support our programmes, your contribution makes a real difference. Let&apos;s build a brighter future together.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button to="/join" variant="primary" size="xl" iconRight={ArrowRight}>Join BFCN Today</Button>
              <Button to="/volunteer" variant="secondary" size="xl">Volunteer With Us</Button>
              <Button to="/support" variant="accent" size="xl">Support Our Work</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

export default Home;
