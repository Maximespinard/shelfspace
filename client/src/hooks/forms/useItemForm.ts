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
      typeof defaultValues?.category === 'object'
        ? defaultValues.category._id
        : defaultValues?.category ?? '',
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

    formData.append('title', data.title.trim());

    if (data.description?.trim())
      formData.append('description', data.description.trim());
    if (data.price && data.price > 0)
      formData.append('price', data.price.toString());
    if (data.acquisitionDate) {
      const isoDate = new Date(data.acquisitionDate).toISOString();
      formData.append('acquisitionDate', isoDate);
    }
    if (data.image) formData.append('image', data.image);
    if (data.category?.trim())
      formData.append('category', data.category.trim());

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
