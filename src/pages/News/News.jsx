import { useState } from "react";
import { Calendar, User, Search, BookOpen } from "lucide-react";
import { ScrollReveal, Card } from "../../components/ui";

const articles = [
  {
    id: 1,
    title: "BFCN Launches New Education Programme for Rural Communities",
    excerpt: "Bright Future Community Network announces a new education support programme targeting underserved rural communities in Oyo State.",
    date: "September 1, 2026",
    author: "BFCN Communications",
    category: "Education",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Youth Skills Workshop Records Highest Attendance",
    excerpt: "Over 120 young people participated in the 2026 Youth Skills Workshop, the highest attendance since inception.",
    date: "August 20, 2026",
    author: "BFCN Communications",
    category: "Youth Development",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "BFCN Partners with Local Government on Clean Water",
    excerpt: "A new partnership aims to bring clean water access to five underserved communities by Q4 2026.",
    date: "August 10, 2026",
    author: "BFCN Communications",
    category: "Community",
    image: "https://images.unsplash.com/photo-1538300342682-cf57afb97285?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Community Library Project Reaches Major Milestone",
    excerpt: "The BFCN Community Library has received its 2,000th book donation.",
    date: "July 28, 2026",
    author: "BFCN Communications",
    category: "Education",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Women Empowerment Programme Graduates First Cohort",
    excerpt: "Fifty women completed the first cohort gaining skills in soap making, tailoring, and business.",
    date: "July 15, 2026",
    author: "BFCN Communications",
    category: "Empowerment",
    image: "https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    title: "BFCN Calls for Volunteers for Health Outreach",
    excerpt: "Seeking healthcare professionals for the upcoming Community Health Fair in November 2026.",
    date: "July 5, 2026",
    author: "BFCN Communications",
    category: "Health",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=80",
  },
];

const News = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(articles.map((a) => a.category))];
  const filtered = articles.filter(
    (a) =>
      (category === "All" || a.category === category) &&
      a.title.toLowerCase().includes(search.toLowerCase()),
  );

  const [featured, ...rest] = filtered;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900">
        <div className="absolute -right-40 -top-40 w-[520px] h-[520px] rounded-full bg-primary-700/50 blur-3xl" aria-hidden="true" />
        <div className="container-main relative py-20 md:py-28">
          <ScrollReveal className="max-w-[760px]">
            <span className="eyebrow text-accent-300 mb-6"><span className="h-px w-8 bg-accent-300" />Stay informed</span>
            <h1 className="font-serif text-4xl md:text-6xl text-white leading-[1.05] mb-6">News &amp; updates</h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-[620px] m-0">
              Latest news from BFCN programmes, projects, and community
              activities.
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
                placeholder="Search news..."
                aria-label="Search news"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-11 pr-4 border border-gray-300 rounded-xl bg-white text-[15px] text-gray-900 focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_4px_rgba(23,96,63,0.12)] transition-all placeholder:text-gray-400"
              />
            </div>
            <div className="flex gap-2 flex-wrap" role="group" aria-label="Filter news by category">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={category === c}
                  className={`h-10 px-5 border rounded-full text-sm font-semibold cursor-pointer transition-colors ${category === c ? "bg-primary-800 text-white border-primary-800" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900"}`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {featured && (
            <ScrollReveal className="mb-6">
              <article className="group grid lg:grid-cols-[1.25fr_1fr] overflow-hidden rounded-[20px] border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[var(--shadow-lift)]">
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px] overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
                  {featured.image ? (
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`${featured.image ? "hidden" : "flex"} absolute inset-0 items-center justify-center text-primary-300`}
                  >
                    <BookOpen size={40} strokeWidth={1.5} />
                  </div>
                </div>
                <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-[0.14em] text-accent-600 mb-4">{featured.category}</span>
                  <h2 className="font-serif text-[1.75rem] md:text-[2.25rem] leading-[1.12] text-gray-900 mb-4">{featured.title}</h2>
                  <p className="text-base text-gray-600 leading-relaxed mb-0 max-w-[620px]">{featured.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-medium text-gray-500 mt-8 pt-5 border-t border-gray-100">
                    <span className="inline-flex items-center gap-1.5"><Calendar size={14} />{featured.date}</span>
                    <span className="inline-flex items-center gap-1.5"><User size={14} />{featured.author}</span>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          )}

          {rest.length > 0 && (
            <ScrollReveal
              animation="stagger-children"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {rest.map((a) => (
                <Card key={a.id} variant="elevated" className="h-full">
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
                    {a.image ? (
                      <img
                        src={a.image}
                        alt={a.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-[1.04]"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className={`${a.image ? "hidden" : "flex"} absolute inset-0 items-center justify-center text-primary-300`}
                    >
                      <BookOpen size={36} strokeWidth={1.5} />
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Tag>{a.category}</Card.Tag>
                    <Card.Title>{a.title}</Card.Title>
                    <Card.Text>{a.excerpt}</Card.Text>
                    <Card.Meta>
                      <Card.MetaItem icon={Calendar}>{a.date}</Card.MetaItem>
                      <Card.MetaItem icon={User}>{a.author}</Card.MetaItem>
                    </Card.Meta>
                  </Card.Body>
                </Card>
              ))}
            </ScrollReveal>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20 px-6 rounded-[20px] border border-dashed border-gray-300 bg-gray-50">
              <span className="grid place-items-center w-14 h-14 mx-auto mb-5 rounded-full bg-white text-primary-300 border border-gray-200">
                <BookOpen size={24} strokeWidth={1.75} />
              </span>
              <h3 className="font-serif text-2xl text-gray-900 m-0">No articles found</h3>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default News;