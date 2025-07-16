import { useState, useCallback, useEffect } from 'react';
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
import { itemFormSchema } from '../schemas/item.schema';
import { ItemService } from '../services/item.service';
import type { ItemWithCategory } from '../types/item.types';
import type { ItemFormValues } from '../types/item.form';

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

  // Reset form when item changes
  useEffect(() => {
    if (itemToEdit) {
      reset({
        ...ItemService.itemToFormValues(itemToEdit),
        image: undefined,
      });
    } else {
      reset({
        title: '',
        description: '',
        price: null,
        acquisitionDate: '',
        category: '',
        image: undefined,
      });
    }
    setImageRemoved(false);
  }, [itemToEdit, reset]);

  // Custom isDirty that includes image changes
  const isFormDirty = useCallback(() => {
    if (itemToEdit) {
      // Check if image was removed (had image, now removed)
      const hadImage = !!itemToEdit.imageUrl;
      const imageWasRemoved = hadImage && imageRemoved;
      
      // Check if new image was added
      const newImageAdded = !!watch('image');
      
      // Form is dirty if:
      // 1. React Hook Form detects changes in other fields
      // 2. Image was removed from an item that had an image
      // 3. A new image was added
      return isDirty || imageWasRemoved || newImageAdded;
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
