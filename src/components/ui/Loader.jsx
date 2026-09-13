import { Skeleton, Spin } from 'antd';

export default function Loader({ size = 'md', text, fullPage = false }) {
  const spinner = <Spin size={size === 'md' ? 'default' : size} />;

  if (fullPage) {
    return <div className="fixed inset-0 flex items-center justify-center bg-white/90 z-40"><div className="flex flex-col items-center gap-4">{spinner}{text && <p className="text-sm text-gray-600">{text}</p>}</div></div>;
  }
  return <div className="flex flex-col items-center justify-center gap-4 py-8">{spinner}{text && <p className="text-sm text-gray-600">{text}</p>}</div>;
}

Loader.Skeleton = function Skeleton({ width, height = '20px', className = '' }) {
  return <Skeleton active paragraph={{ rows: 1 }} className={className} style={{ width: width || '100%', height }} />;
};

Loader.CardSkeleton = function CardSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200">
          <div className="skeleton-shimmer h-50 rounded-t-xl" />
          <div className="p-5 space-y-3">
            <div className="skeleton-shimmer h-3.5 w-2/5 rounded" />
            <div className="skeleton-shimmer h-5 w-4/5 rounded" />
            <div className="skeleton-shimmer h-3.5 rounded" />
            <div className="skeleton-shimmer h-3.5 w-3/5 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};
