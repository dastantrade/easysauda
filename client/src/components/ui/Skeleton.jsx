export function Skeleton({ className = '' }) {
  return (
    <div className={`bg-dark-border/50 rounded-lg animate-pulse ${className}`} />
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-6">
      <Skeleton className="w-full h-48 mb-4" />
      <Skeleton className="w-20 h-5 mb-3 rounded-full" />
      <Skeleton className="w-3/4 h-6 mb-2" />
      <Skeleton className="w-full h-4 mb-1" />
      <Skeleton className="w-2/3 h-4 mb-4" />
      <div className="flex gap-4 mb-4">
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-20 h-4" />
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-dark-border">
        <Skeleton className="w-24 h-7" />
        <Skeleton className="w-24 h-9 rounded-lg" />
      </div>
    </div>
  );
}

export function LessonSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="w-full aspect-video rounded-xl" />
      <Skeleton className="w-2/3 h-8" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-3/4 h-4" />
    </div>
  );
}

export function TableRowSkeleton({ cols = 4 }) {
  return (
    <tr className="border-b border-dark-border/50">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="py-3 px-4">
          <Skeleton className="w-full h-4" />
        </td>
      ))}
    </tr>
  );
}
