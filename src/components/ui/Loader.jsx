import { Skeleton as AntSkeleton, Spin } from 'antd';

export default function Loader({ size = 'md', text, fullPage = false }) {
  const spinner = <Spin size={size === 'md' ? 'default' : size} />;
  const label = text && <p className="m-0 text-sm font-medium text-gray-500">{text}</p>;

  if (fullPage) {
    return <div className="fixed inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-40" role="status" aria-live="polite"><div className="flex flex-col items-center gap-4">{spinner}{label}</div></div>;
  }
  return <div className="flex flex-col items-center justify-center gap-4 py-12" role="status" aria-live="polite">{spinner}{label}</div>;
}

Loader.Skeleton = function LoaderSkeleton({ width, height = '20px', className = '' }) {
  return <AntSkeleton active paragraph={{ rows: 1 }} className={className} style={{ width: width || '100%', height }} />;
};

Loader.CardSkeleton = function CardSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="bg-white rounded-[20px] border border-gray-200 overflow-hidden">
          <div className="skeleton-shimmer aspect-[16/10]" />
          <div className="p-6 space-y-3">
            <div className="skeleton-shimmer h-3 w-1/4 rounded-full" />
            <div className="skeleton-shimmer h-5 w-4/5 rounded-full" />
            <div className="skeleton-shimmer h-3.5 rounded-full" />
            <div className="skeleton-shimmer h-3.5 w-3/5 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};
