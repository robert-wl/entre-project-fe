import { Skeleton } from "./ui/skeleton";

const TripCardSkeleton = () => {
  return (
    <div className="w-full max-w-sm  p-4 rounded-2xl shadow-lg">
      <div className="gap-4 min-h-32">
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-6 w-1/2" />
      </div>
      <div className="w-full text-right mt-4">
        <Skeleton className="h-2 w-24 ml-auto" />
      </div>
    </div>
  );
};

export default TripCardSkeleton;
