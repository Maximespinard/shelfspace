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
import { useCategoryModal } from '@/hooks/useCategoryModal';
import { useCategoriesStore } from '@/store/useCategoriesStore';
import { type NewCategory } from '@/schemas/category.schema';

const CategoryModal = () => {
  const { isOpen, mode, categoryToEdit, close, open } = useCategoryModal();
  const { categories, addCategory, updateCategory, deleteCategory } =
    useCategoriesStore();

  const [editMode, setEditMode] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && categoryToEdit) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [mode, categoryToEdit]);

  const handleSubmit = async (data: NewCategory) => {
    setIsSubmitting(true);
    if (mode === 'edit' && categoryToEdit) {
      await updateCategory(categoryToEdit._id, data);
      open('add');
      setEditMode(false);
    } else {
      await addCategory(data);
    }
    setIsSubmitting(false);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    open('add');
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    await deleteCategory(id);
    setIsDeleting(null);
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
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          cancelEdit={handleCancelEdit}
          categoryToEdit={categoryToEdit}
        />

        {categories.length > 0 && mode === 'add' && (
          <CategoryList
            categories={categories}
            onEdit={(cat) => open('edit', cat)}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
