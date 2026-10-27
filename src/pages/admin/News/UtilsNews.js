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