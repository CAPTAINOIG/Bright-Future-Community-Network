import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Copy,
  Check,
  Eye,
  ExternalLink,
  Share2,
  User,
} from "lucide-react";
import { useGetNewsBySlug, useGetPublishedNews, useNewsViewsIncrement } from "../../api/news";
import {
  categoryOptions,
  getArticleText,
  getArticleUrl,
  getExcerpt,
  getImageUrl,
  getReadTime,
  getSourceName,
  normalizeUrl,
} from "../admin/News/UtilsNews";

/* ── Helpers ─────────────────────────────────────────────── */

const formatArticleDate = (dateString) => {
  if (!dateString) return "Date unavailable";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatShortDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const isAggregated = (article) => {
  // An article is aggregated if it has an external source URL
  const sourceUrl = getArticleUrl(article);
  return !!sourceUrl;
};

/* ── Share helpers ────────────────────────────────────────── */

const getShareUrl = () => typeof window !== "undefined" ? window.location.href : "";

const shareToWhatsApp = (title) => {
  window.open(
    `https://wa.me/?text=${encodeURIComponent(`${title}\n\n${getShareUrl()}`)}`,
    "_blank",
    "noopener"
  );
};

const shareToFacebook = () => {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`,
    "_blank",
    "noopener"
  );
};

const shareToX = (title) => {
  window.open(
    `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(getShareUrl())}`,
    "_blank",
    "noopener"
  );
};

/* ── Thumbnail fallback ──────────────────────────────────── */

const ArticleImage = ({ article }) => {
  const [failed, setFailed] = useState(false);
  const imageUrl = getImageUrl(article);

  useEffect(() => {
    setFailed(false);
  }, [imageUrl]);

  if (!imageUrl || failed) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 text-primary-300">
        <BookOpen size={56} strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={article?.title || "Article image"}
      loading="eager"
      onError={() => setFailed(true)}
      className="aspect-video w-full rounded-2xl object-cover"
    />
  );
};

/* ── Related article card ────────────────────────────────── */

const RelatedCard = ({ article }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const imageUrl = getImageUrl(article);

  return (
    <Link
      to={`/news/${article.slug}`}
      className="group flex gap-4 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"
    >
      {/* Thumbnail */}
      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-primary-100 to-primary-50">
        {imageUrl && !imgFailed ? (
          <img
            src={imageUrl}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-primary-300">
            <BookOpen size={18} strokeWidth={1.5} />
          </div>
        )}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <span className="text-xs font-bold capitalize text-accent-600">
          {article.category || "general"}
        </span>
        <h4 className="m-0 mt-1 line-clamp-2 font-serif text-[0.95rem] leading-snug text-gray-900 transition-colors group-hover:text-primary-700">
          {article.title}
        </h4>
        <p className="m-0 mt-1.5 text-xs text-gray-500">
          {formatShortDate(article.publishedAt)}
        </p>
      </div>
    </Link>
  );
};

/* ── Copy link button ────────────────────────────────────── */

const CopyLinkButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = getShareUrl();
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-primary-500 hover:text-primary-700"
      title="Copy link"
    >
      {copied ? <Check size={16} className="text-primary-600" /> : <Copy size={16} />}
      {copied ? "Copied!" : "Copy link"}
    </button>
  );
};

/* ── Skeleton ────────────────────────────────────────────── */

const ArticleSkeleton = () => (
  <div className="animate-pulse" aria-busy="true" aria-label="Loading article">
    <div className="container-main py-8">
      <div className="mx-auto max-w-[780px]">
        <div className="mb-6 h-4 w-32 rounded bg-gray-200" />
        <div className="mb-4 h-4 w-24 rounded-full bg-gray-200" />
        <div className="mb-3 h-10 w-full rounded bg-gray-200" />
        <div className="mb-6 h-10 w-3/4 rounded bg-gray-200" />
        <div className="mb-8 flex gap-4">
          <div className="h-4 w-28 rounded bg-gray-200" />
          <div className="h-4 w-28 rounded bg-gray-200" />
          <div className="h-4 w-20 rounded bg-gray-200" />
        </div>
        <div className="aspect-video w-full rounded-2xl bg-gray-200" />
        <div className="mt-10 space-y-4">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-5/6 rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-4/5 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════ */
/* NewsArticle page                                          */
/* ══════════════════════════════════════════════════════════ */

const NewsArticle = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const viewIncrementedRef = useRef(false);

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetNewsBySlug(slug);

  const article = response?.data?.news ?? response?.data ?? null;

  // Fetch related news from the same category
  const {
    data: relatedResponse,
  } = useGetPublishedNews({
    page: 1,
    limit: 5,
    category: article?.category || "All",
    status: "published",
    sort: "latest",
  });

  const relatedArticles = (relatedResponse?.data?.news ?? []).filter(
    (a) => a.slug !== slug
  ).slice(0, 4);

  // Increment view count once per mount
  const { mutate: incrementViews } = useNewsViewsIncrement(slug);

  useEffect(() => {
    if (slug && !viewIncrementedRef.current) {
      viewIncrementedRef.current = true;
      incrementViews();
    }
  }, [slug, incrementViews]);

  // Reset ref when slug changes
  useEffect(() => {
    viewIncrementedRef.current = false;
  }, [slug]);

  // Set document title
  useEffect(() => {
    if (article?.title) {
      document.title = `${article.title} — BFCN News`;
    }
    return () => {
      document.title = "BFCN News";
    };
  }, [article?.title]);

  /* ── Loading state ─── */
  if (isLoading) return <ArticleSkeleton />;

  /* ── Error state ─── */
  if (isError) {
    return (
      <div className="min-h-[60vh]">
        <div className="container-main py-20 text-center">
          <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full border border-gray-200 bg-white text-red-400">
            <BookOpen size={24} strokeWidth={1.75} />
          </div>
          <h2 className="m-0 font-serif text-2xl text-gray-900">
            Article not found
          </h2>
          <p className="mx-auto mb-0 mt-2 max-w-[420px] text-sm text-gray-500">
            {error?.response?.status === 404
              ? "This article may have been removed or the link is incorrect."
              : error?.message || "Something went wrong. Please try again."}
          </p>
          <button
            type="button"
            onClick={() => navigate("/news")}
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-primary-800 px-5 text-sm font-semibold text-white transition hover:bg-primary-700"
          >
            <ArrowLeft size={16} />
            Back to News
          </button>
        </div>
      </div>
    );
  }

  /* ── No article ─── */
  if (!article) {
    return (
      <div className="min-h-[60vh]">
        <div className="container-main py-20 text-center">
          <h2 className="m-0 font-serif text-2xl text-gray-900">
            Article not found
          </h2>
          <button
            type="button"
            onClick={() => navigate("/news")}
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-primary-800 px-5 text-sm font-semibold text-white transition hover:bg-primary-700"
          >
            <ArrowLeft size={16} />
            Back to News
          </button>
        </div>
      </div>
    );
  }

  const sourceUrl = getArticleUrl(article);
  const sourceName = getSourceName(article);
  const readTime = getReadTime(article);
  const aggregated = isAggregated(article);
  const articleContent = article?.content?.trim() || "";
  const articleSummary = article?.summary?.trim() || "";

  return (
    <div className="min-h-screen bg-white">
      {/* ── Breadcrumb / Back ── */}
      <div className="border-b border-gray-100 bg-gray-50/60">
        <div className="container-main py-3">
          <button
            type="button"
            onClick={() => navigate("/news")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-primary-700"
          >
            <ArrowLeft size={16} />
            Back to News
          </button>
        </div>
      </div>

      <article className="container-main py-8 md:py-12">
        <div className="mx-auto max-w-[780px]">

          {/* ── Category ── */}
          <div className="mb-5">
            <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-bold capitalize text-primary-800">
              {article.category || "general"}
            </span>
            {article.featured && (
              <span className="ml-2 inline-flex items-center rounded-full bg-accent-100 px-3 py-1 text-xs font-bold text-accent-700">
                ★ Featured
              </span>
            )}
          </div>

          {/* ── Headline ── */}
          <h1 className="m-0 font-serif text-[2rem] leading-[1.15] text-gray-900 md:text-[2.75rem]">
            {article.title}
          </h1>

          {/* ── Meta row ── */}
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1.5 font-semibold text-gray-700">
              <User size={15} className="text-gray-400" />
              {sourceName}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Calendar size={15} className="text-gray-400" />
              {formatArticleDate(article.publishedAt)}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Clock size={15} className="text-gray-400" />
              {readTime}
            </span>

            {article.views != null && (
              <span className="inline-flex items-center gap-1.5">
                <Eye size={15} className="text-gray-400" />
                {article.views.toLocaleString()} views
              </span>
            )}
          </div>

          {/* ── Source attribution ── */}
          {aggregated && (
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-primary-100 bg-primary-50/50 px-4 py-3">
              <ExternalLink size={16} className="shrink-0 text-primary-600" />
              <p className="m-0 text-sm text-gray-700">
                Originally published by{" "}
                <span className="font-semibold text-gray-900">{sourceName}</span>
                {sourceUrl && (
                  <>
                    {" · "}
                    <a
                      href={sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-primary-700 hover:underline"
                    >
                      View original article →
                    </a>
                  </>
                )}
              </p>
            </div>
          )}

          {/* ── Featured image ── */}
          <div className="mt-8">
            <ArticleImage article={article} />
          </div>

          {/* ── Article body ── */}
          <div className="mt-10">
            {/* Summary section */}
            {articleSummary && (
              <div className="mb-8 border-l-4 border-primary-600 pl-5">
                <p className="m-0 text-[1.1rem] font-medium leading-relaxed text-gray-800">
                  {articleSummary}
                </p>
              </div>
            )}

            {/* Full content — only for non-aggregated (BFCN original) articles */}
            {!aggregated && articleContent && articleContent !== articleSummary && (
              <div className="prose-bfcn">
                <p className="m-0 whitespace-pre-line text-[1.05rem] leading-[1.85] text-gray-700">
                  {articleContent}
                </p>
              </div>
            )}

            {/* For aggregated articles, show a prominent CTA to read the original */}
            {aggregated && (
              <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-8 text-center">
                <p className="m-0 mb-2 text-sm font-medium text-gray-500">
                  This article was originally published by{" "}
                  <span className="font-semibold text-gray-800">{sourceName}</span>
                </p>
                <p className="m-0 mb-5 text-sm text-gray-500">
                  To respect the publisher's copyright, we encourage you to read the full article on their site.
                </p>
                {sourceUrl && (
                  <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-primary-800 px-6 text-sm font-semibold text-white no-underline transition hover:bg-primary-700"
                  >
                    <ExternalLink size={16} />
                    Read original article
                  </a>
                )}
              </div>
            )}
          </div>

          {/* ── Share section ── */}
          <div className="mt-10 border-t border-gray-200 pt-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="mr-1 inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Share2 size={16} />
                Share
              </span>

              <button
                type="button"
                onClick={() => shareToWhatsApp(article.title)}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-green-500 hover:text-green-700"
                title="Share on WhatsApp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </button>

              <button
                type="button"
                onClick={shareToFacebook}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-blue-500 hover:text-blue-700"
                title="Share on Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </button>

              <button
                type="button"
                onClick={() => shareToX(article.title)}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-700 hover:text-gray-900"
                title="Share on X"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                Post
              </button>

              <CopyLinkButton />
            </div>
          </div>

          {/* ── Related news ── */}
          {relatedArticles.length > 0 && (
            <div className="mt-12 border-t border-gray-200 pt-10">
              <h2 className="m-0 mb-6 border-b-2 border-primary-800 pb-3 font-serif text-xl text-gray-900">
                Related stories
              </h2>

              <div className="space-y-0 divide-y divide-gray-100">
                {relatedArticles.map((related) => (
                  <div key={related._id || related.slug} className="py-4 first:pt-0 last:pb-0">
                    <RelatedCard article={related} />
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link
                  to="/news"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-gray-300 px-5 text-sm font-semibold text-gray-700 no-underline transition hover:border-primary-600 hover:text-primary-800"
                >
                  <ArrowLeft size={16} />
                  All news stories
                </Link>
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default NewsArticle;
