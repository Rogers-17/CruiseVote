import { Skeleton } from '../ui/skeleton';

export default function Loader() {
  const skeletonCards = Array.from({ length: 8 });

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {skeletonCards.map((_, index) => (
        <div key={index} className="cursor-pointer space-y-3">
          <Skeleton className="relative aspect-video overflow-hidden rounded-2xl"></Skeleton>
        </div>
      ))}
    </div>
  );
}
