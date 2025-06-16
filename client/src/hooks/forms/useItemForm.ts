import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  itemFormSchema,
  type ExistingItem,
  type ItemFormSchema,
  type NewItem,
} from '@/schemas/item.schema';

/**
 * RHF + Zod hook for the Item form.
 * - Accepts ExistingItem defaults (object category) OR nothing.
 * - Always exposes form values with `category` as a string ID.
 * - Wraps handleSubmit to convert ItemFormSchema -> NewItem.
 */
export function useItemForm(
  onSubmit: (data: NewItem) => void,
  defaultValues?: Partial<ExistingItem>
) {
  const normalisedDefaults: ItemFormSchema = {
    title: defaultValues?.title ?? '',
    description: defaultValues?.description ?? '',
    price: defaultValues?.price ?? 0,
    acquisitionDate: defaultValues?.acquisitionDate
      ? defaultValues.acquisitionDate.split('T')[0]
      : '',
    imageUrl: defaultValues?.imageUrl ?? '',
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
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ItemFormSchema>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: normalisedDefaults,
  });

  const handleAndConvert = handleSubmit((data) => {
    const payload: Partial<NewItem> = { title: data.title.trim() };

    if (data.description?.trim()) payload.description = data.description.trim();
    if (data.price && data.price > 0) payload.price = data.price;
    if (data.acquisitionDate)
      payload.acquisitionDate = new Date(data.acquisitionDate).toISOString();
    if (data.imageUrl?.trim()) payload.imageUrl = data.imageUrl.trim();
    if (data.category?.trim()) payload.category = data.category.trim();

    onSubmit(payload as NewItem);
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
  };
}
