export const getStatusBadge = (status) => {
  const colors = {
    Approved: "bg-primary-50 text-primary-700 ring-primary-200",
    Pending: "bg-accent-50 text-accent-700 ring-accent-200",
    Rejected: "bg-red-50 text-red-700 ring-red-200",
  };
  return `inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full ring-1 ring-inset ${colors[status] ?? "bg-gray-100 text-gray-600 ring-gray-200"}`;
};

export const initialsOf = (name) =>
  (name || "")
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "??";

export const statusOptions = [
  { value: "Approved", label: "Approve", icon: CheckCircle2 },
  { value: "Pending", label: "Mark as pending", icon: Clock3 },
  { value: "Rejected", label: "Reject", icon: XCircle },
];

export const inputClass = (field) =>
  `w-full h-12 px-4 rounded-xl border ${
    errors[field] ? "border-red-400" : "border-gray-300"
  } bg-white text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_4px_rgba(23,96,63,0.12)] transition`;

export const textareaClass = (field) =>
  `w-full min-h-[120px] px-4 py-3 rounded-xl border ${
    errors[field] ? "border-red-400" : "border-gray-300"
  } bg-white text-[15px] leading-relaxed text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_4px_rgba(23,96,63,0.12)] transition resize-y`;
