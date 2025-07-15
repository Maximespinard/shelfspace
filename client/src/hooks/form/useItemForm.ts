import { useState, useCallback } from 'react';
import {
  useForm,
  type UseFormRegister,
  type UseFormWatch,
  type UseFormSetValue,
  type UseFormSetError,
  type Control,
  type FieldErrors,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { itemFormSchema } from '@/schemas/item.schema';
import { ItemService } from '@/services/item.service';
import type { ItemWithCategory } from '@/types/api';
import type { ItemFormValues } from '@/types/forms';

interface UseItemFormReturn {
  // Form methods
  register: UseFormRegister<ItemFormValues>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => void;
  reset: () => void;
  watch: UseFormWatch<ItemFormValues>;
  setValue: UseFormSetValue<ItemFormValues>;
  setError: UseFormSetError<ItemFormValues>;
  control: Control<ItemFormValues>;

  // Form state
  errors: FieldErrors<ItemFormValues>;
  isSubmitting: boolean;
  isDirty: boolean;

  // Image handling
  imageRemoved: boolean;
  setImageRemoved: (removed: boolean) => void;
}

export function useItemForm(
  onSubmit: (data: FormData) => void | Promise<void>,
  itemToEdit?: ItemWithCategory | null
): UseItemFormReturn {
  const [imageRemoved, setImageRemoved] = useState(false);

  // Prepare default values
  const defaultValues = itemToEdit
    ? {
        ...ItemService.itemToFormValues(itemToEdit),
        image: undefined,
      }
    : {
        title: '',
        description: '',
        price: null,
        acquisitionDate: '',
        category: '',
        image: undefined,
      };

  // Initialize form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ItemFormValues>({
    resolver: zodResolver(itemFormSchema),
    defaultValues,
  });

  // Custom isDirty that includes image removal
  const isFormDirty = useCallback(() => {
    if (itemToEdit) {
      return (
        isDirty || (imageRemoved && !!itemToEdit.imageUrl) || !!watch('image')
      );
    }
    return isDirty;
  }, [isDirty, imageRemoved, itemToEdit, watch]);


  // Submit handler wrapper
  const handleFormSubmit = handleSubmit(async (formValues) => {
    let submitData;

    if (itemToEdit) {
      // Update mode
      submitData = ItemService.prepareUpdateData(
        formValues,
        itemToEdit,
        imageRemoved
      );
    } else {
      // Create mode
      submitData = ItemService.prepareCreateData(formValues);
    }

    // Convert to FormData
    const formData = ItemService.createFormData(submitData);

    // Call the provided handler
    await onSubmit(formData);
  });

  return {
    // Form methods
    register,
    handleSubmit: handleFormSubmit,
    reset,
    watch,
    setValue,
    setError,
    control,

    // Form state
    errors,
    isSubmitting,
    isDirty: isFormDirty(),

    // Image handling
    imageRemoved,
    setImageRemoved,
  };
}
