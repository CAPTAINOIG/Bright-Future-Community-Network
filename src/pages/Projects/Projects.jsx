import { useState } from 'react';
import { Briefcase, Users, MapPin, Search } from 'lucide-react';
import { ScrollReveal, Card, Badge } from '../../components/ui';

const projects = [
  { id: 1, title: 'Community Library Project', status: 'Ongoing', description: 'Establishing a well-equipped community library with 5,000+ books and computers.', beneficiaries: '500+ Students', location: 'Ogbomoso South', outcomes: ['Library renovated', '2,000+ books donated', 'Internet installed'], image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80' },
  { id: 2, title: 'Youth Skills Workshop 2026', status: 'Completed', description: 'Three-day intensive workshop covering digital skills, tailoring, and agribusiness.', beneficiaries: '120 Youth', location: 'Ogbomoso', outcomes: ['120 youth trained', '35 started businesses', '15 secured employment'], image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=80' },
  { id: 3, title: 'Clean Water Initiative', status: 'Planned', description: 'Borehole construction in 5 underserved communities for clean drinking water.', beneficiaries: '2,000+ Residents', location: 'Ogbomoso Area', outcomes: [], image: 'https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=800&auto=format&fit=crop&q=80' },
  { id: 4, title: 'School Renovation Project', status: 'Completed', description: 'Complete renovation of 3 primary schools including roofing, painting, and furniture.', beneficiaries: '800 Students', location: 'Ogbomoso North', outcomes: ['3 schools renovated', '240 desks provided', '6 toilet facilities'], image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&auto=format&fit=crop&q=80' },
  { id: 5, title: 'Women Empowerment Workshop', status: 'Ongoing', description: '6-month skills acquisition for 50 women in soap making, bead making, and business.', beneficiaries: '50 Women', location: 'Ogbomoso', outcomes: ['50 women enrolled', '30 completed first module'], image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=80' },
  { id: 6, title: 'Community Health Outreach', status: 'Planned', description: 'Free medical checkups, health education, and basic medication across 10 communities.', beneficiaries: '1,500+ People', location: 'Multiple Communities', outcomes: [], image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&auto=format&fit=crop&q=80' },
];

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const statuses = ['All', 'Planned', 'Ongoing', 'Completed'];
  const filtered = projects.filter(p => (filter === 'All' || p.status === filter) && (p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase())));

  return (
    <div>
      <section className="relative py-24 bg-gradient-to-br from-primary-800 to-primary-600 overflow-hidden -mt-[72px] pt-[calc(72px+4rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,160,23,0.12)_0%,transparent_50%)]" />
        <div className="container-main relative z-10"><ScrollReveal className="text-center max-w-[700px] mx-auto"><span className="inline-block text-sm font-semibold uppercase tracking-[0.1em] text-accent-400 mb-4">Our Impact</span><h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Projects</h1><p className="text-base text-white/85 max-w-[560px] mx-auto">Concrete actions creating real change in our communities.</p></ScrollReveal></div>
        <div className="absolute bottom-[-1px] left-0 right-0 z-10 hero-wave"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" fill="white" /></svg></div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="relative flex-1 max-w-[360px]">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full py-3 px-4 pl-10 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_3px_rgba(27,94,32,0.12)] transition-all placeholder:text-gray-400" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {statuses.map(s => <button key={s} className={`px-4 py-2 border rounded-full text-sm font-medium cursor-pointer transition-all ${filter === s ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-200 hover:border-primary-600 hover:text-primary-600'}`} onClick={() => setFilter(s)}>{s}</button>)}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16"><Briefcase size={48} className="text-gray-300 mb-4 mx-auto" /><h3 className="text-lg font-bold">No projects found</h3><p className="text-gray-600">Try adjusting your search or filter.</p></div>
          ) : (
            <ScrollReveal animation="stagger-children" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
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
                    {p.outcomes.length > 0 && (
                      <div className="mt-3"><strong className="text-xs text-primary-600 uppercase tracking-wider">Key Outcomes:</strong><ul className="list-none p-0 mt-2">{p.outcomes.map((o, i) => <li key={i} className="text-xs text-gray-600 py-1">✓ {o}</li>)}</ul></div>
                    )}
                    <Card.Meta><Card.MetaItem icon={Users}>{p.beneficiaries}</Card.MetaItem><Card.MetaItem icon={MapPin}>{p.location}</Card.MetaItem></Card.Meta>
                  </Card.Body>
                </Card>
              ))}
            </ScrollReveal>
          )}
        </div>
      </section>
    </div>
  );
}

export default Projects;
