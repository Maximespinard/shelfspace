import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  itemFormSchema,
  type ExistingItem,
  type ItemFormSchema,
} from '@/schemas/item.schema';

/**
 * RHF + Zod hook for the Item form.
 * - Accepts ExistingItem defaults (object category) OR nothing.
 * - Always exposes form values with `category` as a string ID.
 * - Wraps handleSubmit to convert ItemFormSchema -> NewItem.
 */
export function useItemForm(
  onSubmit: (data: FormData) => void,
  defaultValues?: Partial<ExistingItem>
) {
  const normalisedDefaults: ItemFormSchema = {
    title: defaultValues?.title ?? '',
    description: defaultValues?.description ?? '',
    price: defaultValues?.price ?? 0,
    acquisitionDate: defaultValues?.acquisitionDate
      ? defaultValues.acquisitionDate.split('T')[0]
      : '',
    image: null,
    category:
      defaultValues?.category && typeof defaultValues.category === 'object'
        ? defaultValues.category._id
        : typeof defaultValues?.category === 'string'
        ? defaultValues.category
        : '',
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ItemFormSchema>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: normalisedDefaults,
  });

  const handleAndConvert = handleSubmit((data) => {
    const formData = new FormData();

    const json = {
      title: data.title.trim().toLowerCase(),
      description: data.description?.trim() || null,
      price: data.price ?? 0,
      acquisitionDate: data.acquisitionDate
        ? new Date(data.acquisitionDate).toISOString()
        : null,
      category: data.category || null,
    };

    formData.append('data', JSON.stringify(json));
    if (data.image) formData.append('image', data.image);

    onSubmit(formData);
  });

  return {
    register,
    handleSubmit: handleAndConvert,
    reset,
    watch,
    setValue,
    errors,
    isSubmitting,
    isDirty,
    control,
  };
}
