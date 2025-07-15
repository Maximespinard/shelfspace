import { useState } from 'react';
import { toast } from 'sonner';
import { useItemForm } from '@/hooks/form/useItemForm';
import { useCategoryModal } from '@/hooks/modals/useCategoryModal';
import { ErrorService } from '@/services/error.service';
import { ItemService } from '@/services/item.service';
import { useCreateItem, useUpdateItem, useCategoriesQuery } from '@/hooks/queries';
import ItemForm from './ItemForm';
import type { ItemWithCategory } from '@/types/api';
import type { FormMode } from '@/types/forms';

interface ItemFormContainerProps {
  mode: FormMode;
  itemToEdit?: ItemWithCategory;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const ItemFormContainer = ({
  mode,
  itemToEdit,
  onSuccess,
  onCancel,
}: ItemFormContainerProps) => {
  // React Query hooks
  const { data: categories = [] } = useCategoriesQuery();
  const createItemMutation = useCreateItem();
  const updateItemMutation = useUpdateItem();
  const { open: openCategoryModal } = useCategoryModal();

  // Handle form submission
  async function handleSubmit(formData: FormData) {
    try {
      if (mode === 'add') {
        // Parse form data to get submit data
        const data = JSON.parse(formData.get('data') as string);
        const image = formData.get('image') as File | null;
        const submitData = { data, image: image || undefined };
        
        await createItemMutation.mutateAsync(submitData);
      } else if (itemToEdit) {
        // Parse form data to get submit data
        const data = JSON.parse(formData.get('data') as string);
        const image = formData.get('image') as File | null;
        const submitData = { data, image: image || undefined };
        
        await updateItemMutation.mutateAsync({
          id: itemToEdit._id,
          submitData,
          originalItem: itemToEdit,
        });
      }
      onSuccess?.();
    } catch (error) {
      ErrorService.handleFormError(error, setError, toast.error);
    }
  }

  // Form hook
  const {
    register,
    handleSubmit: handleFormSubmit,
    control,
    errors,
    watch,
    setValue,
    setError,
    isDirty,
    imageRemoved,
    setImageRemoved,
  } = useItemForm(handleSubmit, itemToEdit);

  const isSubmitting = createItemMutation.isPending || updateItemMutation.isPending;

  return (
    <ItemForm
      mode={mode}
      isSubmitting={isSubmitting}
      isDirty={isDirty}
      register={register}
      control={control}
      errors={errors}
      watch={watch}
      setValue={setValue}
      categories={categories}
      defaultImageUrl={itemToEdit?.imageUrl}
      onSubmit={handleFormSubmit}
      onCancel={onCancel}
      onCategoryManage={() => openCategoryModal('add')}
      onImageChange={(file) => setImageRemoved(file === null)}
    />
  );
};

export default ItemFormContainer;
