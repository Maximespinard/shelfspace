import { Pencil, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/shadcn/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
} from '@/components/ui/shadcn/alert-dialog';
import type { Category } from '../types/category.types';

interface Props {
  categories: Category[];
  isDeleting: string | null;
  onEdit: (cat: Category) => void;
  onDelete: (id: string) => void;
}

export const CategoryList = ({
  categories,
  isDeleting,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div className="space-y-2 pt-4 border-t">
      <p className="text-sm font-medium">Your Categories</p>
      <div className="space-y-2">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="flex items-center justify-between px-3 py-2 border rounded-md bg-muted"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-sm">{cat.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" onClick={() => onEdit(cat)}>
                <Pencil className="w-4 h-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will permanently delete this category.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(cat._id)}
                      disabled={isDeleting === cat._id}
                    >
                      {isDeleting === cat._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        'Delete'
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
