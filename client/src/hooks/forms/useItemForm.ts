import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type ItemSchema,
  type NewItem,
  itemSchema,
} from '@/schemas/item.schema';

export function useItemForm(
  onSubmit: (data: NewItem) => void,
  defaultValues?: Partial<ItemSchema>
) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ItemSchema>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      acquisitionDate: '',
      imageUrl: '',
      category: '',
      ...defaultValues,
    },
  });

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    reset,
    watch,
    setValue,
    errors,
    isSubmitting,
  };
}
