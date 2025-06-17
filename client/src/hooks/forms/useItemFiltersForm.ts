import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type ItemFiltersSchema,
  itemFiltersSchema,
} from '@/schemas/itemFilters.schema';
import { useItemFilters } from '@/store/useItemFiltersStore';

export function useItemFiltersForm(
  onSubmit: (data: ItemFiltersSchema) => void
) {
  const { filters: defaultFilters } = useItemFilters();

  const form = useForm<ItemFiltersSchema>({
    resolver: zodResolver(itemFiltersSchema),
    defaultValues: defaultFilters,
    mode: 'onTouched',
  });

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
}
