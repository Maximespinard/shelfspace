import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/shadcn/dialog';
import { CategoryForm } from './CategoryForm';
import { CategoryList } from './CategoryList';
import { useCategoryModal } from '../hooks/useCategoryModal';
import {
  useCategoriesQuery,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from '../hooks/useCategoriesQuery';
import { type NewCategory } from '../schemas/category.schema';

const CategoryModal = () => {
  const { isOpen, mode, categoryToEdit, close, open } = useCategoryModal();
  const { data: categories = [] } = useCategoriesQuery();
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const [editMode, setEditMode] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (mode === 'edit' && categoryToEdit) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [mode, categoryToEdit]);

  const handleSubmit = async (data: NewCategory) => {
    if (mode === 'edit' && categoryToEdit) {
      await updateCategoryMutation.mutateAsync({
        id: categoryToEdit._id,
        data,
      });
      open('add');
      setEditMode(false);
    } else {
      await createCategoryMutation.mutateAsync(data);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    open('add');
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteCategoryMutation.mutateAsync(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent
        className="max-w-md space-y-6"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Edit Category' : 'Manage Categories'}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Add and manage your personal categories. Each must be unique.
          </DialogDescription>
        </DialogHeader>

        <CategoryForm
          editMode={editMode}
          mode={mode}
          isSubmitting={
            createCategoryMutation.isPending || updateCategoryMutation.isPending
          }
          onSubmit={handleSubmit}
          cancelEdit={handleCancelEdit}
          categoryToEdit={categoryToEdit}
        />

        {categories.length > 0 && mode === 'add' && (
          <CategoryList
            categories={categories}
            onEdit={(cat) => open('edit', cat)}
            onDelete={handleDelete}
            isDeleting={deletingId}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
