import { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight, BookOpen, ArrowUpRight, X } from "lucide-react";
import { useGetPublishedNews } from "../../api/news";
import { categoryOptions, formatDate, getArticleText, getArticleUrl, getExcerpt, getImageUrl, getSourceName, normalizeUrl, getReadTime } from "../admin/News/UtilsNews";

const PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 350;


const timeAgo = (dateString) => {
  if (!dateString) return "Date unavailable";
  
  const timestamp = new Date(dateString).getTime();
  if (Number.isNaN(timestamp)) return "Date unavailable";
  
  const minutes = Math.max(0, Math.floor((Date.now() - timestamp) / 60000));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;
  
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  
  return formatDate(dateString);
};
// const date = new Date(dateString);

//  if (Number.isNaN(date.getTime())) return "Date unavailable";

//  return date.toLocaleDateString("en-GB", {
//    day: "numeric",
//    month: "short",
//    year: "numeric",
//  });

const useDebouncedValue = (value, delay = SEARCH_DEBOUNCE_MS) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(
      () => setDebouncedValue(value),
      delay
    );

    return () => window.clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
};

const scrollToTop = () => {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

/* -------------------------------------------------------------------------- */
/* Reusable components                                                        */
/* -------------------------------------------------------------------------- */

const Thumb = ({
  article,
  alt = "",
  className = "",
  iconSize = 32,
  imageClassName = "",
}) => {
  const [failed, setFailed] = useState(false);
  const imageUrl = getImageUrl(article);

  useEffect(() => {
    setFailed(false);
  }, [imageUrl]);

  return (
    <div
      className={`relative isolate overflow-hidden bg-gradient-to-br from-primary-100 to-primary-50 ${className}`}
    >
      {imageUrl && !failed ? (
        <img
          src={imageUrl}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${imageClassName}`}
        />
      ) : (
        <div
          className="absolute inset-0 grid place-items-center text-primary-300"
          aria-hidden="true"
        >
          <BookOpen size={iconSize} strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
};

const Tag = ({ children, onDark = false }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold capitalize ${
      onDark
        ? "bg-accent-300 text-primary-900"
        : "bg-primary-50 text-primary-800"
    }`}
  >
    {children || "general"}
  </span>
);

const Byline = ({ article, light = false }) => (
  <div
    className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] ${
      light ? "text-white/75" : "text-gray-500"
    }`}
  >
    <span className={`font-semibold ${light ? "text-white" : "text-gray-700"}`}>
      {getSourceName(article)}
    </span>
    <span aria-hidden="true" className="opacity-50">
      ·
    </span>
    <time dateTime={article?.publishedAt || undefined}>
      {timeAgo(article?.publishedAt)}
    </time>
    <span aria-hidden="true" className="opacity-50">
      ·
    </span>
    <span>{getReadTime(article)}</span>
  </div>
);

const SourceLink = ({ article, children = "Read story", className = "" }) => {
  const href = getArticleUrl(article);
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
};

/* -------------------------------------------------------------------------- */
/* Story layouts                                                              */
/* -------------------------------------------------------------------------- */

const LeadStory = ({ article }) => (
  <article>
    <SourceLink
      article={article}
      className="group relative block min-h-[420px] overflow-hidden rounded-3xl bg-primary-900 focus-visible:outline focus-visible:outline-4 focus-visible:outline-accent-300 lg:min-h-[560px]"
      aria-label={`Read original story: ${article.title}`}
    >
      <Thumb
        article={article}
        alt=""
        className="absolute inset-0 h-full"
        iconSize={56}
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/70 to-transparent"
        aria-hidden="true"
      />

      <div className="relative flex min-h-[420px] flex-col justify-end p-6 md:p-10 lg:min-h-[560px]">
        <div className="mb-4">
          <Tag onDark>{article.category}</Tag>
        </div>

        <h2 className="m-0 max-w-[760px] font-serif text-[1.9rem] leading-[1.1] text-white md:text-5xl">
          {article.title}
        </h2>

        <p className="mb-5 mt-4 line-clamp-3 max-w-[640px] text-base leading-relaxed text-white/80">
          {getExcerpt(article, 260)}
        </p>

        <Byline article={article} light />
      </div>
    </SourceLink>
  </article>
);

const LatestList = ({ items }) => (
  <aside aria-label="More top stories" className="flex flex-col">
    <h3 className="m-0 border-b-2 border-primary-800 pb-3 font-serif text-xl text-gray-900">
      Also making news
    </h3>

    <ul className="m-0 flex list-none flex-col divide-y divide-gray-200 p-0">
      {items.map((article) => (
        <li key={article._id || article.slug || article.title}>
          <SourceLink
            article={article}
            className="group flex gap-4 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"
            aria-label={`Read original story: ${article.title}`}
          >
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold capitalize text-accent-600">
                {article.category || "general"}
              </span>

              <h4 className="m-0 mt-1 line-clamp-3 font-serif text-[1.05rem] leading-snug text-gray-900 transition-colors group-hover:text-primary-700">
                {article.title}
              </h4>

              <p className="m-0 mt-2 text-xs text-gray-500">
                {timeAgo(article.publishedAt)}
              </p>
            </div>

            <Thumb
              article={article}
              alt=""
              className="h-20 w-24 shrink-0 rounded-xl"
              iconSize={20}
            />
          </SourceLink>
        </li>
      ))}
    </ul>
  </aside>
);

const StoryCard = ({ article }) => (
  <article className="min-w-0">
    <SourceLink
      article={article}
      className="group flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"
      aria-label={`Read original story: ${article.title}`}
    >
      <Thumb
        article={article}
        alt=""
        className="aspect-[3/2] rounded-2xl"
      />

      <div className="flex flex-1 flex-col pt-5">
        <div className="mb-3">
          <Tag>{article.category}</Tag>
        </div>

        <h3 className="m-0 font-serif text-[1.35rem] leading-tight text-gray-900 transition-colors group-hover:text-primary-700">
          {article.title}
        </h3>

        <p className="mb-5 mt-3 line-clamp-3 text-[15px] leading-relaxed text-gray-600">
          {getExcerpt(article, 190)}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
          <Byline article={article} />

          <span aria-hidden="true">
            <ArrowUpRight
              size={16}
              className="shrink-0 text-gray-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-700"
            />
          </span>
        </div>
      </div>
    </SourceLink>
  </article>
);

const Skeleton = () => (
  <div aria-busy="true" aria-label="Loading news" className="animate-pulse">
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="min-h-[420px] rounded-3xl bg-gray-200 lg:col-span-8 lg:min-h-[560px]" />

      <div className="space-y-6 lg:col-span-4">
        {[0, 1, 2].map((item) => (
          <div key={item} className="flex gap-4">
            <div className="flex-1 space-y-3">
              <div className="h-3 w-16 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 w-4/5 rounded bg-gray-200" />
            </div>
            <div className="h-20 w-24 rounded-xl bg-gray-200" />
          </div>
        ))}
      </div>
    </div>

    <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((item) => (
        <div key={item}>
          <div className="aspect-[3/2] rounded-2xl bg-gray-200" />
          <div className="mt-5 h-5 rounded bg-gray-200" />
          <div className="mt-3 h-5 w-3/4 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  </div>
);

const Message = ({ tone = "neutral", title, children, action }) => (
  <div
    className={`rounded-3xl border border-dashed px-6 py-20 text-center ${
      tone === "error"
        ? "border-red-200 bg-red-50"
        : "border-gray-300 bg-gray-50"
    }`}
    role={tone === "error" ? "alert" : "status"}
  >
    <span className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full border border-gray-200 bg-white text-primary-400">
      <BookOpen size={24} strokeWidth={1.75} />
    </span>

    <h3 className="m-0 font-serif text-2xl text-gray-900">{title}</h3>

    <p className="mx-auto mb-0 mt-2 max-w-[420px] text-sm text-gray-500">
      {children}
    </p>

    {action}
  </div>
);

/* -------------------------------------------------------------------------- */
/* Pagination                                                                 */
/* -------------------------------------------------------------------------- */

const getPageNumbers = (currentPage, totalPages) => {
  const pages = new Set([
    1,
    totalPages,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ]);

  return [...pages]
    .filter((number) => number >= 1 && number <= totalPages)
    .sort((a, b) => a - b);
};

const Pagination = ({ page, pagination, onPageChange }) => {
  const totalPages = Number(pagination?.totalPages) || 1;
  const total = pagination?.total;
  const pageNumbers = getPageNumbers(page, totalPages);

  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="News pagination"
      className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-gray-200 pt-8 sm:flex-row"
    >
      <p className="m-0 text-sm font-medium text-gray-600">
        Page <span className="font-bold text-gray-900">{page}</span> of{" "}
        <span className="font-bold text-gray-900">{totalPages}</span>
        {total != null && <span> · {total} articles</span>}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
          className="inline-flex h-10 items-center gap-1 rounded-full border border-gray-300 px-3 text-sm font-semibold text-gray-700 transition hover:border-primary-600 hover:text-primary-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={18} />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {pageNumbers.map((number, index) => {
          const previousNumber = pageNumbers[index - 1];
          const hasGap = index > 0 && number - previousNumber > 1;

          return (
            <span key={number} className="contents">
              {hasGap && (
                <span aria-hidden="true" className="px-1 text-gray-400">
                  …
                </span>
              )}

              <button
                type="button"
                aria-label={`Go to page ${number}`}
                aria-current={page === number ? "page" : undefined}
                onClick={() => onPageChange(number)}
                className={`h-10 min-w-10 rounded-full px-3 text-sm font-bold transition ${
                  page === number
                    ? "bg-primary-800 text-white"
                    : "border border-gray-200 text-gray-600 hover:border-primary-500 hover:text-primary-800"
                }`}
              >
                {number}
              </button>
            </span>
          );
        })}

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
          className="inline-flex h-10 items-center gap-1 rounded-full border border-gray-300 px-3 text-sm font-semibold text-gray-700 transition hover:border-primary-600 hover:text-primary-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </nav>
  );
};

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

const News = () => {
  const [searchInput, setSearchInput] = useState("");
  const search = useDebouncedValue(searchInput);
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const {
    data: response,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetPublishedNews({
    page,
    limit: PAGE_SIZE,
    search,
    category,
    status: "published",
    sort: "latest",
  });

  const articles = response?.data?.news ?? [];
  const pagination = response?.data?.pagination ?? {};

  const [lead, ...otherArticles] = articles;
  const sidebar = otherArticles.slice(0, 3);
  const grid = otherArticles.slice(3);

  const resetFilters = () => {
    setSearchInput("");
    setCategory(categoryOptions[0].value);
    setPage(1);
  };

  const changePage = (nextPage) => {
    const totalPages = Number(pagination?.totalPages) || 1;
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;

    setPage(nextPage);
    scrollToTop();
  };

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Masthead */}
      <header className="bg-primary-900">
        <div className="container-main py-14 md:py-20">
          <p className="m-0 mb-3 text-sm font-medium text-accent-300">
            {today}
          </p>

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <h1 className="m-0 font-serif text-5xl leading-none text-white md:text-7xl">
                The BFCN Newsroom
              </h1>

              <p className="mb-0 mt-5 max-w-[520px] text-lg leading-relaxed text-white/70">
                Stories from our programmes, our communities and the issues
                shaping them.
              </p>
            </div>

            <div className="relative w-full lg:max-w-[400px]">
              <Search
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
              />

              <input
                type="search"
                aria-label="Search news"
                placeholder="Search stories"
                value={searchInput}
                onChange={(event) => {
                  setSearchInput(event.target.value);
                  setPage(1);
                }}
                className="h-12 w-full rounded-full border border-white/20 bg-white/10 pl-11 pr-11 text-[15px] text-white placeholder:text-white/50 transition focus:border-accent-300 focus:bg-white/15 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
              />

              {searchInput && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => {
                    setSearchInput("");
                    setPage(1);
                  }}
                  className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sticky category navigation */}
      <nav
        aria-label="News categories"
        className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur"
      >
        <div className="container-main">
          <div className="flex gap-1 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categoryOptions.map((item) => {
              const active = category === item.value;
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setCategory(item.value);
                    setPage(1);
                  }}
                  className={`h-9 shrink-0 cursor-pointer rounded-full px-4 text-sm font-semibold capitalize transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600 ${
                    active
                      ? "bg-primary-800 text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="container-main py-10 md:py-14">
        {isLoading && <Skeleton />}

        {isError && !isLoading && (
          <Message
            tone="error"
            title="We couldn't load the news"
            action={
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 h-10 rounded-full bg-primary-800 px-5 text-sm font-semibold text-white transition hover:bg-primary-700"
              >
                Try again
              </button>
            }
          >
            {error?.message || "Check your connection and try again."}
          </Message>
        )}

        {!isLoading && !isError && articles.length === 0 && (
          <Message
            title="No stories match your search"
            action={
              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 h-10 cursor-pointer rounded-full bg-primary-800 px-5 text-sm font-semibold text-white hover:bg-primary-700"
              >
                Clear filters
              </button>
            }
          >
            Try a different word or choose another category.
          </Message>
        )}

        {!isLoading && !isError && lead && (
          <>
            {/* Lead story and latest headlines */}
            <section
              aria-label="Top stories"
              className={`grid gap-10 lg:grid-cols-12 ${
                isFetching ? "opacity-70 transition-opacity" : ""
              }`}
              aria-busy={isFetching}
            >
              <div className="lg:col-span-8">
                <LeadStory article={lead} />
              </div>

              {sidebar.length > 0 && (
                <div className="lg:col-span-4">
                  <LatestList items={sidebar} />
                </div>
              )}
            </section>

            {/* Additional story cards */}
            {grid.length > 0 && (
              <section aria-label="More stories" className="mt-16">
                <h2 className="m-0 mb-8 border-b-2 border-primary-800 pb-3 font-serif text-2xl text-gray-900">
                  {category === categoryOptions[0].value ? "More stories" : `More in ${category}`}
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                  {grid.map((article) => (
                    <StoryCard
                      key={article._id || article.slug || article.title}
                      article={article}
                    />
                  ))}
                </div>
              </section>
            )}

            <Pagination
              page={page}
              pagination={pagination}
              onPageChange={changePage}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default News;
