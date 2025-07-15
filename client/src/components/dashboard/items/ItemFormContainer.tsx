import { useState } from 'react';
import { useItemForm } from '@/hooks/form/useItemForm';
import { useCategoriesStore } from '@/store/useCategoriesStore';
import { useCategoryModal } from '@/hooks/modals/useCategoryModal';
import { useItemsStore } from '@/store/useItemsStore';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Store hooks
  const { categories } = useCategoriesStore();
  const { addItem, updateItem } = useItemsStore();
  const { open: openCategoryModal } = useCategoryModal();

  // Handle form submission
  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      if (mode === 'add') {
        await addItem(formData);
      } else if (itemToEdit) {
        await updateItem(itemToEdit._id, formData);
      }
      onSuccess?.();
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form hook
  const {
    register,
    handleSubmit: handleFormSubmit,
    control,
    errors,
    watch,
    setValue,
    isDirty,
    imageRemoved,
    setImageRemoved,
  } = useItemForm(handleSubmit, itemToEdit);

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