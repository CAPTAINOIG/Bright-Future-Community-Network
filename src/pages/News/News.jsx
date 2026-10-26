import { useState } from "react";
import { Calendar, User, Search, BookOpen, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { ScrollReveal, Card } from "../../components/ui";
import { useGetPublishedNews } from "../../api/news";

const CATEGORIES = [
  "All",
  "general",
  "politics",
  "education",
  "community",
  "youth",
  "health",
  "sports",
  "technology",
  "business",
  "entertainment",
  "security",
  "environment",
  "agriculture",
  "infrastructure",
  "religion",
  "opinion",
];

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const News = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: response, isLoading, isError, error } = useGetPublishedNews({
    page,
    limit,
    search,
    category,
    status: "published",
    sort: "latest",
  });

  const articles = response?.data?.news ?? [];
  const pagination = response?.data?.pagination ?? {};

  const [featured, ...rest] = articles;

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
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full h-12 pl-11 pr-4 border border-gray-300 rounded-xl bg-white text-[15px] text-gray-900 focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_4px_rgba(23,96,63,0.12)] transition-all placeholder:text-gray-400"
              />
            </div>
            <div className="flex gap-2 flex-wrap" role="group" aria-label="Filter news by category">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={category === c}
                  className={`h-10 px-5 border rounded-full text-sm font-semibold cursor-pointer transition-colors capitalize ${category === c ? "bg-primary-800 text-white border-primary-800" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900"}`}
                  onClick={() => {
                    setCategory(c);
                    setPage(1);
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="text-center py-20 px-6">
              <span className="grid place-items-center w-14 h-14 mx-auto mb-5 rounded-full bg-primary-50 text-primary-600">
                <Loader2 size={24} strokeWidth={1.75} className="animate-spin" />
              </span>
              <h3 className="font-serif text-2xl text-gray-900 m-0">Loading news...</h3>
            </div>
          )}

          {/* Error state */}
          {isError && !isLoading && (
            <div className="text-center py-20 px-6 rounded-[20px] border border-dashed border-red-200 bg-red-50">
              <span className="grid place-items-center w-14 h-14 mx-auto mb-5 rounded-full bg-white text-red-400 border border-red-200">
                <BookOpen size={24} strokeWidth={1.75} />
              </span>
              <h3 className="font-serif text-2xl text-gray-900 m-0">Unable to load news</h3>
              <p className="text-sm text-gray-500 mt-2">{error?.message || "Please try again later."}</p>
            </div>
          )}

          {/* Content */}
          {!isLoading && !isError && (
            <>
              {featured && (
                <ScrollReveal className="mb-6">
                  <article className="group grid lg:grid-cols-[1.25fr_1fr] overflow-hidden rounded-[20px] border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[var(--shadow-lift)]">
                    <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px] overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
                      {featured.imageUrl ? (
                        <img
                          src={featured.imageUrl}
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
                        className={`${featured.imageUrl ? "hidden" : "flex"} absolute inset-0 items-center justify-center text-primary-300`}
                      >
                        <BookOpen size={40} strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
                      <span className="inline-block text-[11px] font-bold uppercase tracking-[0.14em] text-accent-600 mb-4">{featured.category}</span>
                      <h2 className="font-serif text-[1.75rem] md:text-[2.25rem] leading-[1.12] text-gray-900 mb-4">{featured.title}</h2>
                      <p className="text-base text-gray-600 leading-relaxed mb-0 max-w-[620px]">{featured.summary}</p>
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-medium text-gray-500 mt-8 pt-5 border-t border-gray-100">
                        <span className="inline-flex items-center gap-1.5"><Calendar size={14} />{formatDate(featured.publishedAt)}</span>
                        <span className="inline-flex items-center gap-1.5"><User size={14} />{featured.author || featured.sourceName}</span>
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
                    <Card key={a._id} variant="elevated" className="h-full">
                      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
                        {a.imageUrl ? (
                          <img
                            src={a.imageUrl}
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
                          className={`${a.imageUrl ? "hidden" : "flex"} absolute inset-0 items-center justify-center text-primary-300`}
                        >
                          <BookOpen size={36} strokeWidth={1.5} />
                        </div>
                      </div>
                      <Card.Body>
                        <Card.Tag>{a.category}</Card.Tag>
                        <Card.Title>{a.title}</Card.Title>
                        <Card.Text>{a.summary}</Card.Text>
                        <Card.Meta>
                          <Card.MetaItem icon={Calendar}>{formatDate(a.publishedAt)}</Card.MetaItem>
                          <Card.MetaItem icon={User}>{a.author || a.sourceName}</Card.MetaItem>
                        </Card.Meta>
                      </Card.Body>
                    </Card>
                  ))}
                </ScrollReveal>
              )}

              {articles.length === 0 && (
                <div className="text-center py-20 px-6 rounded-[20px] border border-dashed border-gray-300 bg-gray-50">
                  <span className="grid place-items-center w-14 h-14 mx-auto mb-5 rounded-full bg-white text-primary-300 border border-gray-200">
                    <BookOpen size={24} strokeWidth={1.75} />
                  </span>
                  <h3 className="font-serif text-2xl text-gray-900 m-0">No articles found</h3>
                </div>
              )}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-12">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="h-10 w-10 grid place-items-center border border-gray-200 rounded-full bg-white text-gray-600 cursor-pointer transition-colors hover:border-gray-300 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-sm font-medium text-gray-600">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={page >= pagination.totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="h-10 w-10 grid place-items-center border border-gray-200 rounded-full bg-white text-gray-600 cursor-pointer transition-colors hover:border-gray-300 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Next page"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default News;