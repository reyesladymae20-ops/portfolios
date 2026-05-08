export default function Loading() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Title Skeleton */}
        <div className="h-10 bg-gray-200 rounded mb-4 w-3/4 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded mb-12 w-1/2 animate-pulse" />

        {/* Content Skeleton */}
        <div className="space-y-4 mb-12">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
        </div>

        {/* More content skeleton */}
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
        </div>
      </div>
    </div>
  );
}
