import { Skeleton } from '../ui/skeleton';

export default function Loader() {
  const skeletonCards = Array.from({ length: 4 });

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {skeletonCards.map((_, index) => (
        <Skeleton key={index} className="cursor-pointer space-y-3 rounded-4xl">
          <Skeleton className="rounded-4xl p-6">
            <Skeleton className="mb-4 flex items-start justify-between">
              <Skeleton className="h-4 w-50 bg-gray-500 text-xl" />
              <Skeleton className="h-4 w-12.5 bg-gray-500 text-xl" />
            </Skeleton>

            <Skeleton className="mb-2 h-6 w-62.5 bg-gray-500" />

            <Skeleton className="flex items-center gap-2">
              <Skeleton className="h-6 w-62.5 bg-gray-500" />
            </Skeleton>

            <Skeleton className="mt-5 uppercase transition-transform group-hover:translate-x-1">
              <Skeleton className="h-10 w-full bg-gray-500" />
            </Skeleton>
          </Skeleton>
        </Skeleton>
      ))}
    </div>
  );
}
