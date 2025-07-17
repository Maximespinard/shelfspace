import { Controller, useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/shadcn/dialog';
import { Input } from '@/components/ui/shadcn/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn/select';
import { Button } from '@/components/ui/shadcn/button';
import { useItemFilters } from '../store/useItemFiltersStore';
import { type ItemFiltersSchema } from '../schemas/itemFilters.schema';
import { useCategoriesQuery } from '../../categories/hooks/useCategoriesQuery';
import { useCategoryModal } from '../../categories/hooks/useCategoryModal';
import { useItemFiltersForm } from '../hooks/useItemFiltersForm';
import { useEffect } from 'react';
import { defaultEmptyFilters } from '@/constants/filters';

interface Props {
  open: boolean;
  onClose: () => void;
}

const ItemFiltersDrawer = ({ open, onClose }: Props) => {
  const {
    setFilter,
    filters,
    resetFilters: resetStoreFilters,
  } = useItemFilters();
  const { data: categories = [] } = useCategoriesQuery();
  const { open: openCategoryModal } = useCategoryModal();
  const { search } = filters;

  const onSubmit = (values: ItemFiltersSchema) => {
    (Object.keys(values) as Array<keyof ItemFiltersSchema>).forEach((key) => {
      const value = values[key];
      if (value !== undefined) {
        setFilter(key, String(value));
      }
    });
    setFilter('search', search || '');
    onClose();
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    hasChangedFilters,
    hasActiveFilters,
    formState: { errors, isSubmitting },
  } = useItemFiltersForm(onSubmit);

  const searchValue = useWatch({ control, name: 'search' });
  const [debouncedSearch] = useDebounce(searchValue, 300);

  useEffect(() => {
    setFilter('search', debouncedSearch || '');
  }, [debouncedSearch, setFilter]);

  const handleReset = () => {
    resetStoreFilters();
    reset(defaultEmptyFilters);
  };

  // Reset form to active filters when dialog closes without applying
  useEffect(() => {
    if (!open) {
      reset(filters);
    }
  }, [open, reset, filters]);

  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md sm:max-w-lg overflow-y-auto max-h-[90vh] pb-24">
        <DialogHeader>
          <DialogTitle className="text-xl">Advanced Filters</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Refine your shelf view using advanced search filters.
        </DialogDescription>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 pt-2">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm text-muted-foreground">Category</label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || 'all'}
                  >
                    <SelectTrigger className="h-12 w-full truncate">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          <span
                            className="inline-block w-2.5 h-2.5 rounded-full mr-2"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="inline-block max-w-[200px] truncate align-middle">
                            {category.name}
                          </span>
                        </SelectItem>
                      ))}
                      <div className="border-t my-1" />
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => openCategoryModal('add')}
                        className="w-full justify-start px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                      >
                        <span className="text-sm font-medium">
                          + Add Category
                        </span>
                      </Button>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.category.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm text-muted-foreground">Sort by</label>
              <Controller
                name="sortBy"
                control={control}
                render={({ field: sortByField }) => (
                  <Controller
                    name="order"
                    control={control}
                    render={({ field: orderField }) => (
                      <Select
                        value={`${sortByField.value}-${orderField.value}`}
                        onValueChange={(val) => {
                          const [sortBy, order] = val.split('-');
                          sortByField.onChange(sortBy);
                          orderField.onChange(order);
                        }}
                      >
                        <SelectTrigger className="h-12 w-full truncate">
                          <SelectValue placeholder="Default" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="createdAt-desc">
                            Newest first
                          </SelectItem>
                          <SelectItem value="createdAt-asc">
                            Oldest first
                          </SelectItem>
                          <SelectItem value="title-asc">Name A → Z</SelectItem>
                          <SelectItem value="title-desc">Name Z → A</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm text-muted-foreground">Min Price</label>
              <Input
                type="number"
                min={0.01}
                step="any"
                max={100000}
                inputMode="decimal"
                {...register('minPrice')}
                className="h-12"
              />
              {errors.minPrice && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.minPrice.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm text-muted-foreground">Max Price</label>
              <Input
                type="number"
                min={0.01}
                step="any"
                max={100000}
                inputMode="decimal"
                {...register('maxPrice')}
                className="h-12"
              />
              {errors.maxPrice && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.maxPrice.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm text-muted-foreground">
                Start Date
              </label>
              <Input
                type="date"
                max={today}
                {...register('startDate')}
                className="h-12"
              />
              {errors.startDate && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.startDate.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm text-muted-foreground">End Date</label>
              <Input
                type="date"
                max={today}
                {...register('endDate')}
                className="h-12"
              />
              {errors.endDate && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.endDate.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={!hasActiveFilters}
            >
              Reset Filters
            </Button>
            <Button type="submit" disabled={isSubmitting || !hasChangedFilters}>
              Apply
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ItemFiltersDrawer;
