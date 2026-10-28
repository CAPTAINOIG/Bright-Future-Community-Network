import { CheckCircle2, Clock3, XCircle } from "lucide-react";

export const getStatusBadge = (status) => {
  const map = {
    published: { className: 'bg-primary-50 text-primary-700 ring-primary-200' },
    Published: { className: 'bg-primary-50 text-primary-700 ring-primary-200' },
    pending: { className: 'bg-yellow-50 text-yellow-700 ring-yellow-200' },
    Draft: { className: 'bg-gray-100 text-gray-600 ring-gray-200' },
    draft: { className: 'bg-gray-100 text-gray-600 ring-gray-200' },
    rejected: { className: 'bg-red-50 text-red-600 ring-red-200' },
    archived: { className: 'bg-gray-100 text-gray-600 ring-gray-200' },
    Archived: { className: 'bg-gray-100 text-gray-600 ring-gray-200' },
  };
  return `inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full ring-1 ring-inset whitespace-nowrap capitalize ${map[status]?.className ?? 'bg-gray-100 text-gray-600 ring-gray-200'}`;
};

export const statusOptions = [
    { value: 'published', label: 'Published', icon: CheckCircle2 },
    { value: 'pending', label: 'Mark as pending', icon: Clock3 },
    { value: 'rejected', label: 'Rejected', icon: XCircle },
    { value: 'archived', label: 'Archived', icon: XCircle },
  ];
  export const categoryOptions = [
    { value: 'All', label: 'All categories' },
    { value: 'general', label: 'General' },
    { value: 'politics', label: 'Politics' },
    { value: 'education', label: 'Education' },
    { value: 'community', label: 'Community' },
    { value: 'youth', label: 'Youth' },
    { value: 'health', label: 'Health' },
    { value: 'sports', label: 'Sports' },   
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'security', label: 'Security' },
    { value: 'environment', label: 'Environment' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'religion', label: 'Religion' },
    { value: 'opinion', label: 'Opinion' },
    { value: 'other', label: 'Other' },
  ];

  export const normalizeUrl = (value) => {
  if (typeof value !== "string" || !value.trim()) return "";

  const input = value.trim();
  const markdownMatch = input.match(/\]\((https?:\/\/[^)\s]+)\)/i);
  const plainMatch = input.match(/https?:\/\/\S+/i);
  const candidate = (markdownMatch?.[1] || plainMatch?.[0] || input)
    .replace(/&amp;/gi, "&")
    .replace(/\\&/g, "&")
    .replace(/[)\],.]+$/, "");

  try {
    const parsed = new URL(candidate);
    return ["http:", "https:"].includes(parsed.protocol) ? parsed.href : "";
  } catch {
    return "";
  }
};

export const getArticleUrl = (article) => normalizeUrl(article?.sourceUrl);

export const getImageUrl = (article) =>
  normalizeUrl(article?.imageUrl || article?.image);

export const getSourceName = (article) =>
  article?.author || article?.sourceName || "BFCN News";

export const getArticleText = (article) =>
  article?.summary?.trim() || article?.content?.trim() || "";

export const getExcerpt = (article, maxLength = 170) => {
  const text = getArticleText(article);
  if (!text) return "Open the original story to read more.";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
};

export const formatDate = (dateString) => {
  if (!dateString) return "Date unavailable";
};

export const getReadTime = (article) => {
  const words = getArticleText(article).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

