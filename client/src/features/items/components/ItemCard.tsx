import { useRef, useState, memo } from 'react';
import { Pencil, Trash2, Loader2, Info, RotateCw } from 'lucide-react';
import { format } from 'date-fns';
import { useItemModal } from '../hooks/useItemModal';
import { useDeleteItem } from '../hooks/useItemsQuery';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import type { ItemWithCategory } from '../types/item.types';
import { Button } from '@/components/ui/shadcn/button';
import { Badge } from '@/components/ui/shadcn/badge';
import MotionDiv from '@/components/ui/animated/MotionDiv';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/shadcn/alert-dialog';
import { blurThen, cn } from '@/lib/utils';

interface ItemCardProps {
  item: ItemWithCategory;
  index?: number;
}

const ItemCard = ({ item, index = 0 }: ItemCardProps) => {
  const { open, isOpen: isItemModalOpen } = useItemModal();
  const deleteItemMutation = useDeleteItem();

  const [isFlipped, setIsFlipped] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    cardRef,
    () => setIsFlipped(false),
    isFlipped,
    isItemModalOpen
  );

  const handleDelete = async () => {
    await deleteItemMutation.mutateAsync(item._id);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <MotionDiv variant="zoomIn" delay={index * 0.05}>
      <div
        ref={cardRef}
        className="[perspective:1000px] w-full h-[380px] relative"
      >
        <div
          className={`transition-transform duration-500 relative w-full h-full [transform-style:preserve-3d] ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-sm border bg-white flex flex-col">
            <div className="aspect-square bg-muted overflow-hidden relative">
              {/* Loading skeleton */}
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 bg-muted animate-pulse">
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10" />
                </div>
              )}

              <img
                src={
                  imageError
                    ? '/item-placeholder.svg'
                    : item.imageUrl ?? '/item-placeholder.svg'
                }
                alt={item.title}
                className={cn(
                  'w-full h-full object-cover transition-opacity duration-300',
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                )}
                loading="lazy"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </div>

            <div className="p-4 flex flex-col gap-2 flex-1 justify-between">
              <div>
                <h3 className="font-semibold text-base truncate">
                  {item.title}
                </h3>
                <div className="text-xs text-muted-foreground flex justify-between mt-1">
                  {item.price !== undefined && <span>${item.price}</span>}
                  {item.acquisitionDate && (
                    <span>
                      {format(new Date(item.acquisitionDate), 'dd MMM yyyy')}
                    </span>
                  )}
                </div>
                {item.category ? (
                  <Badge
                    className="mt-2"
                    style={
                      {
                        '--category-color': item.category.color,
                        backgroundColor: 'var(--category-color)',
                      } as React.CSSProperties
                    }
                  >
                    {item.category.name}
                  </Badge>
                ) : (
                  <p className="text-xs italic mt-2 text-muted-foreground">
                    No category
                  </p>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setIsFlipped(true)}
                >
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full [transform:rotateY(180deg)] backface-hidden rounded-xl overflow-hidden shadow-sm border bg-white flex flex-col">
            <div className="p-4 flex flex-col justify-between flex-1 gap-2">
              <div className="space-y-1 text-sm text-muted-foreground overflow-y-auto max-h-[280px] pr-1 scrollbar-thin">
                <h3 className="font-semibold text-base text-foreground">
                  {item.title}
                </h3>
                {item.description ? (
                  <p className="whitespace-pre-wrap">{item.description}</p>
                ) : (
                  <p className="italic text-xs">No description provided.</p>
                )}
              </div>

              <div className="flex justify-between items-end pt-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsFlipped(false)}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={(e) => {
                      blurThen(e);
                      open('edit', item);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="icon" variant="outline">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete this item?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          disabled={deleteItemMutation.isPending}
                        >
                          {deleteItemMutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            'Delete'
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default memo(ItemCard, (prevProps, nextProps) => {
  // Only re-render if item data has actually changed
  return (
    prevProps.item._id === nextProps.item._id &&
    prevProps.item.updatedAt === nextProps.item.updatedAt &&
    prevProps.index === nextProps.index
  );
});
