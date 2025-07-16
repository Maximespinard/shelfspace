import { toast } from 'sonner';
import { useItemForm } from '../../hooks/useItemForm';
import { useCategoryModal } from '../../../categories/hooks/useCategoryModal';
import { ErrorService } from '@/services/error.service';
import { useCreateItem, useUpdateItem } from '../../hooks/useItemsQuery';
import { useCategoriesQuery } from '../../../categories/hooks/useCategoriesQuery';
import ItemForm from './ItemForm';
import type { ItemWithCategory } from '../../types/item.types';
import type { FormMode } from '../../types/item.form';

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
        await createItemMutation.mutateAsync(formData);
      } else if (itemToEdit) {
        await updateItemMutation.mutateAsync({
          id: itemToEdit._id,
          formData,
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
      defaultImageUrl={itemToEdit?.imageUrl || undefined}
      onSubmit={handleFormSubmit}
      onCancel={onCancel}
      onCategoryManage={() => openCategoryModal('add')}
      onImageChange={(file) => {
        setValue('image', file || undefined);
        setImageRemoved(file === null && !!itemToEdit?.imageUrl);
      }}
    />
  );
};

export default ItemFormContainer;
