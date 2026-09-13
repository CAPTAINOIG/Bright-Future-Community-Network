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

  return (
    <div>
      <section className="relative py-24 bg-gradient-to-br from-primary-800 to-primary-600 overflow-hidden -mt-[72px] pt-[calc(72px+4rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,160,23,0.12)_0%,transparent_50%)]" />
        <div className="container-main relative z-10">
          <ScrollReveal className="text-center max-w-[700px] mx-auto">
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.1em] text-accent-400 mb-4">
              Stay Informed
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              News & Updates
            </h1>
            <p className="text-base text-white/85 max-w-[560px] mx-auto">
              Latest news from BFCN programmes, projects, and community
              activities.
            </p>
          </ScrollReveal>
        </div>
        <div className="absolute bottom-[-1px] left-0 right-0 z-10 hero-wave">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path
              d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="relative flex-1 max-w-[360px]">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search news..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-3 px-4 pl-10 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:border-primary-600 transition-all placeholder:text-gray-400"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((c) => (
                <button
                  key={c}
                  className={`px-4 py-2 border rounded-full text-sm font-medium cursor-pointer transition-all ${category === c ? "bg-primary-600 text-white border-primary-600" : "bg-white text-gray-600 border-gray-200 hover:border-primary-600 hover:text-primary-600"}`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <ScrollReveal
            animation="stagger-children"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((a) => (
              <Card key={a.id} variant="elevated">
                <div className="h-[200px] overflow-hidden rounded-t-xl bg-gradient-to-br from-primary-50 to-primary-100">
                  {a.image ? (
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-full h-full object-cover rounded-t-xl transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`${a.image ? "hidden" : "flex"} items-center justify-center h-full text-primary-300`}
                  >
                    <BookOpen size={36} />
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
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <BookOpen size={48} className="text-gray-300 mx-auto" />
              <h3 className="mt-4">No articles found</h3>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default News;