
import {
  CalendarDays,
  Clock,
  ExternalLink,
  Eye,
  FileText,
  Globe,
  Hash,
  Image as ImageIcon,
  MapPin,
  Newspaper,
  Pencil,
  ShieldAlert,
  Sparkles,
  Tag,
  ThumbsUp,
  UserRound,
  X,
} from 'lucide-react';

import { Button } from '../../../components/ui';
import {
  DetailItem,
  SectionLabel,
  pillClass,
} from '../components/AdminUI';

const formatDate = (date, includeTime = false) => {
  if (!date) return '—';

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return '—';

  return parsed.toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...(includeTime
      ? { hour: '2-digit', minute: '2-digit' }
      : {}),
  });
};

const NewsDetails = ({ news, onEdit, onClose }) => {
  if (!news) return null;
  const articleId = (news._id ?? '')
    .toString()
    .slice(-6)
    .toUpperCase();

  const status = news.status || (news.published ? 'published' : 'pending');

  const statusVariant = {
    published: 'success',
    pending: 'warning',
    rejected: 'danger',
    archived: 'neutral',
  };

  const isPublished =
    status === 'published' || news.published === true;

  const sourceUrl = news.sourceUrl || news.normalizedSourceUrl;
  const imageUrl = news.imageUrl || news.image;
  const content = news.content || news.summary;
  const author = news.author || news.sourceName || 'Unknown source';

  const categories = {
    security: 'Security',
    politics: 'Politics',
    education: 'Education',
    community: 'Community',
    business: 'Business',
    health: 'Health',
    technology: 'Technology',
    sports: 'Sports',
    entertainment: 'Entertainment',
  };

  const category = categories[
    (news.category || '').toLowerCase()
  ] || news.category || 'Uncategorized';

  return (
    <div className="space-y-6">
      {/* Article header */}
      <div className="border-b border-gray-100 pb-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className={pillClass(statusVariant[status] || 'neutral')}>
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isPublished ? 'bg-primary-600' : 'bg-gray-400'
              }`}
            />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>

          <span className={pillClass('neutral')}>
            <ShieldAlert size={12} />
            {category}
          </span>

          {news.featured && (
            <span className={pillClass('success')}>
              <Sparkles size={12} />
              Featured
            </span>
          )}
        </div>

        <h3 className="m-0 font-serif text-2xl font-semibold leading-tight text-gray-900 sm:text-3xl">
          {news.title || 'Untitled news article'}
        </h3>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-gray-500">
          <span className="inline-flex items-center gap-1.5">
            <Hash size={13} />
            {articleId || '—'}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={13} />
            {formatDate(news.publishedAt)}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <UserRound size={13} />
            {author}
          </span>
        </div>
      </div>

      {/* Article image */}
      {imageUrl ? (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
          <img
            src={imageUrl}
            alt={news.title || 'News article'}
            className="max-h-80 w-full object-cover"
            referrerPolicy="no-referrer"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
        </div>
      ) : (
        <div className="flex min-h-36 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-200 bg-gray-50 text-gray-400">
          <ImageIcon size={28} strokeWidth={1.5} />
          <p className="m-0 text-sm">No article image available</p>
        </div>
      )}

      {/* Article content */}
      <section className="space-y-3">
        <SectionLabel>Article summary</SectionLabel>

        <p className="m-0 rounded-xl bg-gray-50 px-4 py-4 text-[15px] leading-7 text-gray-700">
          {news.summary || 'No summary available.'}
        </p>

        {news.content && news.content !== news.summary && (
          <>
            <SectionLabel>Article content</SectionLabel>

            <div className="rounded-xl border border-gray-100 px-4 py-4">
              <p className="m-0 whitespace-pre-line text-[15px] leading-7 text-gray-700">
                {news.content}
              </p>
            </div>
          </>
        )}
      </section>

      {/* Source details */}
      <section className="space-y-4">
        <SectionLabel>Source information</SectionLabel>

        <dl className="m-0 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <DetailItem
            icon={Newspaper}
            label="News source"
            value={news.sourceName || news.author}
          />

          <DetailItem
            icon={UserRound}
            label="Author / Publisher"
            value={author}
          />

          <DetailItem
            icon={Tag}
            label="Category"
            value={category}
          />

          <DetailItem
            icon={MapPin}
            label="Location"
            value={news.location}
          />

          <DetailItem
            icon={Globe}
            label="Language"
            value={news.language?.toUpperCase()}
          />

          <DetailItem
            icon={Clock}
            label="Published on"
            value={formatDate(news.publishedAt, true)}
          />

          <DetailItem
            icon={CalendarDays}
            label="Collected on"
            value={formatDate(news.collectedAt, true)}
          />

          <DetailItem
            icon={CalendarDays}
            label="Last updated"
            value={formatDate(news.updatedAt, true)}
          />
        </dl>

        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex max-w-full items-center gap-2 break-all text-sm font-semibold text-primary-700 hover:underline"
          >
            <ExternalLink size={15} className="shrink-0" />
            Read original article
          </a>
        )}
      </section>

      {/* Internal record */}
      <section className="space-y-4">
        <SectionLabel>Record information</SectionLabel>

        <dl className="m-0 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <DetailItem
            icon={FileText}
            label="Article slug"
            value={news.slug}
          />

          <DetailItem
            icon={Hash}
            label="Source ID"
            value={news.sourceId}
          />

          <DetailItem
            icon={Eye}
            label="Views"
            value={news.views ?? 0}
          />

          <DetailItem
            icon={ThumbsUp}
            label="Likes"
            value={news.likes ?? 0}
          />
        </dl>

        <div className="rounded-xl border border-gray-100 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Publication settings
          </p>

          <div className="flex flex-wrap gap-2">
            <span className={pillClass(isPublished ? 'success' : 'neutral')}>
              {isPublished ? 'Published' : 'Not published'}
            </span>

            <span className={pillClass(news.featured ? 'success' : 'neutral')}>
              {news.featured ? 'Featured article' : 'Not featured'}
            </span>
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onClose}
          icon={X}
          fullWidth
        >
          Close
        </Button>

        {sourceUrl && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => window.open(sourceUrl, '_blank', 'noopener,noreferrer')}
            icon={ExternalLink}
            fullWidth
          >
            Original article
          </Button>
        )}

        <Button
          type="button"
          variant="primary"
          size="lg"
          icon={Pencil}
          onClick={onEdit}
          fullWidth
        >
          Edit news
        </Button>
      </div>
    </div>
  );
};

export default NewsDetails;