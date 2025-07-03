import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type ItemFiltersSchema,
  itemFiltersSchema,
} from '@/schemas/itemFilters.schema';
import { useItemFilters } from '@/store/useItemFiltersStore';
import { isEqual } from 'lodash';

export function useItemFiltersForm(
  onSubmit: (data: ItemFiltersSchema) => void
) {
  const { filters: activeFilters, defaultEmptyFilters } = useItemFilters();

  const form = useForm({
    resolver: zodResolver(itemFiltersSchema),
    defaultValues: activeFilters,
    mode: 'onTouched',
  });

  const currentValues = form.watch();

  const hasChangedFilters = !isEqual(currentValues, activeFilters);
  const hasActiveFilters = !isEqual(defaultEmptyFilters, activeFilters);

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
    currentValues,
    activeFilters,
    hasChangedFilters,
    hasActiveFilters,
  };
}
