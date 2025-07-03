import { Skeleton } from '@/components/ui/shadcn/skeleton';

const ItemCardSkeleton = () => {
  return (
    <div className="w-full h-[380px] relative rounded-xl border shadow-sm overflow-hidden bg-white flex flex-col">
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-muted">
        <Skeleton className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-1 gap-2">
        <div>
          <Skeleton className="h-4 w-3/4 mb-2" />
          <div className="flex justify-between text-xs mb-2">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-5 w-20 rounded-md" />
        </div>

        <div className="flex justify-end pt-2">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ItemCardSkeleton;
