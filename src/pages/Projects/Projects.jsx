import { useState } from 'react';
import { Briefcase, Users, MapPin, Search, CheckCircle } from 'lucide-react';
import { ScrollReveal, Card, Badge } from '../../components/ui';

const projects = [
  {
    id: 1,
    title: "Community Library Project",
    status: "Ongoing",
    description: "Establishing a well-equipped community library with 5,000+ books and computers.",
    beneficiaries: "500+ Students",
    location: "Ogbomoso South",
    outcomes: ["Library renovated", "2,000+ books donated", "Internet installed"],
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Youth Skills Workshop 2026",
    status: "Completed",
    description: "Three-day intensive workshop covering digital skills, tailoring, and agribusiness.",
    beneficiaries: "120 Youth",
    location: "Ogbomoso",
    outcomes: ["120 youth trained", "35 started businesses", "15 secured employment"],
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Clean Water Initiative",
    status: "Planned",
    description: "Borehole construction in 5 underserved communities for clean drinking water.",
    beneficiaries: "2,000+ Residents",
    location: "Ogbomoso Area",
    outcomes: [],
    image: "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "School Renovation Project",
    status: "Completed",
    description: "Complete renovation of 3 primary schools including roofing, painting, and furniture.",
    beneficiaries: "800 Students",
    location: "Ogbomoso North",
    outcomes: ["3 schools renovated", "240 desks provided", "6 toilet facilities"],
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Women Empowerment Workshop",
    status: "Ongoing",
    description: "6-month skills acquisition for 50 women in soap making, bead making, and business.",
    beneficiaries: "50 Women",
    location: "Ogbomoso",
    outcomes: ["50 women enrolled", "30 completed first module"],
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    title: "Community Health Outreach",
    status: "Planned",
    description: "Free medical checkups, health education, and basic medication across 10 communities.",
    beneficiaries: "1,500+ People",
    location: "Multiple Communities",
    outcomes: [],
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const statuses = ["All", "Planned", "Ongoing", "Completed"];
  const filtered = projects.filter((p) => (filter === "All" || p.status === filter) &&
      (p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase())));

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900">
        <div className="absolute -right-40 -top-40 w-[520px] h-[520px] rounded-full bg-primary-700/50 blur-3xl" aria-hidden="true" />
        <div className="container-main relative py-20 md:py-28">
          <ScrollReveal className="max-w-[760px]">
            <span className="eyebrow text-accent-300 mb-6"><span className="h-px w-8 bg-accent-300" />Our impact</span>
            <h1 className="font-serif text-4xl md:text-6xl text-white leading-[1.05] mb-6">Projects</h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-[620px] m-0">
              Concrete actions creating real change in our communities.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-main">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 mb-12">
            <div className="relative w-full lg:max-w-[380px]">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search projects..."
                aria-label="Search projects"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-11 pr-4 border border-gray-300 rounded-xl bg-white text-[15px] text-gray-900 focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_4px_rgba(23,96,63,0.12)] transition-all placeholder:text-gray-400"
              />
            </div>
            <div className="flex gap-2 flex-wrap" role="group" aria-label="Filter projects by status">
              {statuses.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={filter === s}
                  className={`h-10 px-5 border rounded-full text-sm font-semibold cursor-pointer transition-colors ${filter === s ? "bg-primary-800 text-white border-primary-800" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900"}`}
                  onClick={() => setFilter(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 px-6 rounded-[20px] border border-dashed border-gray-300 bg-gray-50">
              <span className="grid place-items-center w-14 h-14 mx-auto mb-5 rounded-full bg-white text-primary-300 border border-gray-200">
                <Briefcase size={24} strokeWidth={1.75} />
              </span>
              <h3 className="font-serif text-2xl text-gray-900 mb-2">No projects found</h3>
              <p className="text-[15px] text-gray-600 m-0">
                Try adjusting your search or filter.
              </p>
            </div>
          ) : (
            <ScrollReveal
              animation="stagger-children"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((p) => (
                <Card key={p.id} variant="elevated" className="h-full">
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-[1.04]"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className={`${p.image ? "hidden" : "flex"} absolute inset-0 items-center justify-center text-primary-300`}
                    >
                      <Briefcase size={40} strokeWidth={1.5} />
                    </div>
                  </div>
                  <Card.Body>
                    <div className="mb-4">
                      <Badge.Status status={p.status} />
                    </div>
                    <Card.Title>{p.title}</Card.Title>
                    <Card.Text>{p.description}</Card.Text>
                    {p.outcomes.length > 0 && (
                      <div className="mt-5 rounded-xl bg-gray-50 p-4">
                        <strong className="block text-[11px] font-bold text-primary-700 uppercase tracking-[0.14em]">
                          Key outcomes
                        </strong>
                        <ul className="list-none p-0 m-0 mt-3 space-y-2">
                          {p.outcomes.map((o, i) => (
                            <li key={i} className="flex items-start gap-2 text-[13px] text-gray-600 leading-snug">
                              <CheckCircle size={14} className="mt-0.5 shrink-0 text-primary-600" aria-hidden="true" />
                              {o}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <Card.Meta>
                      <Card.MetaItem icon={Users}>
                        {p.beneficiaries}
                      </Card.MetaItem>
                      <Card.MetaItem icon={MapPin}>{p.location}</Card.MetaItem>
                    </Card.Meta>
                  </Card.Body>
                </Card>
              ))}
            </ScrollReveal>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
